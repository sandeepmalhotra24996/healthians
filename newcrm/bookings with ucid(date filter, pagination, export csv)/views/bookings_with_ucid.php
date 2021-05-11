<!--script src="<?php //echo site_url('assets/js/bootstrap-datetimepicker.min.js') ?>"></script-->
<?php
 /**
 * @author Sandeep Malhotra<sandeep.malhotra@healthians.com>
 * @date_created 05-05-2021
 * Description of bookings_with_ucid
 * This view contains listing of bookings with ucid and functionality to download data in csv
 */
$basepath = $this->config->item('base');
?>
<script src="<?= $basepath . 'assets/js/jquery-ui-1.9.1.custom.min.js' ?>"></script>
<link href="<?php echo site_url("assets/css/jquery-ui.css"); ?>" rel="stylesheet" />
<div id="page-wrapper" >
    <div id="page-inner">
        <div class="row">
            <div class="col-md-12">
                <!-- Advanced Tables -->
                <div class="panel panel-default">

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="col-sm-12" style="float:left;">
                                <div class="box-header">

                                  <div class="col-sm-12" style="margin-bottom: 20px;">  <h3 class="box-title" style="float: left;"><i class="fa fa-list"></i> <strong>  Bookings With UCID</strong> </h3>
                                   <h3 class="box-title" style="float: right;"> <strong> Total Count : <?php echo $count_rows; ?></strong> </h3> 

                                  </div>

                <div class="col-sm-12" style="padding: 0;">

 <div class="col-md-2" style="width: 182px;">
    <label>Filter On</label>
 <select name="filter_on" style="float:right; margin-left: 5px;" id=filter_on class="form-control">
                                        <option value="order_date" <?php if($filter_on == 'order_date'){ echo 'selected';}?>>Order Date</option>
                                        <option value="sample_collection_time" <?php if($filter_on == 'sample_collection_time'){ echo 'selected';}?>>Sample Collection Time</option>
                                    </select>

                                </div>
<div class="col-md-2" style="width: 145px;">
    <label>Start Date</label>
 <input style="padding: 5px 6px; border: 1px solid #d2d6de;" type = "text" class="col-md-12" id = "datepicker1" readonly value="<?php echo isset($start_date) ? $start_date : "" ?>">
 </div>


 <div class="col-md-2" style="width: 145px;">
    <label>End Date</label>
 <input style="padding: 5px 6px; border: 1px solid #d2d6de;" type = "text" class="col-md-12" id = "datepicker2" readonly value="<?php echo isset($end_date) ? $end_date : "" ?>">
 </div>

 <div class="col-md-1" style="width:140px; margin-top: 25px;">

 <button onclick="service_list();" class="btn btn-flat btn-primary" id="service-search-btn" style="margin-left: 5px;" type="submit"><i class="fa fa-search"></i></button>
 


   <button class = "btn btn-flat btn-primary" id = "downloaddata" data-toggle="tooltip" title="" data-original-title="Download"><span><i class="fa fa-download"></i></span></button>
</div>
</div>

                                </div>
                            </div>

                        </div>
                    </div>
                      

                        <span style="color:grey"> </span>
                    <div class="panel-body" style = "min-height: 400px;max-height: 500px; overflow : auto;">
                        
                        <table width="100%" class="table table-striped table-bordered bootstrap-datatable" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <th align="left" valign="top">Booking Id</th>
                                <th align="left" valign="top">Agent Name</th>
                                <th align="left" valign="top">Verification Status</th>
                                <th align="left" valign="top">Order Type</th>
                                <th align="left" valign="top">User Id</th>
                                <th align="left" valign="top">Customer Name</th>
                                <th align="left" valign="top">Status</th>
                                <th align="left" valign="top">Total Amount</th>
                                <th align="left" valign="top">Paid Amount</th>
                                <th align="left" valign="top">Shortfall Amount</th>
                                <th align="left" valign="top">Zone Name</th>
                                <th align="left" valign="top">City</th>
                                <th align="left" valign="top">Created Source</th>
                                <th align="left" valign="top">Order Date</th>
                                <th align="left" valign="top">Sample Collection Time</th>
                                <!-- <th align="left" valign="top">Phone Number</th> -->
                                <th align="left" valign="top">Call Id</th>
                                <th align="left" valign="top">UCID</th>
                            </tr>

                            <?php
                            if (!empty($records)) {
                                foreach ($records as $record) { ?>
                                    <tr>
                                        <td align="left" valign="top"><?php echo $record['booking_id'];?></td>
                                        <td align="left" valign="top"><?php echo $record['agent_name'];?></td>
                                        <td align="left" valign="top"><?php echo $record['verification_status'];?></td>
                                        <td align="left" valign="top"><?php echo $record['order_type'];?></td>
                                        <td align="left" valign="top"><?php echo $record['billing_customer_id'];?></td>
                                        <td align="left" valign="top"><?php echo $record['customer_name'];?></td>
                                        <td align="left" valign="top"><?php echo $record['status_name'];?></td>
                                        <td align="left" valign="top"><?php echo $record['total_amount'];?></td>
                                        <td align="left" valign="top"><?php echo $record['paid_amount'];?></td>
                                        <td align="left" valign="top"><?php echo $record['shortfall_amount'];?></td>
                                        <td align="left" valign="top"><?php echo $record['zone_name'];?></td>
                                        <td align="left" valign="top"><?php echo $record['city'];?></td>
                                        <td align="left" valign="top"><?php echo $record['source'];?></td>
                                        <td align="left" valign="top"><?php echo date('d-m-Y  H:i:s a',strtotime($record['booking_date'])); ?></td>
                                        <td align="left" valign="top"><?php echo date('d-m-Y  H:i:s a',strtotime($record['sample_collection_time'])); ?></td>
                                        <!-- <td align="left" valign="top"><?php //echo $record['phone_number'];?></td> -->
                                        <td align="left" valign="top"><?php echo $record['call_id'];?></td>
                                        <td align="left" valign="top"><?php echo $record['ucid'];?></td>
                                    </tr>
                                    <?php
                                }
                            } else {
                                ?>
                                <tr><td align="left" valign="top" colspan="10">No Record Found!</td></tr>
                            <?php
                            }
                            ?>

                        </table>
                        <div class="row">
                            <div class="col-sm-7"></div>
                            <div class="col-sm-5">
                                <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate" style="margin-bottom:10px;font-size:11px;">
                                    <?php echo bootstrap_pagination($pagingOptions); ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--End Advanced Tables -->
            </div>
        </div>
        
        <!--  end  Context Classes  -->
    </div>
