<?php
/**
 * Description of LeadActionController
 * This controller class used to manage lead action
 * @author Varun Kumar<varun.kumar@healthians.com>
 * @date_created 2017-07-13
 */
require_once (dirname(dirname(__FILE__)) . "/ra_controller.php");

class BookingReportDownload extends Ra_controller
{
    private $limit = 10;
    private $domMaxInLimit = 1000;
    public function __construct()
    {
        parent::__construct();

        if(!empty($_SERVER['HTTP_ORIGIN'])) {
            $hostName = $_SERVER['HTTP_ORIGIN'];
        
            if( $hostName !== FALSE ){
                header("Access-Control-Allow-Origin: ".$hostName);
            }
            else {
                log_message('info',' Not setting CORS header');        
            }
        }

        if ($this->session->userdata('admin_id') == null) {
            // validate request here
            //$this->jsonResponse(array('status' => false, 'message' => 'You are not logged in.', 'reload_page' => true));
        }
        $pageLimit = (int)$this->input->post('page_limit');
        $this->limit = $pageLimit>0 ? $pageLimit : $this->limit;
        //$file_path = APPPATH . 'config/config.php';
        //require_once($file_path);
    }

    /*
     * Download remove existing booking number
     */
    public function filterCsvNumber() {
        $this->load->view("ht_layout/booking_report/filter_csv_number");
    }

    public function download_booking_number()
    {
        $this->allowMethods('post');
        $inputData = $this->input->post();
        $maxsize = 2097152;
        $type = $inputData['type'];
        if(!empty($type)) {
            $mimes = array('application/vnd.ms-excel','text/plain','text/csv','text/tsv');
            if(in_array($_FILES['uploaded_file']['type'],$mimes)){
                // do something
                if(($_FILES['uploaded_file']['size'] >= $maxsize) || ($_FILES["uploaded_file"]["size"] == 0)) {
                    echo json_encode(['status' => true, 'message' => 'File too large. File must be less than 2 mb.']);
                    exit();
                }
                $filename = basename($_FILES["uploaded_file"]["name"], '.csv').rand(1,99).'_'.$type.'_'.date('Ymd_H_i_s').'.csv';
                move_uploaded_file($_FILES["uploaded_file"]["tmp_name"], "/tmp/" . $filename);
                $task_cron_array =[
                    'program_type' => 'cron',
                    'program_name' => 'filter_converted_data',
                    'input_parameter'=> json_encode(array("type"=>$type, "file"=>$filename, "email"=> $this->session->userdata('admin_email'))),
                    'status' => '2',
                    'schedule_at'=> date('Y-m-d H:i:s'),
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => '0000-00-00 00:00:00',
                    'created_by' => $this->session->userdata('admin_id'),
                    'updated_by' => 0
                ];
                $this->db->insert('task_scheduler', $task_cron_array);
                $task_insert_id = $this->db->insert_id();
                shell_exec("/usr/bin/php ".__DIR__."/../../../index.php cron filter_csv processUploadedFile 'type:".$type."' 'file:".$filename."' 'email:".urlencode($this->session->userdata('admin_email'))."' 'task_id:".$task_insert_id."'> /tmp/filterFileTemp.log 2>&1 &");
                echo json_encode(['status' => true, 'message' => 'Link will be sent at your mail-id within 15 minutes.']);
                exit();
            }else{
                echo json_encode(['status' => false, 'message' => 'Invalid file type. Only CSV is accepted.']);
                exit();
            }
        }else{
            echo json_encode(['status' => false, 'message' => 'Please select filter type.']);
            exit();
        }
    }



    /*
     * Download remove existing booking number
     */
    public function getNumbersbyAWBNumber() {
        $this->load->view("ht_layout/get_number_awb_number");
    }



