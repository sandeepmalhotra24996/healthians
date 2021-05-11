<?php
/**
 * @author : Sandeep Malhotra
 * @date : 05th May, 2021
 */
class booking_report_model extends CI_Model
{
    /**
     * @author Sandeep Malhotra
     * @date_created 05-05-2021
     * @description : get data with ucid in bookings
     * @param $limit, $offset type (int)
     * @param $filter_on type (string)
     * @param $start_date, $end_date type (date)
     * @return $results type (array)
     */
    public function getUcidInBookingsData($limit = "", $offset = "", $filter_on = "", $start_date = "", $end_date = ""){
        // $start_date = date('Y-m-d',strtotime($start_date));
        // $end_date = date('Y-m-d',strtotime($end_date));
        $this->db->from("deal_order_management dom");
        $this->db->select(" dom.order_id AS 'booking_id',
                            cs.name AS 'agent_name',
                            dom.verification_status AS 'verification_status',
                            dom.order_type AS 'order_type',
                            dom.user_id AS 'billing_customer_id',
                            dom.billing_cust_name AS 'customer_name',
                            os.stage_name AS 'status_name',
                            dom.order_price AS 'total_amount',
                            dom.payed_amount AS 'paid_amount',
                            (dom.order_price - dom.payed_amount) AS 'shortfall_amount',
                            scz.zone_name AS 'zone_name',
                            dom.billing_cust_city AS 'city',
                            dom.booked_from AS 'source',
                            dom.order_date AS 'booking_date',
                            dom.sample_collection_time AS 'sample_collection_time',
                            dom.billing_cust_tel AS 'phone_number'
                           ");
        $this->db->join('deal_orders_child doc', 'doc.order_id=dom.order_id', 'inner');
        $this->db->join('order_details od', 'od.doc_id=doc.c_order_id', 'inner');
        $this->db->join('deal_state ds', 'ds.state_id=dom.billing_cust_state', 'left');
        $this->db->join('crm_users cs', 'cs.id=dom.created_by', 'left');
        $this->db->join('order_stage os', 'os.order_stage_id=dom.delivery_status', 'left');
        $this->db->join('locality_management lm', 'lm.locality_id=dom.locality_id', 'left');
        $this->db->join('sample_collection_zone scz', 'scz.zone_id=lm.zone_id', 'left');
        
        $this->db->where('dom.channel_type = 0');
        //$this->db->where("date(created_at) >= ", date('Y-m-d', strtotime('-30 days')));
        if(!empty($filter_on) && $filter_on == 'order_date'){
            if ($start_date != null)
            {
                $this->db->where('CAST(dom.order_date as DATE) >= "' . $start_date . '"');
            }

            if ($end_date != null)
            {
                $this->db->where('CAST(dom.order_date as DATE) <= "' . $end_date . '"');
            }

        }else if(!empty($filter_on) && $filter_on == 'sample_collection_time'){
           if ($start_date != null)
            {
                $this->db->where('CAST(dom.sample_collection_time as DATE) >= "' . $start_date . '"');
            }

            if ($end_date != null)
            {
                $this->db->where('CAST(dom.sample_collection_time as DATE) <= "' . $end_date . '"');
            }
        }

        $this->db->group_by("doc.order_id");
        $this->db->order_by("dom.order_id", "desc");

        if($limit > 0){
            $this->db->limit($limit, $offset);
        }

        $query = $this->db->get();
        
        // echo $this->db->last_query();

        if($query) {
            if ($query->num_rows() > 0) {
                $results = $query->result_array();
                $this->db_m4 = $this->load->database(ENVIRONMENT.'.m4', TRUE);
                foreach ($results as $key => &$value) {
                    if (!empty($value['phone_number'])) {
                        $number = $value['phone_number'];
                        $sql_ccd = "select call_id,monitor_ucid from customer_calldetails where customer_phone_number = '" . $number . "' order by call_id desc limit 1";
                        $query = $this->db_m4->query($sql_ccd);
                        $call_details = $query->result_array();
                        // if ($query->num_rows() > 0) {
                           if(!empty($call_details)){
                                $value['call_id'] = $call_details[0]['call_id'];
                                $value['ucid'] = $call_details[0]['monitor_ucid'];
                                // $results[$key][$value['ucid_test']] = $call_details[0]['monitor_ucid'];
                            }else{
                                $value['call_id'] = '-';
                                $value['ucid'] = '-';
                                // $results[$key][$value['ucid_test']] = '-;
                            }
                            unset($value['phone_number']);
                         // }
                    }
                }
                return $results;
            }else {
                return [];
            }
        }else {
            return [];
        }
                
    }

    /**
     * @author Sandeep Malhotra
     * @date_created 10-05-2021
     * @description : COUNT ( get data i.e total bookings)
     * @param $filter_on type (string)
     * @param $start_date, $end_date type (date)
     * @return $results type (array)
     */
    public function getUcidInBookingsDataCount($filter_on = "", $start_date = "", $end_date = ""){
        $this->db->from("deal_order_management dom");
        $this->db->select(" dom.order_id AS 'booking_id' ");
        $this->db->join('deal_orders_child doc', 'doc.order_id=dom.order_id', 'inner');
        $this->db->join('order_details od', 'od.doc_id=doc.c_order_id', 'inner');
        $this->db->where('dom.channel_type = 0');

        if(!empty($filter_on) && $filter_on == 'order_date'){
            if ($start_date != null)
            {
                $this->db->where('CAST(dom.order_date as DATE) >= "' . $start_date . '"');
            }

            if ($end_date != null)
            {
                $this->db->where('CAST(dom.order_date as DATE) <= "' . $end_date . '"');
            }

        }else if(!empty($filter_on) && $filter_on == 'sample_collection_time'){
           if ($start_date != null)
            {
                $this->db->where('CAST(dom.sample_collection_time as DATE) >= "' . $start_date . '"');
            }

            if ($end_date != null)
            {
                $this->db->where('CAST(dom.sample_collection_time as DATE) <= "' . $end_date . '"');
            }
        }

        $this->db->group_by("doc.order_id");
        $query = $this->db->get();

        if($query) {
            if ($query->num_rows() > 0) {
                $results = $query->result_array();
                return $results;
            } 
            else {
                return [];
            }
        }
        else {
            return [];
        }

    }

}