</div>

<script type="text/javascript">

    /*$("#selectprefereddate_datepick_status").daterangepicker({
        dateFormat: "yy-mm-dd",
        maxDate: new Date()
    });*/
    // var show_start_date = <?php //echo $start_date ?>;
    var show_start_date = $("#datepicker1").val();
    var s_date = new Date(show_start_date);
    // s_date.setDate(s_date.getDate());

    // var show_end_date = <?php //echo $end_date ?>;
    var show_end_date = $("#datepicker2").val();
    var e_date = new Date(show_end_date);
    // e_date.setDate(e_date.getDate());

    $("#datepicker2").datepicker({
            dateFormat: 'yy-mm-dd',
            minDate: s_date,
            maxDate: e_date
            // minDate: "-3",
            // maxDate: "+0"
        });
    $("#datepicker1").datepicker({
            maxDate: "+0",
            dateFormat: 'yy-mm-dd',
            onSelect: function (selected, evnt) {
                $('#datepicker2').datepicker('setDate', null);
                $('#datepicker2').datepicker('destroy');
                // $("#searchdata").attr("disabled", true);
                var myDate = new Date(selected);
                myDate.setDate(myDate.getDate()+3);
                $("#datepicker2").datepicker({
                    minDate: selected,
                    maxDate: myDate,
                    dateFormat: 'yy-mm-dd',
                    onSelect: function (selected, evnt) {
                        // $("#searchdata").removeAttr("disabled");

                    }
                }).datepicker('setDate', myDate);
            }
        });


    function service_list(){
        var filter_on  = $("#filter_on").val();
        var start_date      = $("#datepicker1").val();
        var end_date        = $("#datepicker2").val();
        if(start_date == "" || end_date == ""){
            $('body').alertMessage({type: 'error', message: 'Start Date and End Date are required'});
            return false;
        }
        let s_time = new Date(start_date).getTime();
        let e_time = new Date(end_date).getTime();
        if(s_time > e_time){
            $('body').alertMessage({type: 'error', message: 'End Date should be greater than Start Date'});
            return false;
        }
        let myDate = new Date(start_date);
        myDate.setDate(myDate.getDate()+3);
        let end_time = new Date(myDate).getTime();
        if(e_time > end_time){
            $('body').alertMessage({type: 'error', message: 'Filter Can be applied for max 3 days'});
            return false;
        }
        
        
        $.ajax({
            url: __SITE.baseUrl + "service/BookingReportDownload/getUcidInBookings",
            data: {"filter_on":filter_on, "start_date":start_date,"end_date":end_date},
            type: "POST",
            beforeSend: function () {
                $('.data-result-panel').rayanLoaderShow();
            },
            success: function (response) {
                $('.data-result-panel').rayanLoaderHide();
                if(response && response.status == 'error') {
                    $('body').alertMessage({type: 'error', message: response.message});
                }
                else {
                    $('.data-result-panel').rayanLoaderHide();
                    $('.data-result-panel').html(response);
                }
            },
            error: function () {
                $('.data-result-panel').rayanLoaderHide();
            }
        });
    }



    // code for download the data

    $("#downloaddata").click(function () {
        var filter_on  = $("#filter_on").val();
        var start_date      = $("#datepicker1").val();
        var end_date        = $("#datepicker2").val();

        if(start_date == "" || end_date == ""){
            $('body').alertMessage({type: 'error', message: 'Start Date and End Date are required'});
            return false;
        }
        let s_time = new Date(start_date).getTime();
        let e_time = new Date(end_date).getTime();
        if(s_time > e_time){
            $('body').alertMessage({type: 'error', message: 'End Date should be greater than Start Date'});
            return false;
        }
        let myDate = new Date(start_date);
        myDate.setDate(myDate.getDate()+3);
        let end_time = new Date(myDate).getTime();
        if(e_time > end_time){
            $('body').alertMessage({type: 'error', message: 'Filter Can be applied for max 3 days'});
            return false;
        }
        
        var download_url = __SITE.baseUrl +"service/BookingReportDownload/getUcidInBookings?start_date="+start_date+"&end_date="+end_date+"&filter_on="+filter_on+"&download="+1;
        
        $.ajax({
            url         : download_url,
            type        : "GET",
            beforeSend  : function () {
                $('.data-result-panel').rayanLoaderShow();
            },
            success     : function (response) {
                $('.data-result-panel').rayanLoaderHide();
                const a     = document.createElement("a");
                document.body.appendChild(a);
                
                a.style     = "display: none";
                const blob  = new Blob([response], {type: "octet/stream"}),
                url         = window.URL.createObjectURL(blob);
                a.href      = url;
                a.download  = 'export.csv';
                a.click();
                
                window.URL.revokeObjectURL(url);
                
            },
            error: function () {
                $('.data-result-panel').rayanLoaderHide();
            }
        });

    });

</script>