    public function download_number_by_awb_number()
    {
        $this->allowMethods('post');
        $inputData = $this->input->post();
        $maxsize = 2097152;
        
        $awb_download_numbers_in_day = $this->common->getConfigMasterDataByKey("awb_download_numbers_in_day");
        $chsql = "SELECT count(distinct batch_id) as tcont FROM `awb_download_logs` where date(download_date)='".date('Y-m-d')."'";
        $chdata = $this->db->query($chsql)->result("array");

        if($chdata[0]['tcont'] >= $awb_download_numbers_in_day[0]['value']){
            echo json_encode(['status' => false, 'message' => 'Today\'s limit is over.']);
            exit();
        }
        
        
        if(!empty($_FILES['uploaded_file'])) {
            $mimes = array('application/vnd.ms-excel','text/plain','text/csv','text/tsv');
            if(in_array($_FILES['uploaded_file']['type'],$mimes)){
                // do something
                if(($_FILES['uploaded_file']['size'] >= $maxsize) || ($_FILES["uploaded_file"]["size"] == 0)) {
                    echo json_encode(['status' => true, 'message' => 'File too large. File must be less than 2 mb.']);
                    exit();
                }
                
                $awbString = "";
                $handle = fopen($_FILES["uploaded_file"]["tmp_name"], 'rb');
                
                $awb_download_numbers_limit = $this->common->getConfigMasterDataByKey("awb_download_numbers_limit");
                $h = 0;
                while (($data = fgetcsv($handle, '', ",")) !== FALSE) {
                    if($h < $awb_download_numbers_limit[0]['value']){
                        $awbString .= "'".trim($data[0])."',";
                    }
                    $h++;
                }
                $awbString = rtrim($awbString,",");

                $sql = "SELECT cst.AWB, dom.billing_cust_tel, cst.booking_id, dom.billing_cust_name, dom.billing_cust_landmark, 
                    dom.billing_cust_house_number, dom.sub_locality, dom.locality, dom.billing_cust_city, dom.billing_zip_code, ds.state_name
                        FROM `courier_status_tracking` cst
                        join deal_order_management dom on dom.order_id = cst.booking_id
                        join deal_state ds on ds.state_id = dom.billing_cust_state
                        where cst.AWB in (".$awbString.")";
                $data = $this->db->query($sql)->result("array");
                if(!empty($data)){



                    $filename = $this->getCSVMobileAWBDownload($data);
                    echo json_encode(['status' => true, 'message' => '','fileName' => $filename]);
                    exit();
                }else{
                    echo json_encode(['status' => false, 'message' => 'No data found.']);
                exit();
                }
            }else{
                echo json_encode(['status' => false, 'message' => 'Invalid file type. Only CSV is accepted.']);
                exit();
            }
        }else{
            echo json_encode(['status' => false, 'message' => 'Please select file with AWB numbers.']);
            exit();
        }
    }



    function getCSVMobileAWBDownload($data) {

        /*$fileNamecsv = "awb_report_".strtotime(date('Y-m-d H:i:s'));
        $fileName = $fileNamecsv.".csv";
        $csv_filename_sc_file = destinationDirPrefix . "/" . $fileName;
        $open_sc_file = fopen($csv_filename_sc_file, "w");*/
         $this->load->library('cachewrapper');

        $finalData = "";


        $dataHeader = '"Sr."' . ',' . '"AWB"' . ',' . '"Mobile"' . ',' . '"Name"' . ',' . '"Address"' . ',' . '"Landmark"'."\n";
        //fwrite($open_sc_file, "$dataHeader");

        $finalData .= $dataHeader;

        if(!empty($data))
        {   $sr = 1;
            $digits = 6;
            $batch_id = rand(pow(10, $digits-1), pow(10, $digits)-1);

            $str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            $batch_id = substr(str_shuffle($str_result), 0, $digits);

            foreach($data as $datavalue=>$dataField)
            {
                if(!empty($dataField['locality'])){
                    $dataAddress = $dataField['billing_cust_house_number'].', '.$dataField['sub_locality'].', '.$dataField['locality'].', '.$dataField['billing_zip_code'];
                }else{
                    $dataAddress = $dataField['billing_cust_house_number'].', '.$dataField['sub_locality'].', '.$dataField['billing_zip_code'];
                }
                $dataReturn = '"' . $sr . '","' . $dataField['AWB'] . '","' . $dataField['billing_cust_tel'] . '","' . $dataField['billing_cust_name'] . '","' . $dataAddress. '","' . $dataField['billing_cust_landmark'].'"'. " \n";
                //fwrite($open_sc_file, "$dataReturn");
                $finalData .= $dataReturn;

                $dataAddressSave = $dataField['billing_cust_name'].' '.$dataAddress.' '.$dataField['billing_cust_landmark'];

                $insertQuery = "insert into awb_download_logs (booking_id,contact_number,awb,download_by,batch_id,address) values('".$dataField['booking_id']."','".$dataField['billing_cust_tel']."','".$dataField['AWB']."','".$this->session->userdata('admin_id')."','".$batch_id."','".$dataAddressSave."')";
                $this->db->query($insertQuery);
                $sr++;
            }

            
        }
        else
        {
            $finalData .= 'No Data Found';
            //fwrite($open_sc_file, "$dataNone");


        }
        $dataKey = 'awb_csv_'.time();
        $this->cachewrapper->setcache($dataKey, $finalData, 60);

        //fclose($open_sc_file);
        return $dataKey;
    }


    // Download CSV for AWB to Mobile
    public function getFetchAWDFileDownload(){
         $this->load->library('cachewrapper');
        $keyData = $this->input->get('catfile');

        $fileNamecsv = "awb_report_".strtotime(date('Y-m-d H:i:s'));
        $fileName = $fileNamecsv.".csv";
        $csv_filename_sc_file = destinationDirPrefix . "/" . $fileName;
        $open_sc_file = fopen($csv_filename_sc_file, "w");

        $dataHeader = $this->cachewrapper->getcacheddata($keyData);

        fwrite($open_sc_file, "$dataHeader");
        header('Content-Type: text/csv');
        header('Content-Disposition: attachement; filename="'.$fileName.'"');
        readfile($csv_filename_sc_file);
        
        exit();
    }

    /**
     * @author Sandeep Malhotra
     * @date_created 05-05-2021
     * @description : load view to get listing and download bookings with ucid 
     * @param POST type (array)
     * @return type (array)
     */
    public function getUcidInBookings() {        
        $inputData  = $this->input->post();
        $inputData1 = $this->input->get();
        
        if(isset($inputData1['download'])) { $limit = 5000; }
        else                               { $limit = 10;   }
        $filter_on     = !empty($inputData['filter_on']) ? $inputData['filter_on'] : "order_date";

        $start_date   = isset($inputData[ 'start_date' ]) ? $inputData[ 'start_date' ] : date("Y-m-d", strtotime(date("Y-m-d", strtotime(date("Y-m-d"))) . "-3 days"));
        $end_date     = isset($inputData[ 'end_date' ]) ? $inputData[ 'end_date' ] : date('Y-m-d');

        // from GET
        if(!empty($inputData1)){
            $filter_on     = !empty($inputData1['filter_on']) ? $inputData1['filter_on'] : "";
            $start_date     = isset($inputData1[ 'start_date' ]) ? $inputData1[ 'start_date' ] : date('Y-m-d');
            $end_date     = isset($inputData1[ 'end_date' ]) ? $inputData1[ 'end_date' ] : date('Y-m-d');

        }

        // $Allowed = $this->functions_model->select_rows("config_master", 'key = "online_transaction_log_access"','value');

        // if(empty($Allowed)){
        //     $this->jsonResponse(array('status' => 'error', 'message' => 'No permission to access bookings with UCID.'));
        // }

        // if(!empty($Allowed)){
        //     $allowedArr = json_decode($Allowed[0]['value']);
        //     if(!in_array($this->session->userdata('admin_id'), $allowedArr)){
        //         $this->jsonResponse(array('status' => 'error', 'message' => 'No permission to access bookings with UCID.'));
        //     }
        // }

        $data       = array();
        $allRows    = 0;

        // require_once(dirname(dirname(__DIR__)) . "/models/service/booking_report_model.php");
        // $bookingObj = new booking_report_model();
        // $records = $bookingObj->getUcidInBookingsData($limit, $offset, $filter_on, $start_date, $end_date);  
        /** OR **/
        $this->load->model('service/booking_report_model');
        $page   = $this->input->get('per_page') > 0 ? $this->input->get('per_page') : 1;
        $offset = ($page - 1) * $limit;
        $records = $this->booking_report_model->getUcidInBookingsData($limit, $offset, $filter_on, $start_date, $end_date);  

        if(!isset($inputData1['download'])) {
            $data['records']  = $records;
            // $totalRows = $bookingObj->getUcidInBookingsDataCount($filter_on, $start_date, $end_date);  
            $totalRows = $this->booking_report_model->getUcidInBookingsDataCount($filter_on, $start_date, $end_date);  
            
            if(!empty($totalRows)){
                $allRows = count($totalRows);
            }
            
            $pagingOptions          =   array(
                'base_url'          =>  site_url('service/BookingReportDownload/getUcidInBookings?_ac=nxt&filter_on='.$filter_on.'&start_date='.$start_date.'&end_date='.$end_date),
                'per_page'          =>  10,
                'use_page_numbers'  =>  true,
                'page_query_string' =>  true,
                'total_rows'        =>  $allRows,
                'first_url'         =>  site_url('service/BookingReportDownload/getUcidInBookings?_ac=nxt&filter_on='.$filter_on.'&start_date='.$start_date.'&end_date='.$end_date)
            );

            $data['pagingOptions']          = $pagingOptions;
            $data['filter_on']              = $filter_on;
            $data['start_date']             = $start_date;
            $data['end_date']               = $end_date;
            $data['count_rows']             = $allRows;

            $this->load->view('ht_layout/panels/bookings_with_ucid', $data);
        }
        else
        {
            $this->_array_to_csv_download_ucid($records);
        }
    }

    /**
     * @author Sandeep Malhotra
     * @date_created 05-05-2021
     * @description : download ucid data in csv format
     * @param POST type (array)
     * @return type (attachment,application/csv)
     */
    private function _array_to_csv_download_ucid($array, $filename = "export.csv", $delimiter = ",")
    {
        $f   = fopen('php://memory', 'w');
        $arr = ['booking_id'  =>  'Booking Id',                     
                'agent_name'  =>  'Agent Name',                     
                'verification_status'  =>  'Verification Status',                     
                'order_type'  =>  'Order Type',                     
                'billing_customer_id'  =>  'User Id',                     
                'customer_name'  =>  'Customer Name',                     
                'status_name'  =>  'Status',                     
                'total_amount'  =>  'Total Amount',                     
                'paid_amount'  =>  'Paid Amount',                     
                'shortfall_amount'  =>  'Shortfall Amount',                     
                'zone_name'  =>  'Zone Name',                     
                'city'  =>  'City',                     
                'source'  =>  'Created Source',                     
                'booking_date'  =>  'Order Date',                     
                'sample_collection_time'  =>  'Sample Collection Time ',
                // 'phone_number'  =>  'Phone',
                'call_id'  =>  'Call Id',
                'ucid'  =>  'UCID'
                ];


        fputcsv($f, $arr, $delimiter);
        foreach ($array as $key => $line) {
            // array_unshift($line, $key + 1);
            fputcsv($f, $line, $delimiter);
        }
        fseek($f, 0);
        header('Content-Type: application/csv');

        header('Content-Disposition: attachment; filename="' . $filename . '";');
        fpassthru($f);
        
    }

}
