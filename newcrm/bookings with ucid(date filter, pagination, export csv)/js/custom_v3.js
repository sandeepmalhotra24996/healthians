/*@authos techTeam */

/*For master page*/
// import * as JQuery from "jquery";
const $ = jQuery;

var panels = {};
var bookingId = '';
var dialerbaseUrl = "";
// set get option //
var is_filter_select = 0;
var urlInfo = [];
var _gridPanelHeight = '400px';
var crm_version = $('body').attr('crm-version');

$(document).ready(function() {
        var roleId = 0;
        var orderStatus = 0;
        return $.ajax({
            url: __SITE.baseUrl + "service/booking_management/get_page_refresh_Info",
            data: { "role_id": roleId, "order_status":orderStatus, bookingId: bookingId},
            type: "POST",
            dataType: "json",
            success: function(data) {
            }
         });
    });

(function($) {
    window.oncontextmenu = function() {
        return false;
    }

    $(document).keydown(function(e) {
        if (e.keyCode == 123) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            return false;
        }
    });

    panels = loadGridPanelsByRoleId();
    var getUrlParameter = function getUrlParameter(sParam) {

        var sPageURL = decodeURIComponent(window.location.search.substring(1));
        dialerbaseUrl = sPageURL;
        sURLVariables = sPageURL.split('&')
        var urlObjectsArray = {};

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            } else {
                urlObjectsArray[sParameterName[0]] = sParameterName[1];
            }
        }

        return urlObjectsArray;
    };
    urlInfo = getUrlParameter();
    if (urlInfo['pdCalllDepartment'] != undefined && urlInfo['pdCalllDepartment'] == 'remarketing' && urlInfo['phoneNumber']) {
        $(document).on('dblclick', '.view-customer_deatil', function() {
            var c_id = $(this).attr('data-cid');
            loadcustomterPanels(res.user_id, 'remarketing');
        });
        var phoneNumber = urlInfo['phoneNumber'].replace(/^0+/, '');
        delete urlInfo['phoneNumber'];
        delete urlInfo['remarketing'];



        // $.ajax({
        //     url: __SITE.baseUrl + 'service/remarketing/searchCustomer',
        //     data: { mobile: phoneNumber },
        //     type: 'post',
        //     dataType: 'json',
        //     success: function(res) {
        //         $('.assigned-role').closest('li.active').removeClass('active');
        //         $('[data-role-id=3]').closest('li').addClass('active');
        //         $('.assigned-role-option option:selected').removeAttr('selected');
        //         $('[data-role-id=3]').attr('selected', 'selected');
        //         $('body').attr('phoneNumber', phoneNumber);
        //         $('body').attr('active-role', "3");
        //         refreshManinPanel();
        //         loadBookingFilters();
        //         panels = loadGridPanelsByRoleId(3);
        //         if (res.status) {
        //             //loadcustomterPanels(res.cust_id, 'remarketing');
        //             setTimeout(function() { loadcustomterPanels(res.cust_id, 'remarketing'); }, 2000);
        //         } else {
        //             //setTimeout(function(){ lead_form(0) }, 2000);
        //         }
        //     },
        //     error: function() {
        //         $('#form_submit_btn').prop('disabled', false);
        //     }
        // });

        var data = {};
        data['mobile'] = phoneNumber;


        ajax_call('service/remarketing/searchCustomer', 'POST', data, function(response) {
            $('.assigned-role').closest('li.active').removeClass('active');
            $('[data-role-id=3]').closest('li').addClass('active');
            $('.assigned-role-option option:selected').removeAttr('selected');
            $('[data-role-id=3]').attr('selected', 'selected');
            $('body').attr('phoneNumber', phoneNumber);
            $('body').attr('active-role', "3");
            refreshManinPanel();
            loadBookingFilters();
            panels = loadGridPanelsByRoleId(3);
            if (response.status) {
                //loadcustomterPanels(response.cust_id, 'remarketing');
                setTimeout(function() { loadcustomterPanels(response.cust_id, 'remarketing'); }, 2000);
            } else {
                //setTimeout(function(){ lead_form(0) }, 2000);
            }
        }, function() { $('#form_submit_btn').prop('disabled', false); }, { "showLoader": true, "type": "form", "dataType": "json" });


    } else if (urlInfo['phoneNumber']) {
        $(document).on('dblclick', '.view-lead-detail', function() {
            var leadId = $(this).attr('data-lid');
            loadViewsByAction('LeadForm', 'lead_form', '0', leadId)
        });
        var phoneNumber = urlInfo['phoneNumber'];

        // $.ajax({
        //     url: __SITE.baseUrl + 'service/lead_management/searchLead',
        //     data: { urlInfo : urlInfo, callerID: urlInfo['callerID'], monitorUcid: urlInfo['monitorUcid'], mobile: urlInfo['phoneNumber'].replace(/^0+/, '') },
        //     type: 'post',
        //     dataType: 'json',
        //     success: function(res) {
        //         $('body').attr('order-status', '');
        //         $('body').attr('panel-search', '0');
        //         $('body').attr('panel-main', "main");
        //         $('.assigned-role').closest('li.active').removeClass('active');
        //         $('[data-role-id=1]').closest('li').addClass('active');
        //         $('.assigned-role-option option:selected').removeAttr('selected');
        //         $('[data-role-id=1]').attr('selected', 'selected');
        //         // $('body').attr('phoneNumber', urlInfo['phoneNumber'].replace(/^0+/, ''));
        //         $('body').attr('active-role', "1");
        //         if (res.status) {
        //             if( typeof res.agent_skill != 'undefined' && res.agent_skill == 'cs_skill' )
        //             {
        //                 var qs = "phone_number="+urlInfo['callerID']+"&monitor_ucid="+urlInfo['monitorUcid'];
        //                 loadViewsByAction('AddTicket', 'add_ticket','1',qs,'9','0' );
        //             }
        //             else {
        //                 setTimeout(function() { lead_form(res.lead_id) }, 2000);
        //             }
        //         } else {
        //             setTimeout(function() { lead_form(0) }, 2000);
        //         }
        //     },
        //     error: function() {
        //         $('#form_submit_btn').prop('disabled', false);
        //     }
        // });



        var data = {};
        data['urlInfo'] = urlInfo;
        data['callerID'] = urlInfo['callerID'];
        data['monitorUcid'] = urlInfo['monitorUcid'];
        data['mobile'] = urlInfo['phoneNumber'].replace(/^0+/, '');

        ajax_call('service/lead_management/searchLead', 'POST', data, function(response) {
            $('body').attr('order-status', '');
            $('body').attr('panel-search', '0');
            $('body').attr('panel-main', "main");
            $('.assigned-role').closest('li.active').removeClass('active');
            $('[data-role-id=1]').closest('li').addClass('active');
            $('.assigned-role-option option:selected').removeAttr('selected');
            $('[data-role-id=1]').attr('selected', 'selected');
            // $('body').attr('phoneNumber', urlInfo['phoneNumber'].replace(/^0+/, ''));
            $('body').attr('active-role', "1");
            if (response.status) {
                if (typeof response.agent_skill != 'undefined' && response.agent_skill == 'cs_skill') {
                    var qs = "phone_number=" + urlInfo['callerID'] + "&monitor_ucid=" + urlInfo['monitorUcid'];
                    loadViewsByAction('AddTicket', 'add_ticket', '1', qs, '9', '0');
                } else {
                    setTimeout(function() { lead_form(response.lead_id) }, 2000);
                }
            } else {
                setTimeout(function() { lead_form(0) }, 2000);
            }
        }, function() { $('#form_submit_btn').prop('disabled', false); }, { "showLoader": true, "type": "form", "dataType": "json" });

    } else {
        $(function() {
            /** load default bookings and status **/


            // // CUR - 1563 Prevent onload booking Details
            //  loadBookings();
            loadBlankBookingView();


            // createTree();
            // getMainActions();
            loadBookingFilters();

            $(document).on('click', '.assigned-role', function(e) {
                e.preventDefault();
                $('body').attr('order-status', '');
                $('body').attr('panel-search', '0');
                refreshManinPanel();
                loadBookingFilters();
            });

            $(document).on('change', '#selectRole', function(e) {
                e.preventDefault();
                let roleId = $("#selectRole").val();
                $('body').attr('order-status', '');
                $('body').attr('panel-search', '0');
                $('body').attr('active-role', roleId);
                refreshManinPanel();
                loadBookingFilters();
            });

            $(document).on('click', '#select2-selectRole-container', function(e) {
                e.preventDefault();
                let roleId = $("#selectRole").val();
                $('body').attr('order-status', '');
                $('body').attr('panel-search', '0');
                $('body').attr('active-role', roleId);
                refreshManinPanel();
                loadBookingFilters();
            });

            $(document).on('click', 'ul.pagination a', function(e) {



                e.preventDefault();
                var $this = $(this);
                var pageUrl = $this.attr('href');
                if (pageUrl == "#") {
                    return false;
                }
                var page = $.getQuery('per_page', pageUrl);
                if (page && $this.hasClass('_booking_page')) {
                    $('body').attr('next-page', page);
                    loadBookings();
                    createTree();
                } else {


                    $('body').attr('next-page', page);
                    var formData = $('.panel-filter-form').serializeArray();
                    // $.ajax({
                    //     url: pageUrl,
                    //     data: formData,
                    //     type: 'POST',
                    //     beforeSend: function() {
                    //         $('.data-result-panel').rayanLoaderShow();
                    //     },
                    //     success: function(res) {
                    //         if ($('body').find('.separate-filter-panel').length) {
                    //             var leadFilteredData = JSON.parse(res);
                    //             $('#dynamic_body').html(leadFilteredData.html);
                    //             $('#total_row_label').html('Total Unique Records' + leadFilteredData.total_rows);
                    //         } else {
                    //             $('.data-result-panel').html(res);
                    //         }
                    //         $('.data-result-panel').rayanLoaderHide();
                    //     },
                    //     error: function() {
                    //         $('.data-result-panel').html('<div class="box"><div class="box-header"><h3 class="box-title"><strong>Error</strong></h3></div><div class="box-body"><p class="alert alert-danger">Network error</p></div></div>');
                    //     }
                    // });

                    ajax_call(pageUrl, 'POST', formData, function(response) {
                        if ($('body').find('.separate-filter-panel').length) {
                            var leadFilteredData = JSON.parse(response);
                            $('#dynamic_body').html(leadFilteredData.html);
                            $('#total_row_label').html('Total Unique Records' + leadFilteredData.total_rows);
                        } else {
                            $('.data-result-panel').html(response);
                        }
                        $('.data-result-panel').rayanLoaderHide();
                    }, function() {
                        $('.data-result-panel').html('<div class="box"><div class="box-header"><h3 class="box-title"><strong>Error</strong></h3></div><div class="box-body"><p class="alert alert-danger">Network error</p></div></div>');
                    }, { "showLoader": true, "type": "form" });
                }
            });

            $(document).on('dblclick', '.view-booking-detail', function() {
                bookingId = $(this).attr('data-bid');
                $('body').attr('current-order-status', $(this).attr('data-bstatus'));
                loadPanels();
            });
            $(document).on('dblclick', '.get-lead-detail', function() {

                var leadId = $(this).attr('data-lid');
                var role_id = typeof $('#role_id').val() != 'undefined' ? $('#role_id').val() : 0;
                if (role_id == 2 || role_id == 1) {
                    // return $.ajax({
                    //     url: __SITE.baseUrl + "service/lead_management/getPendigFollowUpCount",
                    //     data: { 'leadId': leadId },
                    //     type: "POST",
                    //     beforeSend: function() {
                    //         $('.data-result-panel').rayanLoaderShow();
                    //     },
                    //     success: function(data) {
                    //         var data = JSON.parse(data);

                    //         var pendigFollowUpCount = (typeof data != 'undefined' && typeof data.pendigFollowUpCount != 'undefined') ? data.pendigFollowUpCount : 0;
                    //         if (pendigFollowUpCount != 0) {
                    //             $('body').alertMessage({ type: 'error', message: 'Please call on pending follow-ups' });
                    //             $('.data-result-panel').rayanLoaderHide();
                    //             return false;
                    //         } else
                    //             loadViewsByAction('LeadForm', 'lead_form', '0', leadId);
                    //     },
                    //     error: function() {
                    //         $('.data-result-panel').rayanLoaderHide();
                    //     }
                    // });

                    var data = {};
                    data['leadId'] = leadId;

                    ajax_call('service/lead_management/getPendigFollowUpCount', 'POST', data, function(response) {
                        var response = JSON.parse(response);

                        var pendigFollowUpCount = (typeof response != 'undefined' && typeof response.pendigFollowUpCount != 'undefined') ? response.pendigFollowUpCount : 0;
                        if (pendigFollowUpCount != 0) {
                            $('body').alertMessage({ type: 'error', message: 'Please call on pending follow-ups' });
                            $('.data-result-panel').rayanLoaderHide();
                            return false;
                        } else
                            loadViewsByAction('LeadForm', 'lead_form', '0', leadId);
                    }, '', { "showLoader": true, "type": "form" });


                } else
                    loadViewsByAction('LeadForm', 'lead_form', '0', leadId);

            });
            $(document).on('dblclick', '.view-lead-detail', function() {
                var leadId = $(this).attr('data-lid');
                loadViewsByAction('LeadForm', 'lead_form', '0', leadId);
            });

            $(document).on('dblclick', '.view-bdlead-detail', function() {
                var affiliate_contact_number = $(this).attr('data-contact-number');
                loadViewsByAction('LeadForm', 'bd_lead_form', '0', affiliate_contact_number)
            });
            $(document).on('dblclick', '.view-customer_deatil', function() {
                var c_id = $(this).attr('data-cid');
                loadcustomterPanels(c_id);
            });

            $(document).on('dblclick', '.view-cp-detail', function() {
                bookingId = $(this).attr('data-bid');
                $('body').attr('current-order-status', $(this).attr('data-bstatus'));
                $('body').attr('active-role', 4);
                loadPanels();
            });
            $(document).on('click', '.new_booking', function() {
                newBooking();
            });

            $(document).on('click', '.edit-grid', function(e) {
                e.preventDefault();
                var mainBdy = $(this).closest('.box').find('.box-body');
                var $save = $('<a />', {
                    "class": "btn btn-success btn-sm",
                    "href": "#",
                    onclick: "save_grid_data($(this));"
                }).html("<i class='fa fa-save'></i>");
                var $cancelChange = $('<a />', {
                    "class": "btn btn-warning btn-sm",
                    "href": "#",
                    onclick: "refresh_booking_details();"
                }).html("Cancel Changes");
                var $boxTools = $(this).parent('div');
                $boxTools.append($save);
                $boxTools.append('&nbsp;');
                $boxTools.append($cancelChange);
                $boxTools.append('&nbsp;');
                $(this).hide();
                mainBdy.find('[column-editable]').each(function(k, ele) {
                    createFormElement($(ele).attr('column-type'), $(ele).attr('dvc-id'), $(ele).attr('column-name'), $(ele).text(), $(ele));
                });
            });

            $(document).on('change', '.srch-order-status', function() {
                $('body').attr('order-status', $(this).val());
                loadBookingFilters().then(function() {
                    refreshManinPanel();
                });
            });

            $(document).on('submit', '.panel-filter-form', function(e) {
                e.preventDefault();
                $('body').attr('next-page', 1);
                if ($('body').attr('panel-main') == 'main') {
                    var actionId = $('body').attr('actionId');
                    $('body').attr('panel-search', '1');
                    if (parseInt(actionId) == 0) {
                        loadBookings();
                        createTree();
                    } else {
                        loadActionList('', actionId);
                    }
                    // set predefined local storage value //
                    set_pre_filter_value();
                }
            });

            // set local storage on click function //

            $(document).on('click', '.local-filter-cls', function(e) {
                var obj = $(this);
                var filter_id = obj[0].id;
                var user_id = $('#filter_a_id').val();
                var roleId = $('body').attr('active-role');

                var cond = obj[0].checked;

                if (cond == true) {
                    set_local_filter(user_id, roleId, filter_id);
                } else {
                    unset_local_filter(user_id, roleId, filter_id);
                }

            });
        });
    }


    $(document).on('submit', '#add_remarks_form', function(e) {
        e.preventDefault();
        // $.ajax({
        //     url: __SITE.baseUrl + "service/booking_management/addRemarks",
        //     data: $('#add_remarks_form').serialize(),
        //     type: 'POST',
        //     dataType: 'json',
        //     success: function(response) {
        //         if (response && response.status) {
        //             $('body').alertMessage({ type: 'success', message: response.message });
        //             refresh_booking_details();
        //             $('#addRemarksModal').modal('hide');
        //         } else {
        //             $('body').alertMessage({ type: 'error', message: response.message });
        //         }
        //     }
        // });


        ajax_call('service/booking_management/addRemarks', 'POST', $('#add_remarks_form').serialize(), function(response) {
            if (response && response.status) {
                $('body').alertMessage({ type: 'success', message: response.message });
                refresh_booking_details();
                $('#addRemarksModal').modal('hide');
            } else {
                $('body').alertMessage({ type: 'error', message: response.message });
            }
        }, '', { "showLoader": true, "type": "form", "dataType": "json" });



    });

})(jQuery);
/* Lastbooking id status
 */
function setDialerStatus(bookingId) {

    // $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/getBookingStatus",
    //     data: { "bookingId": bookingId, "roleId": 0 },
    //     type: 'POST',
    //     dataType: 'json',
    //     success: function(response) {

    //         if (response) { return (response.deliveryStatus); } else { return false; }

    //     }
    // });

    var data = {};
    data['roleId'] = 0;
    data['bookingId'] = bookingId;

    ajax_call('service/booking_management/getBookingStatus', 'POST', data, function(response) {
        if (response) { return (response.deliveryStatus); } else { return false; }
    }, '', { "showLoader": true, "type": "form", "dataType": "json" });
}


function changePanelOnLoad() {

    var roleId = $('body').attr('active-role');
    //var  Type = Type.trim();
    /*
    var booking_status=setTimeout(function(){ setDialerStatus(bokingId); }, 1000);

    if(Type == "Cancellation_Refund" || Type == "Existing_Booking" || Type == "HExistingBooking" || Type == "EExisting_Booking" || Type == "Customer_Experience_DirestCalls") {
        $('body').attr('active-role', "9");
        $('body').attr('current-order-status', booking_status);
        $('body').attr('order-status', booking_status);
    } else if(Type == "Bookk_appointment" || Type == "HForDoctor"  || Type == "Doctors_DirectCalls" || Type == "Speak_HealthAdvisor"  ) {

        $('body').attr('active-role', "8");
        $('body').attr('current-order-status', '');
        $('body').attr('order-status', '12');
    } else {
        $('body').attr('active-role', "16");
        $('body').attr('order-status', '');
    }
     urlInfo['phoneNumber'] urlInfo['skillName']
    */

}
/*Global Functions*/

function createTree() {
    // var roleId = $('body').attr('active-role');
    // var oStatus = $('body').attr('order-status');
    // var page = $('body').attr('next-page');
    // oStatus = parseInt(oStatus) >= 0 ? parseInt(oStatus) : '';
    // var formData = $('.panel-filter-form').serializeArray();
    // var fromSearch = parseInt($('body').attr('panel-search')) > 0 ? parseInt($('body').attr('panel-search')) : 0;
    // if (fromSearch) {
    //     formData.push({ "name": "role_id", "value": roleId });
    //     formData.push({ "name": "page", "value": page });
    // } else {
    //     formData = { "role_id": roleId, order_status: oStatus, page: page };
    // }

    /* $.ajax({
         url: __SITE.baseUrl + "service/booking_management/getMenus",
         data: formData,
         type: "POST",
         beforeSend: function () {
             $(".sidebar-menu li ul").detach();
         //    $('.sidebar').rayanLoaderShow();
         },
         success: function (data) {
             $(".sidebar-menu li ul").detach();
             if (data) {
                 $(".sidebar-menu li:nth-child(2)").append("<ul>" + data + "</ul>");
             }
             $('.sidebar').rayanLoaderHide();
         },
         error: function () {
             $('.sidebar').rayanLoaderHide();
         }
     });*/
}

function loadBookings(_source) {
    source_type = _source ? _source : '';

    var roleId = $('body').attr('active-role');

    var page = $('body').attr('next-page');
    var oStatus = $('body').attr('order-status');
    oStatus = parseInt(oStatus) >= 0 ? parseInt(oStatus) : '';
    var formData = $('.panel-filter-form').serializeArray();
    var fromSearch = parseInt($('body').attr('panel-search')) > 0 ? parseInt($('body').attr('panel-search')) : 0;
    $('body').attr('actionId', 0);
    if (fromSearch) {
        formData.push({ "name": "role_id", "value": roleId });
        formData.push({ "name": "page", "value": page });
    } else {
        formData = { "role_id": roleId, page: page, order_status: oStatus };
    }






    // $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/get_bookings" + '?per_page=' + page,
    //     data: formData,
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         console.log("source_type  " + source_type + " - and  _source" + _source);
    //         if (source_type != 'back_button') {

    //             // setFilterSession(roleId,page,formData);
    //         }
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').html('<div class="box"><div class="box-header"><h3 class="box-title"><strong>Error</strong></h3></div><div class="box-body"><p class="alert alert-danger">Network error</p></div></div>');
    //     }
    // }).done(function() {
    //     //initGridScroll();
    // });




    ajax_call('service/booking_management/get_bookings?per_page=' + page, 'POST', formData, function(response) {
        console.log("source_type  " + source_type + " - and  _source" + _source);
        if (source_type != 'back_button') {
            // setFilterSession(roleId,page,formData);
        }
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, function() { $('.data-result-panel').html('<div class="box"><div class="box-header"><h3 class="box-title"><strong>Error</strong></h3></div><div class="box-body"><p class="alert alert-danger">Network error</p></div></div>'); }, { "showLoader": true, "type": "form" });
}

function loadPanels(_bookingId) {
    bookingId = _bookingId ? _bookingId : bookingId;
    var roleId = $('body').attr('active-role');
    var defaultStatus = $('body').attr('order-status');
    $('body').attr('current-booking', bookingId);
    $('.data-result-panel').rayanLoaderShow();
    var statusForSearch = $(".srch-order-status").val();
    if (typeof statusForSearch === 'undefined') {
        statusForSearch = 101;
    }
    if (typeof roleId === 'undefined') {
        roleId = 0;
    }
    var currentBookingStatus = $('body').attr('current-order-status');
    var _loadPanels = function() {
        /* To Loadd Panel*/
        loadGridPanels().then(function() {
            $('.data-result-panel').rayanLoaderHide();
            $.each(panels, function(index, value) {
                if (typeof value.name !== 'undefined' && value.name != '') {
                    // $.ajax({
                    //     url: __SITE.baseUrl + "service/booking_management/get_" + value.name,
                    //     beforeSend: function() {
                    //         $('.grid-' + value.name).find('.box-body').rayanLoaderShow();
                    //     },
                    //     data: { "bookingId": bookingId, "roleId": roleId, "order_status": defaultStatus, "current_booking_status": currentBookingStatus },
                    //     type: "POST",
                    //     success: function(data) {
                    //         $('.grid-' + value.name).find('.box-body').rayanLoaderHide();
                    //         if (data) {
                    //             $('.grid-' + value.name).find('.box-body').html(data);

                    //             var total_count = 0;
                    //             if (total_count == 0 && (value.name == 'booking_details' || value.name == 'customer_detail_remarketing')) {
                    //                 // setBookingSession( bookingId,roleId,currentBookingStatus,defaultStatus);
                    //                 total_count = 1
                    //             }
                    //         }

                    //     },
                    //     error: function() {
                    //         $('.grid-' + value.name).find('.box-body').rayanLoaderHide();
                    //     }
                    // });

                    var data = {};
                    data['bookingId'] = bookingId;
                    data['roleId'] = roleId;
                    data['order_status'] = defaultStatus;
                    data['current_booking_status'] = currentBookingStatus;

                    ajax_call('service/booking_management/get_' + value.name, 'POST', data, function(response) {
                        $('.grid-' + value.name).find('.box-body').rayanLoaderHide();
                        if (response) {
                            $('.grid-' + value.name).find('.box-body').html(response);

                            var total_count = 0;
                            if (total_count == 0 && (value.name == 'booking_details' || value.name == 'customer_detail_remarketing')) {
                                // setBookingSession( bookingId,roleId,currentBookingStatus,defaultStatus);
                                total_count = 1
                            }
                        }
                    }, function() { $('.grid-' + value.name).find('.box-body').rayanLoaderHide(); }, { "showLoader": true, "type": "form" });




                }
            });
        });
    }


    if (statusForSearch == 101 || roleId == 0) {
        /*Change order status if */
        $.ajax({
            url: __SITE.baseUrl + "service/booking_management/getBookingStatus",
            data: { "bookingId": bookingId, "roleId": roleId },
            type: "POST",
            dataType: 'json',
            success: function(data) {
                deliveryStatus = $.trim(data.deliveryStatus);
                roleId = $.trim(data.roleId);
                $('body').attr('order-status', deliveryStatus);
                $('body').attr('active-role', roleId);
                $(".srch-order-status option[value='" + deliveryStatus + "']").attr('selected', 'selected');
                defaultStatus = deliveryStatus;
            }
        }).then(_loadPanels);
    } else {
        _loadPanels();
    }
}



function loadcustomterPanels(_customer_id, panelCalledFor) {
    //console.log('::5::');
    customerID = _customer_id ? _customer_id : customerID;
    //console.log('customerID:::'+customerID);

    $('body').attr('current-booking', bookingId);
    $('.data-result-panel').rayanLoaderShow();
    var statusForSearch = $(".srch-order-status").val();
    if (panelCalledFor == 'remarketing') {
        var roleId = 3;
        var defaultStatus = '';
        var currentBookingStatus = '';
    } else {
        var currentBookingStatus = $('body').attr('current-order-status');
        var defaultStatus = $('body').attr('order-status');
        var roleId = $('body').attr('active-role');
        if (typeof statusForSearch === 'undefined') {
            statusForSearch = 101;
        }
        if (typeof roleId === 'undefined') {
            roleId = 0;
        }
    }

    var _loadPanels = function() {
        /* To Loadd Panel*/
        loadGridPanels().then(function() {
            $('.data-result-panel').rayanLoaderHide();
            $.each(panels, function(index, value) {
                //console.log(value);
                if (typeof value.name !== 'undefined' && value.name != '') {
                    // $.ajax({
                    //     url: __SITE.baseUrl + "service/booking_management/get_" + value.name,
                    //     beforeSend: function() {
                    //         $('.grid-' + value.name).find('.box-body').rayanLoaderShow();
                    //     },
                    //     data: { "customerId": customerID, "roleId": roleId, "order_status": defaultStatus, "current_booking_status": currentBookingStatus },
                    //     type: "POST",
                    //     success: function(data) {
                    //         $('.grid-' + value.name).find('.box-body').rayanLoaderHide();
                    //         if (data) {
                    //             $('.grid-' + value.name).find('.box-body').html(data);
                    //             var total_count = 0;
                    //             if (total_count == 0 && (value.name == 'customer_detail_remarketing')) {
                    //                 setCustomerSession(customerID, roleId);
                    //                 total_count = 1;
                    //             }
                    //         }

                    //     },
                    //     error: function() {
                    //         $('.grid-' + value.name).find('.box-body').rayanLoaderHide();
                    //     }
                    // });


                    var data = {};
                    data['customerId'] = customerID;
                    data['roleId'] = roleId;
                    data['order_status'] = defaultStatus;
                    data['current_booking_status'] = currentBookingStatus;

                    ajax_call('service/booking_management/get_' + value.name, 'POST', data, function(response) {
                        $('.grid-' + value.name).find('.box-body').rayanLoaderHide();
                        if (response) {
                            $('.grid-' + value.name).find('.box-body').html(response);
                            var total_count = 0;
                            if (total_count == 0 && (value.name == 'customer_detail_remarketing')) {
                                setCustomerSession(customerID, roleId);
                                total_count = 1;
                            }
                        }
                    }, function() { $('.grid-' + value.name).find('.box-body').rayanLoaderHide(); }, { "showLoader": true, "type": "form" });
                }
            });
        });
    }


    if (statusForSearch == 101 || roleId == 0) {
        /*Change order status if */
        $.ajax({
            url: __SITE.baseUrl + "service/booking_management/getBookingStatus",
            data: { "bookingId": bookingId, "roleId": roleId },
            type: "POST",
            dataType: 'json',
            success: function(data) {
                deliveryStatus = $.trim(data.deliveryStatus);
                roleId = $.trim(data.roleId);
                $('body').attr('order-status', deliveryStatus);
                $('body').attr('active-role', roleId);
                $(".srch-order-status option[value='" + data + "']").attr('selected', 'selected');
                defaultStatus = deliveryStatus;
            }
        }).then(_loadPanels);
    } else {
        _loadPanels();
    }
}




function loadGridPanels() {

    return loadGridPanelsByRoleId().then(function() {
        var roleId = $('body').attr('active-role');
        var defaultStatus = $('body').attr('order-status');
        return $.ajax({
            url: __SITE.baseUrl + "service/booking_management/get_grid_panels",
            data: { "role_id": roleId, "order_status": defaultStatus, bookingId: bookingId },
            type: "POST",
            success: function(data) {
                if (data) {
                    $('.data-result-panel').html(data);
                }

            }
        });

        // var data = {};
        // data['role_id'] = roleId;
        // data['order_status'] = defaultStatus;
        // data['bookingId'] = bookingId;

        // return ajax_call('service/booking_management/get_grid_panels', 'POST', data, function(response) {
        //     if (response) {
        //         $('.data-result-panel').html(response);
        //     }
        // }, '' , { "showLoader": true,"type":"form"});
    });
}

/*newBooking function to load new booking panel
 * @param none
 * @return none
 */
function newBooking() {
    // var roleId = $('body').attr('active-role');
    // var phoneNumber = $('body').attr('phoneNumber');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/load_new_booking_panel",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             if (document.getElementsByTagName('btn_follow_call')) {
    //                 var contact_number = $('#user_number').val();
    //                 var follow_up_id = $('#follow_up_id').val();
    //             }
    //             $('.data-result-panel').html(data);
    //             if (contact_number) {
    //                 $('#search-customer-val').val(contact_number);
    //                 $('#search-customer-val').trigger('change');
    //                 $('#coupon_code_div').append('<input type="hidden" name="follow_up_id" value="' + follow_up_id + '">');
    //             }
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });


    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/load_new_booking_panel', 'POST', data, function(response) {
        if (response) {
            if (document.getElementsByTagName('btn_follow_call')) {
                var contact_number = $('#user_number').val();
                var follow_up_id = $('#follow_up_id').val();
            }
            $('.data-result-panel').html(response);
            if (contact_number) {
                $('#search-customer-val').val(contact_number);
                $('#search-customer-val').trigger('change');
                $('#coupon_code_div').append('<input type="hidden" name="follow_up_id" value="' + follow_up_id + '">');
            }
        }
    }, '', { "showLoader": true, "type": "form" });
}

function loadGridPanelsByRoleId(roleId, defaultStatus) {

    if (defaultStatus == undefined || defaultStatus != 2) {
        var defaultStatus = $('body').attr('order-status');
    }
    if (roleId == undefined || roleId != 3) {
        var roleId = $('body').attr('active-role');
    }
    return $.ajax({
        url: __SITE.baseUrl + "service/booking_management/get_grid_panels_Info",
        data: { "role_id": roleId, "order_status": defaultStatus, bookingId: bookingId },
        type: "POST",
        dataType: "json",
        success: function(data) {
            panels = data.panel;
            roleId = data.role_id;
            $('body').attr('active-role', roleId)
            return data;
            // $.each( data, function( key, value ) {
            // });
        }
    });
}

function createFormElement(type, id, name, value, $whr) {

    var ele;
    var input = $('<input />');
    var select = $('<select></select>');
    var textarea = $('<textarea></textarea>');
    value = value.trim();
    switch (type) {
        case 'number':
            ele = $('<input />', { 'type': type, 'name': name, 'value': value, 'id': name + '_' + id, 'class': 'form-control', 'dvc-id': id });
            $whr.html('').append($('<div />', { "class": "form-row" }).append(ele));
            break;
        case 'text':
            ele = $('<input />', { 'type': type, 'name': name, 'value': value, 'id': name + '_' + id, 'class': 'form-control', 'dvc-id': id });
            $whr.html('').append($('<div />', { "class": "form-row" }).append(ele));
            break;
        case 'textarea':
            ele = $('<textarea></textarea>', { 'name': name, 'id': name + '_' + id, 'class': 'form-control', 'dvc-id': id }).text(value);
            $whr.html('').append($('<div />', { "class": "form-row" }).append(ele));
            break;
        case 'select':
            ele = $('<select></select>', { 'name': name, 'id': name + '_' + id, 'class': 'form-control', 'dvc-id': id });
            $whr.html('').append($('<div />', { "class": "form-row" }).append(ele));
            $.ajax({
                url: __SITE.baseUrl + 'service/booking_management/get_options',
                data: { dvc_id: id },
                type: "post",
                success: function(res) {
                    if (res && res.status) {
                        $.each(res.data, function(k, vl) {
                            ele.append($('<option />', { value: vl.value, text: vl.text }));
                        });

                        if (is_filter_select == 1) {

                            get_pre_filter();
                        }


                        //get_pre_filter();
                    }
                }
            }).then(function() {
                console.log(value);
                ele.val(value);
            });
            break;
    }

}

function initGridScroll() {
    //$('.dataTable_wrapper').slimScroll({height: _gridPanelHeight});
}

/*This function is used to */

function loadViewsByAction(apiActionName, jsActionName, drillDown, strParam, actionId, isDynamicListing, panelId) {

    clear_map_interval();
    var booking_id = $('body').attr('current-booking');
    var current_order_status = $('body').attr('current-order-status');
    var role_id = $('body').attr('active-role');
    var user_id = $('#filter_a_id').val();
    var service_id = $('#service_booking_id_0').val();
    insert_action_auditlog(user_id, jsActionName, role_id);

    if (typeof actionId != "undefined" && actionId > 0 && actionId != "") {
        data = { "actionId": actionId };

        ajax_call('service/booking_management/check_action_panel', 'POST', data, function(response) {
            if (response && response.status) {
                loadViewsByActiveAction(apiActionName, jsActionName, drillDown, strParam, actionId, isDynamicListing, panelId);
            } else {
                $('body').alertMessage({ type: 'error', message: response.message });
            }
        }, '', { "showLoader": true, "type": "form", "dataType": "json" });
    } else {
        loadViewsByActiveAction(apiActionName, jsActionName, drillDown, strParam, actionId, isDynamicListing, panelId);
    }
}


function loadViewsByActiveAction(apiActionName, jsActionName, drillDown, strParam, actionId, isDynamicListing, panelId) {

    var booking_id = $('body').attr('current-booking');
    var current_order_status = $('body').attr('current-order-status');
    var role_id = $('body').attr('active-role');
    var user_id = $('#filter_a_id').val();
    var service_id = $('#service_booking_id_0').val();
    var $mainActions = $('[main-actions]');
    if (panelId == 9) {
        $(".panel-filter-form").hide();
        $mainActions.html('');
    } else {
        $(".panel-filter-form").show();
    }

    var post_data = {};
    var qs = "";
    if (typeof strParam != 'undefined' && strParam.length > 0) {
        var params = new URLSearchParams(strParam);
        for (pair of params.entries()) {
            qs += pair[0] + "=" + pair[1] + "&";
            post_data[pair[0]] = pair[1];
        }

        if (qs.length > 0) {
            apiActionName += "?" + qs;
        }
    }
    if ("" != apiActionName && 1 == drillDown) {
        actionData = { 'actionName': apiActionName, 'booking_id': booking_id, 'service_id': service_id, 'role_id': role_id, 'user_id': user_id, 'unique_name': jsActionName, 'current_order_status': current_order_status };

        if (Object.keys(post_data).length > 0) {
            actionData = $.extend(actionData, post_data);
        }

        // $.ajax({
        //     url: __SITE.baseUrl + "service/panel_views/loadView" + apiActionName,
        //     data: actionData,
        //     type: "POST",
        //     beforeSend: function() {
        //         $('body').rayanLoaderShow();
        //     },
        //     success: function(data) {
        //         $('body').rayanLoaderHide();

        //         if (data) {
        //             $('body').find('#actionsView div').detach();
        //             $('body').find('#actionsView').append("<div>" + data + "</div>");
        //             if (jsActionName.trim()) {
        //                 var strFun = jsActionName;
        //                 var funcCall = strFun + "('" + strParam + "');";
        //                 try {
        //                     var ret = eval(funcCall);
        //                 } catch (err) {
        //                     console.log(err);
        //                 }
        //             }
        //             if (data.status === "error") {
        //                 $('body').alertMessage({ type: 'error', message: data.message });
        //             }
        //         }
        //     },
        //     error: function() {
        //         $('body').rayanLoaderHide();
        //     }
        // });

        ajax_call('service/panel_views/loadView' + apiActionName, 'POST', actionData, function(response) {

            if (response) {
                $('body').find('#actionsView div').detach();
                $('body').find('#actionsView').append("<div>" + response + "</div>");
                if (jsActionName.trim()) {
                    var strFun = jsActionName;
                    var funcCall = strFun + "('" + strParam + "');";
                    try {
                        var ret = eval(funcCall);
                    } catch (err) {
                        console.log(err);
                    }
                }
                if (response.status === "error") {
                    $('body').alertMessage({ type: 'error', message: response.message });
                }
            }
        }, '', { "showLoader": true, "type": "form" });




    } else if (isDynamicListing == 1 && drillDown == 0) {
        if (jsActionName.trim()) {
            var strFun = "loadActionList";
            var funcCall = strFun + "('" + strParam + "','" + actionId + "');";
            try {
                var ret = eval(funcCall);
                // setActionSession(role_id,funcCall);
            } catch (err) {
                console.log(err);
            }
        }
    } else {
        if (jsActionName.trim()) {
            var strFun = jsActionName;
            var funcCall = strFun + "('" + strParam + "','" + actionId + "');";
            try {
                var ret = eval(funcCall);
                // setActionSession(role_id,funcCall);
            } catch (err) {
                if (strFun.indexOf("_action_param_") > -1) {
                    var parts = strFun.split("_action_param_");
                    if (parts.length > 1) {
                        var handler = parts[0];
                        var params = parts[1];

                        try {
                            custom_action_handler(handler, params);
                        } catch (e) {
                            console.log("action_param not found.");
                        }
                    }
                } else {
                    console.log(err);
                }
            }
        }
    }
}

function merchant_upload_report() {
    var $modal = $('#uploadReportModal');
    $modal.modal('show');
    $modal.find('form').on('submit', function(e) {
        e.preventDefault();
        var $this = $(this);

        $.ajax({
            url: __SITE.baseUrl + 'service/booking_management/merchant_upload_report',
            data: $this.serializeFiles(),
            dataType: 'json',
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function() {
                $modal.find('.modal-body').rayanLoaderShow();
            },
            success: function(response) {
                if (response && response.status) {
                    $('body').alertMessage({ type: 'success', message: response.message });
                    $modal.modal('hide');
                    refresh_booking_details();
                } else {
                    $('body').alertMessage({ type: 'error', message: response.message });
                }
                $modal.find('.modal-body').rayanLoaderHide();
            },
            error: function() {
                $modal.find('.modal-body').rayanLoaderHide();
            }
        });
    });
}

function merchant_uploaded_report() {
    var bookingId = $('body').attr('current-booking');
    var current_order_status = $('body').attr('current-order-status');
    var data = { booking_id: bookingId, unique_name: "merchant_uploaded_report", current_order_status: current_order_status }
    var ajaxCall = function(data) {
        // $.ajax({
        //     url: __SITE.baseUrl + 'service/booking_management/mark_uploaded_report',
        //     data: data,
        //     dataType: 'json',
        //     type: 'POST',
        //     beforeSend: function() {
        //         $('body').rayanLoaderShow();
        //     },
        //     success: function(response) {
        //         $('body').rayanLoaderHide();
        //         if (response && response.status && response.status === true) {
        //             $('body').alertMessage({ type: 'success', message: response.message });
        //             refreshManinPanel();
        //         } else {
        //             if (response.alert) {
        //                 $.confirmIt(response.message, function() {
        //                     data.force_complete = 1;
        //                     ajaxCall(data);
        //                 });
        //             } else {
        //                 $('body').alertMessage({ type: 'error', message: response.message });
        //             }
        //         }
        //     },
        //     error: function() {
        //         $('body').rayanLoaderHide();
        //     }
        // });

        ajax_call('service/booking_management/mark_uploaded_report', 'POST', data, function(response) {
            if (response && response.status && response.status === true) {
                $('body').alertMessage({ type: 'success', message: response.message });
                refreshManinPanel();
            } else {
                if (response.alert) {
                    $.confirmIt(response.message, function() {
                        data.force_complete = 1;
                        ajaxCall(data);
                    });
                } else {
                    $('body').alertMessage({ type: 'error', message: response.message });
                }
            }
        }, '', { "showLoader": true, "type": "form", "dataType": "json" });

    }
    $.confirmIt('Do you want to mark this booking as report uploaded!', function() {
        ajaxCall(data);
    });
}

function getbooking(bookingId, status) {
    if (!status || $.trim(status) == '' || status < 0) {
        status = '';
    }
    $('body').attr('current-order-status', status);
    loadPanels(bookingId);
}

function getcustomer(bookingId, status) {
    if (!status || $.trim(status) == '' || status < 0) {
        status = '';
    }
    $('body').attr('current-order-status', status);
    loadPanels(bookingId);
}


function verify_booking() {
    var booking_id = $('body').attr('current-booking');

    $.confirmIt('Are you sure?', function() {
        // $.ajax({
        //     url: __SITE.baseUrl + 'service/booking_management/verifyBooking',
        //     data: { "booking_id": booking_id },
        //     type: "POST",
        //     dataType: "json",
        //     success: function(response) {
        //         if (response && response.status) {
        //             $('body').alertMessage({ type: 'success', message: response.message });
        //             refreshManinPanel();
        //         } else {
        //             $('body').alertMessage({ type: 'error', message: response.message });
        //         }

        //     }
        // });

        var data = {};
        data['booking_id'] = booking_id;

        ajax_call('service/booking_management/verifyBooking', 'POST', data, function(response) {
            if (response && response.status) {
                $('body').alertMessage({ type: 'success', message: response.message });
                refreshManinPanel();
            } else {
                $('body').alertMessage({ type: 'error', message: response.message });
            }
        }, '', { "showLoader": true, "type": "form", "dataType": "json" });

    });
}


function remarketing_filters() {
    // $.ajax({
    //     url: __SITE.baseUrl + "service/remarketing/remarketing_filters",
    //     data: { "admin_id": $("#crm_user_id").val() },
    //     type: 'POST',
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         //$('body').find('#filter div').detach();
    //         //$('body').find('#filter').append("<div>" + data + "</div>");

    //         $('.data-result-panel').rayanLoaderHide();
    //         $('.data-result-panel  div').detach();

    //         if (data) {
    //             $('.data-result-panel').append("<div>" + data + "</div>");
    //         }
    //         $("#remarketing_filter_modal").modal('show');
    //         $(".range_date").daterangepicker({ format: 'YYYY/MM/DD', separator: ' - ' });

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['admin_id'] = $("#crm_user_id").val();

    ajax_call('service/remarketing/remarketing_filters', 'POST', data, function(response) {
        $('.data-result-panel  div').detach();
        if (response) {
            $('.data-result-panel').append("<div>" + response + "</div>");
        }
        $("#remarketing_filter_modal").modal('show');
        $(".range_date").daterangepicker({ format: 'YYYY/MM/DD', separator: ' - ' });
    }, '', { "showLoader": true, "type": "form" });
}

function refreshManinPanel() {
    $('body').attr('next-page', 1);
    var roleId = $('body').attr('active-role');
    var booking_id = $('body').attr('current-booking');
    if (dialerbaseUrl != "" && roleId == 16) {
        location.reload();
    } else if (roleId == 3) {
        customer_follow_up();
    } else if (roleId == 33) {
        subscription();

    } else {

        //  loadBookings();
        loadBlankBookingView();
    }
    createTree();
    getMainActions();
}

function getOrderStatus() {
    var roleId = $('body').attr('active-role');
    var $orderStatus = $('.srch-order-status');
    // $.ajax({
    //     url: __SITE.baseUrl + 'service/booking_management/get_order_status',
    //     data: { role_id: roleId },
    //     type: 'POST',
    //     beforeSend: function() {
    //         $orderStatus.html('');
    //     },
    //     success: function(response) {
    //         if (response && response.status) {
    //             $.each(response.data, function(k, v) {
    //                 $orderStatus.append($('<option value="' + v.id + '">' + v.name + '</option>'));
    //             });
    //         }
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/get_order_status', 'POST', data, function(response) {
        if (response && response.status) {
            $.each(response.data, function(k, v) {
                $orderStatus.append($('<option value="' + v.id + '">' + v.name + '</option>'));
            });
        }
    }, '', { "showLoader": true, "type": "form" });

}

function getMainActions() {
    // if(crm_version==1){        
    var roleId = $('body').attr('active-role');
    var orderStatus = $('body').attr('order-status');
    var $mainActions = $('[main-actions]');
    // $.ajax({
    //     url: __SITE.baseUrl + 'service/booking_management/getMainActions',
    //     data: { role_id: roleId, "order_status": orderStatus },
    //     type: 'POST',
    //     beforeSend: function() {
    //         $mainActions.html('');
    //     },
    //     success: function(response) {

    //         $mainActions.html(response);
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['order_status'] = orderStatus;

    ajax_call('service/booking_management/getMainActions', 'POST', data, function(response) {
        $mainActions.html(response);
    }, '', { "showLoader": true, "type": "form" });


    // }
}

function btn_click_call(strParam, param1) {
    var booking_id = $('body').attr('current-booking');
    var $modal = $('#btn_click_call_modal');
    $modal.modal('show');
}

function undo_booking(strParam, param1) {
    var booking_id = $('body').attr('current-booking');
    var $modal = $('#btn_undo_booking_modal');
    $modal.modal('show');
}



function btn_resend_report(strParam, param1) {
    var booking_id = $('body').attr('current-booking');
    var $modal = $('#btn_resend_report_modal');
    $modal.modal('show');
}

function loadBookingFilters(actionId) {
    var roleId = $('body').attr('active-role');
    var oStatus = $('body').attr('order-status');
    var panelName = $('body').attr('panel-main');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/get_filters",
    //     data: { "role_id": roleId, "order_status": oStatus, "panel": panelName, "actionId": actionId },
    //     type: "POST",
    //     beforeSend: function() {

    //     },
    //     success: function(data) {

    //         if (data) {
    //             $('.panle-filters').html(data);
    //             loadFilterValues();
    //             get_pre_filter();
    //         }
    //     },
    //     error: function() {

    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['order_status'] = oStatus;
    data['panel'] = panelName;
    data['actionId'] = actionId;

    ajax_call('service/booking_management/get_filters', 'POST', data, function(response) {
        if (response) {
            $('.panle-filters').html(response);
            loadFilterValues();
            get_pre_filter();
        }
    }, '', { "showLoader": true, "type": "form" });
}

function loadFilterValues() {
    var $parent = $('.panle-filters');
    $parent.find('select[is-dynamic=1]').each(function(k, el) {
        // $.ajax({
        //     url: __SITE.baseUrl + 'service/booking_management/get_options',
        //     data: { type: $(el).attr('data-options') },
        //     type: "POST",
        //     success: function(response) {
        //         if (response && response.status && response.data) {
        //             $.each(response.data, function(k, opt) {
        //                 $(el).append($('<option value="' + opt.id + '">' + opt.name + '</option>'));
        //             });

        //             // set  filter data //
        //             if (is_filter_select == 1) {

        //                 get_pre_filter();
        //             }

        //         }
        //     }
        // })

        var data = {};
        data['type'] = $(el).attr('data-options');

        ajax_call('service/booking_management/get_options', 'POST', data, function(response) {
            if (response && response.status && response.data) {
                $.each(response.data, function(k, opt) {
                    $(el).append($('<option value="' + opt.id + '">' + opt.name + '</option>'));
                });

                // set  filter data //
                if (is_filter_select == 1) {

                    get_pre_filter();
                }

            }
        }, '', { "showLoader": true, "type": "form" });


    });

    $parent.find('[data-daterange]').each(function(k, el) {
        $(el).daterangepicker();
    });
}

function btn_view_report(strParam, param1) {
    var booking_id = $('body').attr('current-booking');
    var $modal = $('#btn_viewCustList');
    $modal.modal('show');

}



function btn_call_nc() {
    var booking_id = $('body').attr('current-booking');

    // return $.ajax({
    //     url: __SITE.baseUrl + "service/panel_views/loadViewBtnCallNC",
    //     data: {

    //         "booking_id": booking_id,
    //         "unique_name": "btn_call_nc",
    //         "role_id": $('body').attr('active-role')
    //     },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (response.data) {
    //             $('.data-result-panel').html(response.data);
    //         }
    //         if (response.status === "error") {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //             var $modal = $('#btn_callNcModal');
    //             $modal.modal('hide');
    //             refresh_booking_details();
    //         } else {

    //             var $modal = $(' #btn_callNcModal');
    //             $modal.modal('show');
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['unique_name'] = "btn_call_nc";
    data['booking_id'] = booking_id;

    ajax_call('service/panel_views/loadViewBtnCallNC', 'POST', data, function(response) {
        if (response.data) {
            $('.data-result-panel').html(response.data);
        }
        if (response.status === "error") {
            $('body').alertMessage({ type: 'error', message: response.message });
            var $modal = $('#btn_callNcModal');
            $modal.modal('hide');
            refresh_booking_details();
        } else {

            var $modal = $(' #btn_callNcModal');
            $modal.modal('show');
        }
    }, '', { "showLoader": true, "type": "form" });


    /* if (response.status === "error") {
     $('body').alertMessage({type: 'error', message: response.message});
     var $modal = $('#btn_callNcModal');
     $modal.modal('hide');
     refresh_booking_details();
     } else {

     var $modal = $('#btn_callNcModal');
     $modal.modal('show');
     } */
}

function report_download() {
    var booking_id = $('body').attr('current-booking');
    var $modal = $('#download_report_modal');
    $modal.modal('show');
}

function add_phlebo() {

    var $modal = $('#btn_add_phlebo');
    $modal.modal('show');
    $modal.find('form').on('submit', function(e) {
        e.preventDefault();

        var pName = $("#pName").val();
        var email = $("#email").val();
        var emp_code_text = $.trim($('#emp_code_text').html());
        var emp_code = $.trim($("#emp_code").val());
        //var emp_code = emp_code_text+emp_code;
        var connumber = $("#connumber").val();
        var contact_other = $("#contact_other").val();
        var home_zip_code = $("#home_zip_code").val();
        //var startDate = $("#datepicker1_phlebo").val();
        var JoinDate = $("#datepicker2_phlebo").val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var mobile_numer_regx = /^[6789]\d{9}$/;
        //var empRegex = /^[ A-Za-z0-9/]*$/;
        var empRegex = /^[0-9]*$/;
        //var starttime = $("#starttime option:selected").text();
        //var endtime = $("#endtime option:selected").text();


        if ($.isNumeric(pName)) {
            alert("Phelbo Name should be alphabatic only");
            return false;
        }

        if (!regex.test(email)) {
            alert("Please enter correct email address");
            return false;
        }

        if (!$.isNumeric(connumber)) {
            alert("Contact number should be numeric only");
            return false;
        }
        if (connumber != "" && connumber.length < 10) {
            alert("Contact number should have 10 digit");
            return false;
        }
        if (contact_other != "" && !$.isNumeric(contact_other)) {
            alert("Alternate number should be numeric only");
            return false;
        }
        if (contact_other != "" && contact_other.length < 10) {
            alert("Alternate number should have 10 digit");
            return false;
        }


        if (!mobile_numer_regx.test(connumber)) {
            alert("Please enter correct contact number");
            return false;
        }

        if (!mobile_numer_regx.test(contact_other)) {
            alert("Please enter correct alternate number");
            return false;
        }


        if (!empRegex.test(emp_code)) {
            alert("Please enter only numbers in Employee Code");
            return false;
        }
        if (home_zip_code != "" && !$.isNumeric(home_zip_code)) {
            alert("Zipcode should be numeric");
            return false;
        }
        /*if(startDate == "" || startDate == null){
            alert("On Field Pickup Start Date cannot be empty");
            return false;
        }*/
        if (JoinDate == "" || JoinDate == null) {
            alert("Healthians Joining Date cannot be empty");
            return false;
        }
        var timefrom = new Date();
        temp = $('#starttime').val().split(":");
        timefrom.setHours((parseInt(temp[0]) - 1 + 24) % 24);
        timefrom.setMinutes(parseInt(temp[1]));

        var timeto = new Date();
        temp = $('#endtime').val().split(":");
        timeto.setHours((parseInt(temp[0]) - 1 + 24) % 24);
        timeto.setMinutes(parseInt(temp[1]));

        if (timeto < timefrom) {
            alert('Start time should be smaller');
            return false;
        }


        var home_lat = $('#home_latitude').val();
        var home_long = $('#home_longitude').val();

        if (home_lat == '' || home_long == '') {

            alert("please choose correct home sublocality");
            $('#sub_locality').focus();
            return false;

        }


        var $this = $(this);
        $.ajax({
            url: __SITE.baseUrl + 'service/booking_management/add_phlebo_details',
            data: $this.serializeFiles(),
            dataType: 'json',
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function() {
                $modal.find('.modal-body').rayanLoaderShow();
            },
            success: function(response) {
                if (response && response.status) {
                    $('body').alertMessage({ type: 'success', message: response.message });
                    $modal.modal('hide');
                } else {
                    $('body').alertMessage({ type: 'error', message: response.message });
                }
                $modal.find('.modal-body').rayanLoaderHide();
            },
            error: function() {
                $modal.find('.modal-body').rayanLoaderHide();
            }
        });
    });

}

function add_priority() {

    var $modal = $('#btn_add_priority');
    $modal.modal('show');
    $modal.find('form').on('submit', function(e) {
        e.preventDefault();
        var $this = $(this);
        $.ajax({
            url: __SITE.baseUrl + 'service/booking_management/add_priority_details',
            data: $this.serializeFiles(),
            dataType: 'json',
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function() {
                $modal.find('.modal-body').rayanLoaderShow();
            },
            success: function(response) {
                if (response && response.status) {
                    $('body').alertMessage({ type: 'success', message: response.message });
                    $modal.modal('hide');
                } else {
                    $('body').alertMessage({ type: 'error', message: response.message });
                }
                $modal.find('.modal-body').rayanLoaderHide();
            },
            error: function() {
                $modal.find('.modal-body').rayanLoaderHide();
            }
        });

        // ajax_call('service/booking_management/add_priority_details', 'POST', $this.serializeFiles(), function(response) {
        //     if (response && response.status) {
        //         $('body').alertMessage({ type: 'success', message: response.message });
        //         $modal.modal('hide');
        //     } else {
        //         $('body').alertMessage({ type: 'error', message: response.message });
        //     }
        //     $modal.find('.modal-body').rayanLoaderHide();
        // }, function(){ $modal.find('.modal-body').rayanLoaderHide(); }, { "showLoader": true,"type":"form","dataType":"json"});




    });

}

function foc_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadFOCList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadFOCList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}





function foc_booking() {

    var $modal = $('#foc_booking_div');
    $modal.modal('show');
    $modal.find('form').on('submit', function(e) {
        e.preventDefault();
        var $this = $(this);
        $.ajax({
            url: __SITE.baseUrl + 'service/booking_management/add_foc_booking',
            data: $this.serializeFiles(),
            dataType: 'json',
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function() {
                $modal.find('.modal-body').rayanLoaderShow();
            },
            success: function(response) {
                if (response && response.status) {
                    $('body').alertMessage({ type: 'success', message: response.message });
                    $modal.modal('hide');
                } else {
                    $('body').alertMessage({ type: 'error', message: response.message });
                }
                $modal.find('.modal-body').rayanLoaderHide();
            },
            error: function() {
                $modal.find('.modal-body').rayanLoaderHide();
            }
        });


        // ajax_call('service/booking_management/add_foc_booking', 'POST', $this.serializeFiles(), function(response) {
        //     if (response && response.status) {
        //         $('body').alertMessage({ type: 'success', message: response.message });
        //         $modal.modal('hide');
        //     } else {
        //         $('body').alertMessage({ type: 'error', message: response.message });
        //     }
        //     $modal.find('.modal-body').rayanLoaderHide();
        // }, '' , { "showLoader": true,"type":"form","dataType":"json"});

    });

    $modal.find('#foc_booking_reason').on('change', function(e) {
        var reason_text = $(this).find("option:selected").text();
        reason_text = reason_text.toUpperCase();
        reason_text = reason_text.trim();
        reason_value = $(this).val();
        if (!reason_value || (reason_text == 'VIP')) {
            $('#foc_ref_booking_id_div').hide();
            $('#foc_ref_booking_id').val();
        } else {
            $('#foc_booking_id').trigger('keyup');
        }
    });


    $modal.find('#foc_booking_id').on('keyup', function(e) {

        var reason_value = $('#foc_booking_reason').val();
        if (!reason_value) {
            alert("First select reson for FOC");
            return false;
        }
        var reason_text = $('#foc_booking_reason option:selected').text();
        reason_text = reason_text.toUpperCase();
        reason_text = reason_text.trim();
        if (reason_value && (reason_text != 'VIP')) {
            // $.ajax({
            //     url: __SITE.baseUrl + 'crmuser/orders/getLastOrderbyBookingId',
            //     data: { foc_booking_id: $('#foc_booking_id').val() },
            //     dataType: 'json',
            //     type: 'POST',
            //     cache: false,
            //     success: function(response) {
            //         if (response && response.status) {
            //             $('#foc_ref_booking_id_div').show();
            //             var ref_booking_id = response.data.foc_ref_booking_id;
            //             ref_booking_id = ref_booking_id.trim();
            //             $('#foc_ref_booking_id').val(ref_booking_id);
            //         } else {
            //             $('#foc_ref_booking_id_div').hide();
            //             $('#foc_ref_booking_id').val();
            //             // $('body').alertMessage({type: 'error', message: response.message});
            //         }
            //         //$modal.find('.modal-body').rayanLoaderHide();
            //     },
            //     error: function() {
            //         //$modal.find('.modal-body').rayanLoaderHide();
            //     }
            // });

            var data = {};
            data['foc_booking_id'] = $('#foc_booking_id').val();

            ajax_call('crmuser/orders/getLastOrderbyBookingId', 'POST', data, function(response) {
                if (response && response.status) {
                    $('#foc_ref_booking_id_div').show();
                    var ref_booking_id = response.data.foc_ref_booking_id;
                    ref_booking_id = ref_booking_id.trim();
                    $('#foc_ref_booking_id').val(ref_booking_id);
                } else {
                    $('#foc_ref_booking_id_div').hide();
                    $('#foc_ref_booking_id').val();
                    // $('body').alertMessage({type: 'error', message: response.message});
                }
            }, '', { "showLoader": false, "type": "form", "dataType": "json" });
        }

    });

}

function foc_booking() {

    var $modal = $('#foc_booking_div');
    $modal.modal('show');
    $modal.find('form').on('submit', function(e) {
        e.preventDefault();
        var $this = $(this);
        $.ajax({
            url: __SITE.baseUrl + 'service/booking_management/add_foc_booking',
            data: $this.serializeFiles(),
            dataType: 'json',
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function() {
                $modal.find('.modal-body').rayanLoaderShow();
            },
            success: function(response) {
                if (response && response.status) {
                    $('body').alertMessage({ type: 'success', message: response.message });
                    $modal.modal('hide');
                } else {
                    $('body').alertMessage({ type: 'error', message: response.message });
                }
                $modal.find('.modal-body').rayanLoaderHide();
            },
            error: function() {
                $modal.find('.modal-body').rayanLoaderHide();
            }
        });

    });

    $modal.find('#foc_booking_reason').on('change', function(e) {
        var reason_text = $(this).find("option:selected").text();
        reason_text = reason_text.toUpperCase();
        reason_text = reason_text.trim();
        reason_value = $(this).val();
        if (!reason_value || (reason_text == 'VIP')) {
            $('#foc_ref_booking_id_div').hide();
            $('#foc_ref_booking_id').val();
        } else {
            $('#foc_booking_id').trigger('keyup');
        }
    });


    $modal.find('#foc_booking_id').on('keyup', function(e) {

        var reason_value = $('#foc_booking_reason').val();
        if (!reason_value) {
            alert("First select reson for FOC");
            return false;
        }
        var reason_text = $('#foc_booking_reason option:selected').text();
        reason_text = reason_text.toUpperCase();
        reason_text = reason_text.trim();
        if (reason_value && (reason_text != 'VIP')) {
            // $.ajax({
            //     url: __SITE.baseUrl + 'crmuser/orders/getLastOrderbyBookingId',
            //     data: { foc_booking_id: $('#foc_booking_id').val() },
            //     dataType: 'json',
            //     type: 'POST',
            //     cache: false,
            //     success: function(response) {
            //         if (response && response.status) {
            //             $('#foc_ref_booking_id_div').show();
            //             var ref_booking_id = response.data.foc_ref_booking_id;
            //             ref_booking_id = ref_booking_id.trim();
            //             $('#foc_ref_booking_id').val(ref_booking_id);
            //         } else {
            //             $('#foc_ref_booking_id_div').hide();
            //             $('#foc_ref_booking_id').val();
            //             // $('body').alertMessage({type: 'error', message: response.message});
            //         }
            //         //$modal.find('.modal-body').rayanLoaderHide();
            //     },
            //     error: function() {
            //         //$modal.find('.modal-body').rayanLoaderHide();
            //     }
            // });

            var data = {};
            data['foc_booking_id'] = $('#foc_booking_id').val();

            ajax_call('crmuser/orders/getLastOrderbyBookingId', 'POST', data, function(response) {
                if (response && response.status) {
                    $('#foc_ref_booking_id_div').show();
                    var ref_booking_id = response.data.foc_ref_booking_id;
                    ref_booking_id = ref_booking_id.trim();
                    $('#foc_ref_booking_id').val(ref_booking_id);
                } else {
                    $('#foc_ref_booking_id_div').hide();
                    $('#foc_ref_booking_id').val();
                    // $('body').alertMessage({type: 'error', message: response.message});
                }
            }, '', { "showLoader": false, "type": "form", "dataType": "json" });
        }

    });

}

function add_zone() {

    var $modal = $('#btn_add_zone');
    $modal.modal('show');
    $modal.find('form').on('submit', function(e) {
        e.preventDefault();
        var $this = $(this);
        $.ajax({
            url: __SITE.baseUrl + 'service/booking_management/add_zone_details',
            data: $this.serializeFiles(),
            dataType: 'json',
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function() {
                $modal.find('.modal-body').rayanLoaderShow();
            },
            success: function(response) {
                if (response && response.status) {
                    $('body').alertMessage({ type: 'success', message: response.message });
                    $modal.modal('hide');
                } else {
                    $('body').alertMessage({ type: 'error', message: response.message });
                }
                $modal.find('.modal-body').rayanLoaderHide();
            },
            error: function() {
                $modal.find('.modal-body').rayanLoaderHide();
            }
        });
    });
}

function remark_list(orderid) {
    var booking_id = $('body').attr('current-booking');
    orderid = (booking_id) ? booking_id : orderid;
    $('#cancel_order_id').val(orderid);
    $('#addRemarksModal').modal('show');

}

function edit_information() {

    var booking_id = $('body').attr('current-booking');
    var $modal = $('#btn_viewCustList');
    $modal.modal('show');

}

function addon_booking() {
    $('#addonBookingModal').modal('show');
    $('#addonBookingModal').on('shown.bs.modal', function() {
        var $this = $(this);
        calcPackagePrice($this, 'alreadyAdded');
        addPatientRowToAddOn($this);
    });
}

function send_email() {
    var booking_id = $('body').attr('current-booking');
    // alert(booking_id);

    // $.ajax({
    //     url: __SITE.baseUrl + 'service/booking_management/sendBookingEmail',
    //     data: { booking_id: booking_id },
    //     type: 'POST',
    //     beforeSend: function() {

    //     },
    //     success: function(response) {

    //     },
    //     error: function() {

    //     }
    // });

    var data = {};
    data['booking_id'] = booking_id;

    ajax_call('service/booking_management/sendBookingEmail', 'POST', data, function(response) {}, '', { "showLoader": true, "type": "form" });
}

// function connection_dil_se()
// {
//     return $.ajax({
//         url: __SITE.baseUrl + "service/connect_dil_se/list_audio",
//         data: '',
//         type: "POST",
//         beforeSend: function () {
//             $('.data-result-panel').rayanLoaderShow();
//         },
//         success: function (data) {
//             $('.data-result-panel').rayanLoaderHide();
//             if (data) {
//                 $('.data-result-panel').html(data);
//             }
//         },
//         error: function () {
//             $('.data-result-panel').rayanLoaderHide();
//         }
//     });
// }

function calcPackagePrice($parentModal, type = '') {
    var _total = 0;
    var _final = 0;
    var op = 0;
    var service_total = 0;
    var service_pkg_total = 0;
    // var donation=0;
    $parentModal.find('input.package-prc').each(function(k, ele) {
        _total += parseFloat($(ele).val());
    });

    // var donation=$("#donation").val();

    $parentModal.find('input.service-prc').each(function(k, ele) {
        service_total += parseFloat($(ele).val());
    });

    var user_id = $(this).closest('form').find('[name=user_id]').val();

    _final = _total;
    op = _total;
    var conv = 0;



    $parentModal.find('td[data-add]').each(function(k, ele) {
        if ($(ele).attr('class') != 'pkg-convenience_amount') {
            op += parseFloat($(ele).attr('data-add'));
        } else {
            conv += parseFloat($(ele).attr('data-add'));
        }
    });

    $parentModal.find('td[data-subtract]').each(function(k, ele) {
        op -= parseFloat($(ele).attr('data-subtract'));
    });

    if (op < 0) {
        op = op + conv;
    }

    var fastingStatus = 0;
    var selector = $parentModal.selector;
    if (selector === '#addonBookingModal') {
        $(".fastingAddOn").each(function(index) {
            if ($(this).val() == 1) {
                fastingStatus = 1;

            }
        });
    }
    var booking_id = $('body').attr('current-booking');

    // $.ajax({
    //     url: __SITE.baseUrl + 'service/booking_management/getConvenienceFee',
    //     data: { 'booking_id': booking_id, 'order_price': op },
    //     type: 'post',
    //     success: function(data) {
    //         // cf1=data[0][]
    //         if (type == 'alreadyAdded') {
    //             var convenience_amount = $parentModal.find('.pkg-convenience_amount').html();
    //         } else {
    //             var convenience_amount = data.cf;
    //             $parentModal.find('.pkg-convenience_amount').attr('data-add', convenience_amount);
    //         }

    //         $parentModal.find('td[data-add]').each(function(k, ele) {
    //             _final += parseFloat($(ele).attr('data-add'));
    //         });

    //         // _final=_final+parseInt(donation);

    //         $parentModal.find('td[data-subtract]').each(function(k, ele) {
    //             _final -= parseFloat($(ele).attr('data-subtract'));
    //         });
    //         // if(type!='alreadyAdded'){
    //         //     _final=parseInt(_final)+parseInt(convenience_amount);
    //         // }


    //         _final = (_final > 0) ? _final : 0;

    //         service_pkg_total = parseInt(_final) + parseInt(service_total);

    //         service_pkg_total = (service_pkg_total > 0) ? service_pkg_total : 0;

    //         $parentModal.find('.pkg-sub-total').html(_total);
    //         $parentModal.find('.pkg-convenience_amount').html(convenience_amount);
    //         $parentModal.find('.pckg-total-prc').html(_final);
    //         $parentModal.find('.pckg-total-price').val(_final);
    //         $parentModal.find('.service-total-prc').html(service_total);
    //         $parentModal.find('.service-total-price').val(service_total);
    //         // $parentModal.find('.donation-total-prc').html(donation);
    //         // $parentModal.find('.donation-total-price').val(donation);
    //         $parentModal.find('.service-pckg-total-prc').html(service_pkg_total);
    //         $parentModal.find('.service-pckg-total-price').val(service_pkg_total);
    //     },
    //     error: function() {}
    // });

    var data = {};
    data['booking_id'] = booking_id;
    data['order_price'] = op;
    data['fastingStatus'] = fastingStatus;

    ajax_call('service/booking_management/getConvenienceFee', 'POST', data, function(response) {
        // cf1=data[0][]
        if (type == 'alreadyAdded') {
            var convenience_amount = $parentModal.find('.pkg-convenience_amount').html();
        } else {
            var convenience_amount = response.cf;
            $parentModal.find('.pkg-convenience_amount').attr('data-add', convenience_amount);
        }
        var convenience_amount_before = $parentModal.find('.pkg-convenience_amount').html();
        if (convenience_amount_before != convenience_amount && convenience_amount > 0) {
            alert("Additional Convenience Fee of Rs." + convenience_amount + " will be applied on this booking");
        }
        $parentModal.find('td[data-add]').each(function(k, ele) {
            _final += parseFloat($(ele).attr('data-add'));
        });

        // _final=_final+parseInt(donation);

        $parentModal.find('td[data-subtract]').each(function(k, ele) {
            _final -= parseFloat($(ele).attr('data-subtract'));
        });
        // if(type!='alreadyAdded'){
        //     _final=parseInt(_final)+parseInt(convenience_amount);
        // }


        _final = (_final > 0) ? _final : 0;

        service_pkg_total = parseInt(_final) + parseInt(service_total);

        service_pkg_total = (service_pkg_total > 0) ? service_pkg_total : 0;

        $parentModal.find('.pkg-sub-total').html(_total);
        $parentModal.find('.pkg-convenience_amount').html(convenience_amount);
        $parentModal.find('.pckg-total-prc').html(_final);
        $parentModal.find('.pckg-total-price').val(_final);
        $parentModal.find('.service-total-prc').html(service_total);
        $parentModal.find('.service-total-price').val(service_total);
        // $parentModal.find('.donation-total-prc').html(donation);
        // $parentModal.find('.donation-total-price').val(donation);
        $parentModal.find('.service-pckg-total-prc').html(service_pkg_total);
        $parentModal.find('.service-pckg-total-price').val(service_pkg_total);
    }, '', { "showLoader": false, "type": "form" });
}

function inputMaskDate($ele, calcAge, $placeAge) {
    $ele.inputmask("99/99/9999", {
        oncomplete: function() {
            if (calcAge) {
                $placeAge.val(moment().diff(moment($ele.val(), 'DD/MM/YYYY'), 'years'));
            }
        }
    });
}

function addPatientRowToAddOn($modal) {
    $modal.on('click', '.btn-add-patient', function() {
        console.log($(this).closest('form').find('tr.patient-row[cust-id]').length == 10);
        if ($(this).closest('form').find('tr.patient-row[cust-id]').length == 10) {
            $('body').alertMessage({ type: 'error', message: 'You can add maximum 10 patient in a booking.' });
            return false;
        }

        var user_id = $(this).closest('form').find('[name=user_id]').val();
        var lastPatient = $('#upgradeOrderForm').find('tr.last-row');
        // $.ajax({
        //     url: __SITE.baseUrl + 'service/panel_views/loadViewCustomerToOrder',
        //     data: { 'user_id': user_id },
        //     type: 'post',
        //     success: function(data) {
        //         $(data).find('tr').each(function(k, ele) {
        //             $(ele).insertBefore(lastPatient);
        //             //lastPatient = $(ele);
        //             inputMaskDate($(ele).find('.dob-fld'), true, $(ele).find('.age-fld'));
        //         });
        //     },
        //     error: function() {}
        // });

        var data = {};
        data['user_id'] = user_id;

        ajax_call('service/panel_views/loadViewCustomerToOrder', 'POST', data, function(response) {
            $(response).find('tr').each(function(k, ele) {
                $(ele).insertBefore(lastPatient);
                //lastPatient = $(ele);
                inputMaskDate($(ele).find('.dob-fld'), true, $(ele).find('.age-fld'));
            });
        }, '', { "showLoader": true, "type": "form" });
    });
}

function btn_update_boking() {

    var booking_id = $('body').attr('current-booking');
    var $modal = $('#btn_viewCustList');
    $modal.modal('show');
}



function refresh_booking_details() {
    var bookingId = $('body').attr('current-booking');
    loadPanels(bookingId);
}

function phlebo_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/load_phleboList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/load_phleboList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });


}

function zone_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/load_zoneList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/load_zoneList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function bulk_assign() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/load_bulkAssign",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/load_bulkAssign', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/*export_list function for show the export list pop-up
 * @param none
 * @returns show pop-up
 */

function export_list() {
    var $modal = $('#export_popup');
    $modal.modal('show');
}

function btn_pending_slot() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/load_pendingSlot",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/load_pendingSlot', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function lock_booking() {
    var booking = $('body').attr('current-booking');
    var role_id = $('body').attr('active-role');
    var current_order_status = $('body').attr('current-order-status');
    $.confirmIt("Are you want to lock this booking.", function() {
        // $.ajax({
        //     url: __SITE.baseUrl + 'service/booking_management/lock_booking',
        //     type: "post",
        //     data: { booking_id: booking, role_id: role_id, unique_name: "lock_booking", current_order_status: current_order_status },
        //     beforeSend: function() {
        //         $('.data-result-panel').rayanLoaderShow();
        //     },
        //     success: function(response) {
        //         $('.data-result-panel').rayanLoaderHide();
        //         if (response && response.status && response.status === true) {
        //             $('body').alertMessage({ type: 'success', message: response.message });
        //             refresh_booking_details();
        //         } else {
        //             $('body').alertMessage({ type: 'error', message: response.message });
        //         }
        //     },
        //     error: function() {
        //         $('.data-result-panel').rayanLoaderHide();
        //     }
        // });

        var data = {};
        data['role_id'] = $('body').attr('active-role');
        data['booking_id'] = booking;
        data['unique_name'] = "lock_booking";
        data['current_order_status'] = current_order_status;

        ajax_call('service/booking_management/lock_booking', 'POST', data, function(response) {
            if (response && response.status && response.status === true) {
                $('body').alertMessage({ type: 'success', message: response.message });
                refresh_booking_details();
            } else {
                $('body').alertMessage({ type: 'error', message: response.message });
            }
        }, '', { "showLoader": true, "type": "form" });

    });
}

function unlock_booking() {
    var booking = $('body').attr('current-booking');
    var role_id = $('body').attr('active-role');
    var current_order_status = $('body').attr('current-order-status');
    $.confirmIt("Are you want to unlock this booking.", function() {
        // $.ajax({
        //     url: __SITE.baseUrl + 'service/booking_management/unlock_booking',
        //     type: "post",
        //     data: { booking_id: booking, role_id: role_id, unique_name: "unlock_booking", current_order_status: current_order_status },
        //     beforeSend: function() {
        //         $('.data-result-panel').rayanLoaderShow();
        //     },
        //     success: function(response) {
        //         $('.data-result-panel').rayanLoaderHide();
        //         if (response && response.status && response.status === true) {
        //             $('body').alertMessage({ type: 'success', message: response.message });
        //             refresh_booking_details();
        //         } else {
        //             $('body').alertMessage({ type: 'error', message: response.message });
        //         }
        //     },
        //     error: function() {
        //         $('.data-result-panel').rayanLoaderHide();
        //     }
        // });

        var data = {};
        data['role_id'] = $('body').attr('active-role');
        data['booking_id'] = booking;
        data['unique_name'] = "unlock_booking";
        data['current_order_status'] = current_order_status;

        ajax_call('service/booking_management/unlock_booking', 'POST', data, function(response) {
            if (response && response.status && response.status === true) {
                $('body').alertMessage({ type: 'success', message: response.message });
                refresh_booking_details();
            } else {
                $('body').alertMessage({ type: 'error', message: response.message });
            }
        }, '', { "showLoader": true, "type": "form" });


    });
}

function reschedule_booking_orders() {
    $('#reschedule_booking_modal').modal('show');
}

function save_grid_data($this) {
    // e.preventDefault();
    var $box = $this.closest('.box');
    var $data = $box.find('form').serializeArray();
    var $form_data = $box.find('form').serializeArray();
    $data.push({ name: "booking_id", value: $('body').attr('current-booking') });
    $data.push({ name: "role_id", value: $('body').attr('active-role') });


    var validationStatus = checkFiledValidation($form_data);
    /*$($form_data).each(function(i, field){
     dataObj[field.name] = field.value;

     alert($('[name="'+field.name+'"]').attr('type'));
     });*/
    if (validationStatus === true) {


        $.ajax({
            url: __SITE.baseUrl + 'service/booking_management/save_grid_data',
            type: "post",
            data: $data,
            beforeSend: function() {
                $box.rayanLoaderShow();
            },
            success: function(response) {
                $box.rayanLoaderHide();
                if (response && response.status) {
                    $this.detach();
                    $('body').alertMessage({ type: 'success', message: response.message });
                    refresh_booking_details();
                } else {
                    $('body').alertMessage({ type: 'error', message: response.message });
                }
            },
            error: function() {
                $box.rayanLoaderHide();
            }
        });

        // local filter //
        var user_id = $('#filter_a_id').val();
        var roleId = $('body').attr('active-role');

        if (localStorage.getItem("user_id" + user_id) === null) {

            return false;
        }

        var get_filter_data = localStorage.getItem('user_id' + user_id);

        get_user_data = JSON.parse(get_filter_data);

        var p_user_id = get_user_data.user_id;
        var p_roleId = get_user_data.roleId;
        var p_filter_id = get_user_data.filter_id;


    } else {
        $('body').alertMessage({ type: 'error', message: "Wrong data type" });
    }
}

function btn_report_compare(strParam, param1) {
    var booking_id = $('body').attr('current-booking');
    var $modal = $('#btn_viewReport_modal');
    $modal.modal('show');
}


function btn_old_customer_report(strParam, param1) {
    var booking_id = $('body').attr('current-booking');
    var $modal = $('#btn_reportOld');
    $modal.modal('show');
}

function btn_change_lab() {
    $('#btn_changeLab_modal').modal('show');
}

/**
 *@author       : Pawan Kumar
 *@description  : Change Slot
 *@modification : Change view to Phlebo Time Management
 **/
function change_slot() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + 'service/panel_views/loadViewChangeSlotDetail',
    //     type: "post",
    //     data: { "bookingId": booking_id, "roleId": roleId },
    //     dataType: 'html',
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         $('.data-result-panel').html(data);
    //         $('#phlebo_time_management').modal('show');
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['bookingId'] = booking_id;

    ajax_call('service/panel_views/loadViewChangeSlotDetail', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
        $('#phlebo_time_management').modal('show');
    }, '', { "showLoader": true, "type": "form", "dataType": "html" });
}

function resend_hard_copy() {
    var booking_id = $('body').attr('current-booking');

    if (booking_id) {
        // $.ajax({
        //     url: __SITE.baseUrl + 'service/booking_management/resendHardCopy',
        //     type: "post",
        //     data: { "bookingId": booking_id },
        //     success: function(response) {
        //         if (response && response.status) {
        //             $('body').alertMessage({ type: 'success', message: response.message });
        //             refresh_booking_details();
        //         } else {
        //             $('body').alertMessage({ type: 'error', message: response.message });
        //         }
        //     }
        // });

        var data = {};
        data['bookingId'] = booking_id;

        ajax_call('service/booking_management/resendHardCopy', 'POST', data, function(response) {
            if (response && response.status) {
                $('body').alertMessage({ type: 'success', message: response.message });
                refresh_booking_details();
            } else {
                $('body').alertMessage({ type: 'error', message: response.message });
            }
        }, '', { "showLoader": true, "type": "form" });
    }
}

function dashboard() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + 'service/panel_views/loadViewDashboard',
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     cache: false,
    //     dataType: 'html',
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //         loadBookingCount();
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/panel_views/loadViewDashboard', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
        loadBookingCount();
    }, '', { "showLoader": true, "type": "form", "dataType": "html" });
}



function loadBookingCount() {
    //load booking counts
    // return $.ajax({
    //     url: __SITE.baseUrl + 'service/panel_views/loadBookingCount',
    //     data: {},
    //     type: "POST",
    //     cache: false,
    //     dataType: 'html',
    //     beforeSend: function() {
    //         $('#booking_count').html("<p class='text-center' style='margin-top:150px'><span class='fa fa-spin fa-refresh fa-3x'></span></p>");
    //     },
    //     success: function(data) {
    //         if (data) {
    //             $('.data-result-panel #booking_count').html(data);
    //         }
    //         loadInboundPanel();

    //     },
    //     error: function() {
    //         $('#booking_count').html('');
    //     }
    // });

    var data = {};

    ajax_call('service/panel_views/loadBookingCount', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel #booking_count').html(response);
        }
        loadInboundPanel();
    }, function() { $('#booking_count').html(''); }, { "showLoader": false, "type": "form", "dataType": "html" });
}

function loadInboundPanel() {
    //load booking counts
    // return $.ajax({
    //     url: __SITE.baseUrl + 'service/panel_views/loadInboundPanel',
    //     data: {},
    //     type: "POST",
    //     cache: false,
    //     dataType: 'html',
    //     beforeSend: function() {
    //         $('#inbound_panel').html("<p class='text-center' style='margin-top:150px'><span class='fa fa-spin fa-refresh fa-3x'></span></p>");
    //     },
    //     success: function(data) {
    //         if (data) {
    //             $('.data-result-panel #inbound_panel').html(data);
    //         }
    //         loadOutboundPanel();

    //     },
    //     error: function() {
    //         $('#inbound_panel').html('');
    //     }
    // });

    var data = {};

    ajax_call('service/panel_views/loadInboundPanel', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel #inbound_panel').html(response);
        }
        loadOutboundPanel();
    }, function() { $('#inbound_panel').html(''); }, { "showLoader": false, "type": "form", "dataType": "html" });
}

function loadOutboundPanel() {
    //load booking counts
    // return $.ajax({
    //     url: __SITE.baseUrl + 'service/panel_views/loadOutboundPanel',
    //     data: {},
    //     type: "POST",
    //     cache: false,
    //     dataType: 'html',
    //     beforeSend: function() {
    //         $('#outbound_panel').html("<p class='text-center' style='margin-top:150px'><span class='fa fa-spin fa-refresh fa-3x'></span></p>");
    //     },
    //     success: function(data) {
    //         if (data) {
    //             $('.data-result-panel #outbound_panel').html(data);
    //         }
    //         loadVerificationPanel()

    //     },
    //     error: function() {
    //         $('#outbound_panel').html('');
    //     }
    // });

    var data = {};

    ajax_call('service/panel_views/loadOutboundPanel', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel #outbound_panel').html(response);
        }
        loadVerificationPanel();
    }, function() { $('#outbound_panel').html(''); }, { "showLoader": false, "type": "form", "dataType": "html" });
}

function loadVerificationPanel() {
    //load booking counts
    // return $.ajax({
    //     url: __SITE.baseUrl + 'service/panel_views/loadVerificationPanel',
    //     data: {},
    //     type: "POST",
    //     cache: false,
    //     dataType: 'html',
    //     beforeSend: function() {
    //         $('#verification_panel').html("<p class='text-center' style='margin-top:150px'><span class='fa fa-spin fa-refresh fa-3x'></span></p>");
    //     },
    //     success: function(data) {
    //         if (data) {
    //             $('.data-result-panel #verification_panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('#verification_panel').html('');
    //     }
    // });

    var data = {};

    ajax_call('service/panel_views/loadVerificationPanel', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel #verification_panel').html(response);
        }
    }, function() { $('#verification_panel').html(''); }, { "showLoader": false, "type": "form", "dataType": "html" });
}


/*locality_list function to show the locality list
 * @param none
 * @returns load locality list
 */

function locality_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadLocalityList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadLocalityList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

/*performance_sheet function to show the performance sheet
 * @param none
 * @returns load performance sheet
 */

function performance_sheet() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/panel_views/loadPerformanceSheet",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //         $('body').alertMessage({ type: 'error', message: 'Network Error.' });
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/panel_views/loadPerformanceSheet', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function checkFiledValidation($formData) {

    var _status = true;
    $($formData).each(function(i, field) {
        var fildValue = field.value;
        var fildName = field.name;
        var filedType = ($('[name="' + field.name + '"]').attr('type'));

        if ($.trim((fildValue).length) > 0 && _status == true) {


            if (filedType == "number") {
                if (!$.isNumeric(fildValue)) {

                    _status = false;
                }

            } else if (filedType == "text") {
                alert(typeof(fildValue));
                if (typeof(fildValue) != "string") {
                    _status = false;
                }
            }
        } else {
            _status = false;
        }
    });
    return _status;

}


function hard_copy_request() {
    var booking_id = $('body').attr('current-booking');
    $("#hardCopyRequest").modal('show');
    $("#hardCopyBookingID").val(booking_id);
}

function send_reports_via_whatsapp() {
    var booking_id = $('body').attr('current-booking');
    $("#sendReportsWhatsapp").modal('show');
    $("#hardCopyBookingID").val(booking_id);
}

function btn_sample_collected(strParam, param1) {
    var roleId = $('body').attr('active-role');

    var booking_id = $('body').attr('current-booking');

    //alert(bookingId);

    // return $.ajax({
    //     url: __SITE.baseUrl + "service/panel_views/loadViewBtnSampleCollected",
    //     data: {
    //         "role_id": roleId,
    //         "booking_id": booking_id,
    //         "unique_name": "btn_sample_collected"
    //     },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         // console.log(response);
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (response.data) {
    //             $('.data-result-panel').html(response.data);
    //         }
    //         if (response.status === "error") {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //             var $modal = $('#btn_SampleCollected');
    //             $modal.modal('hide');
    //             refresh_booking_details();
    //         } else {

    //             var $modal = $(' #btn_SampleCollected');
    //             $modal.modal('show');
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });


    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['booking_id'] = booking_id;
    data['unique_name'] = "btn_sample_collected";

    ajax_call('service/panel_views/loadViewBtnSampleCollected', 'POST', data, function(response) {
        if (response.data) {
            $('.data-result-panel').html(response.data);
        }
        if (response.status === "error") {
            $('body').alertMessage({ type: 'error', message: response.message });
            var $modal = $('#btn_SampleCollected');
            $modal.modal('hide');
            refresh_booking_details();
        } else {
            var $modal = $(' #btn_SampleCollected');
            $modal.modal('show');
        }
    }, '', { "showLoader": true, "type": "form" });
}

function master_customer_edit() {
    $('#edit_master_user').modal('show');
}

$(document).on('submit', '#update_master_customer', function() {
    var user_id = $('#user_id').val();
    var data = $(this).serialize();
    // $.ajax({
    //     url: __SITE.baseUrl + "service/panel_views/loadViewMasterCustomerEdit",
    //     data: data,
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         if (data && data.status) {
    //             $('body').alertMessage({ type: 'success', message: data.message });
    //         } else {
    //             $('body').alertMessage({ type: 'error', message: data.message });
    //         }
    //         $('#edit_master_user').modal('hide');
    //         $('.data-result-panel').rayanLoaderHide();
    //         loadcustomterPanels(user_id);
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    ajax_call('service/panel_views/loadViewMasterCustomerEdit', 'POST', data, function(response) {
        if (data && response.status) {
            $('body').alertMessage({ type: 'success', message: response.message });
        } else {
            $('body').alertMessage({ type: 'error', message: response.message });
        }
        $('#edit_master_user').modal('hide');
        $('.data-result-panel').rayanLoaderHide();
        loadcustomterPanels(user_id);
    }, '', { "showLoader": true, "type": "form" });

    return false;
})

function raw_booking_detail() {
    var booking_id = $('body').attr('current-booking');
    $("#auditRequest").modal('show');
    $("#auditRequestBookingID").val(booking_id);
}

function user_logs_details() {
    var booking_id = $('body').attr('current-booking');
    $("#auditRequest").modal('show');
    $("#auditRequestBookingID").val(booking_id);
}

function agents_user_logs() {
    var booking_id = $('body').attr('current-booking');
    $("#auditRequest").modal('show');
    $("#auditRequestBookingID").val(booking_id);
}


function btn_consultation_pending(strParam, param1) {
    var booking_id = $('body').attr('current-booking');
    var $modal = $('#btnPendingConsultation');
    $modal.modal('show');
}
/*coupon_management function to show the coupon list
 * @param none
 * @returns load coupon list
 */

function coupon_management() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadCouponList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadCouponList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function B2BPartnerDetails(partner_id) {
    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['partner_id'] = partner_id;

    ajax_call('service/b2b_partner_management/B2BPartnerDetailedPage', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function fetchB2BpartnerOTP( mobileNumber, partnerId, partnerName = '') {
    var data = {};
    if(mobileNumber === '')
    {
        $('body').alertMessage({ type: 'error', message: "Please provide mobile number" });
        return false;
    }
    data['mobileNumber'] = mobileNumber;
    data['partnerId'] = partnerId;
    let html = '';
    ajax_call('service/b2b_partner_management/fetchB2BpartnerOTP', 'POST', data, function(response) {
        if (response) {
            
            if(response.error != 'undefined' && response.error != '')
            {
                $('body').alertMessage({ type: 'error', message: response.error });
            }else{
                $("#optCodeModal #partnerName").html(partnerName);
                
                let otp = (response.otp != '') ? response.otp : "--";
                let validity = (response.expiry != '') ? response.expiry : "--";
                
                $("#partnerOtp").html(otp);
                $("#otpValidity").html(validity);
                if(response.spoc != '')
                {
                    $.each(response.spoc, function (i,v) {
                       html += '<tr>';
                       html += '<td>' + v.name + '</td>';
                       html += '<td>' + v.mobile + '</td>';
                       html += '<td>' + v.otp_code + '</td>';
                       html += '<td>' + v.session_end_time + '</td>';
                       html += '</tr>';
                    });
                    $("#spocOTPs table tbody").html(html);
                    $("#spocOTPs").show();
                }else{
                    $("#spocOTPs").hide();
                }
                
                var $modal = $('#optCodeModal');
                $modal.modal('show');
            }
        }
    }, '', { "showLoader": true, "type": "form" });
}

function ProductDetails(product_id, product_type) {
    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['product_type'] = product_type;
    data['product_id'] = product_id;

    ajax_call('service/product_management/ProductDetailedPage', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function b2b_partner_management() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/b2b_partner_management/viewB2BPartnerManagement', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function b2b_partner_account_details_download() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/b2b_partner_management/viewB2BPartnerAccountDetailsDownload', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function product_bucket_management() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/bucket_management/viewProductBucketManagement', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/*package_management function to show the package list
 * @param none
 * @returns load package list
 */

function package_management() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/panel_views/loadViewPackageManagement",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/panel_views/loadViewPackageManagement', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/*parameter_management function to show the parameter list
 * @param none
 * @returns load parameter list
 */

function parameter_management() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/panel_views/loadViewParameterManagement",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/panel_views/loadViewParameterManagement', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/*parameter_management function to show the parameter list
 * @param none
 * @returns load parameter list
 */

function profile_management() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/panel_views/loadViewProfileManagement",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/panel_views/loadViewProfileManagement', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function btn_apply_coupon(strParam, param1) {
    var booking_id = $('body').attr('current-booking');
    var $modal = $('#btn_apply_coupon_modal');
    $modal.modal('show');
}

function irate_booking(strParam, param1) {
    var booking_id = $('body').attr('current-booking');
    var $modal = $('#irateBookingRequest');
    $modal.modal('show');
}

function urgent_booking(strParam, param1) {
    var booking_id = $('body').attr('current-booking');
    var $modal = $('#urgentBookingRequest');
    $modal.modal('show');
}

function global_search() {
    $('#modal-global-search').modal('show');
}

/*PackageDetail function to load the package_details pop-up
 * @param none
 * @return load view
 */
function PackageDetail(pkgId, pkgName, $this) {
    var $modal = ($this && $this.closest('.modal.in').length == 1) ? $this.closest('.modal.in') : $('#modal-package-search');
    if (pkgId) {
        // $.ajax({
        //     url: __SITE.baseUrl + "service/panel_views/loadViewPackagesDetails",
        //     type: "post",
        //     data: { pkgId: pkgId, pkgName: pkgName },
        //     cache: false,
        //     dataType: 'html',
        //     beforeSend: function() {
        //         $modal.rayanLoaderShow();
        //     },
        //     success: function(data) {
        //         $modal.rayanLoaderHide();
        //         $('body').find('#package_popup div').detach();
        //         $('body').find('#package_popup').append("<div>" + data + "</div>");
        //     },
        //     error: function() {
        //         $modal.rayanLoaderHide();
        //         $('body').alertMessage({ type: 'error', message: 'Network Error.' });
        //     }
        // });

        var data = {};
        data['role_id'] = $('body').attr('active-role');
        data['pkgId'] = pkgId;
        data['pkgName'] = pkgName;

        ajax_call('service/panel_views/loadViewPackagesDetails', 'POST', data, function(response) {
            $('body').find('#package_popup div').detach();
            $('body').find('#package_popup').append("<div>" + response + "</div>");
        }, '', { "showLoader": true, "type": "form" });
    }

}

$(document).on('click', '.nofollowup', function() {
    // $.ajax({
    //     url: __SITE.baseUrl + "service/remarketing/create_follow_up",
    //     data: { "user_id": $(this).data('user_id') },
    //     type: 'html',
    //     success: function(data) {
    //         $('body').find('#package_popup div').detach();
    //         $('body').find('#package_popup').append("<div>" + data + "</div>");

    //     },
    //     error: function() {
    //         $('body').alertMessage({ type: 'error', message: 'Network Error.' });
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['user_id'] = $(this).data('user_id');

    ajax_call('service/remarketing/create_follow_up', 'POST', data, function(response) {
        $('body').find('#package_popup div').detach();
        $('body').find('#package_popup').append("<div>" + response + "</div>");
    }, '', { "showLoader": true, "type": "form" });



});


function create_follow_up() {
    $('#CreateFollowupModal').modal('show');
}

function btn_follow_up() {
    var $modalBdy = $(this).closest('.modal-body');
    // var role_id = $('body').attr('active-role');
    // $.ajax({
    //     url: __SITE.baseUrl + 'service/remarketing/clicktofollowupcall',
    //     data: { "mobile": $('#user_number').val(), "user_id": $('#user_id').val(), "role_id": role_id },
    //     type: 'POST',
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if( typeof response.status != 'undefined')
    //         {
    //             if( response.status )
    //             {
    //                 $('body').alertMessage({type: 'success', message: response.message});
    //                 getdispostionpanel();
    //             }
    //             else {
    //                 $('body').alertMessage({type: 'error', message: response.message});
    //             }
    //         }
    //         else {
    //             $('body').alertMessage({type: 'success', message: response});
    //             getdispostionpanel();
    //         }

    //     },
    //     error: function() {
    //         $modalBdy.rayanLoaderHide();
    //     }
    // });


    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['user_id'] = $('#user_id').val();
    data['mobile'] = $('#user_number').val();

    ajax_call('service/remarketing/clicktofollowupcall', 'POST', data, function(response) {
        if (typeof response.status != 'undefined') {
            if (response.status) {
                $('body').alertMessage({ type: 'success', message: response.message });
                getdispostionpanel();
            } else {
                $('body').alertMessage({ type: 'error', message: response.message });
                getdispostionpanel();
            }
        } else {
            $('body').alertMessage({ type: 'success', message: response });
            getdispostionpanel();
        }
    }, '', { "showLoader": true, "type": "form" });

}


function getdispostionpanel() {
    //alert('User-ID::'+$('input[name="customer_id"]').val());
    // $.ajax({
    //     url: __SITE.baseUrl + "service/remarketing/loadViewBtnFollowUp",
    //     data: { 'role_id': $('body').attr('active-role'), 'user_id': $('input[name="customer_id"]').val() },
    //     type: "post",
    //     success: function(data) {
    //         $('body').find('#package_popup div').detach();
    //         $('body').find('#package_popup').append("<div>" + data + "</div>");
    //         $('#disposition_modal').modal('show');
    //     },
    //     error: function() {
    //         $('body').alertMessage({ type: 'error', message: 'Network Error.' });
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['user_id'] = $('input[name="customer_id"]').val();

    ajax_call('service/remarketing/loadViewBtnFollowUp', 'POST', data, function(response) {
        $('body').find('#package_popup div').detach();
        $('body').find('#package_popup').append("<div>" + response + "</div>");
        $('#disposition_modal').modal('show');
    }, '', { "showLoader": true, "type": "form" });
    return false;
}

function get_location_dropdown(city) {
    $('#city_id').val(city);
    // $.ajax({
    //     url: "/crmuser/orders/locality_dropdown",
    //     type: "post",
    //     data: "city_id=" + city,
    //     error: function() {},
    //     success: function(data) {
    //         $("#locality_dropdown").html(data);
    //         $(document).find('select[name=locality]').val($('[name=address]').attr('data-locality-id'));
    //         $(document).find('select[name=locality]').trigger('change');
    //     }
    // });

    var data = {};
    data['city_id'] = city;

    ajax_call('crmuser/orders/locality_dropdown', 'POST', data, function(response) {
        $("#locality_dropdown").html(response);
        $(document).find('select[name=locality]').val($('[name=address]').attr('data-locality-id'));
        $(document).find('select[name=locality]').trigger('change');
    }, '', { "showLoader": true, "type": "form" });
}

function template(data) {
    return data.text + ' - Rs ' + data.price;
}

$(document).on('click', '#update_filters', function() {
    // $.ajax({
    //     url: __SITE.baseUrl + "service/remarketing/updateremaketingFilters",
    //     type: 'POST',
    //     data: $('#remarketing_filters').serialize(),
    //     dataType: "json",
    //     success: function(response) {
    //         if (response && response.status) {
    //             $('body').alertMessage({ type: 'success', message: response.message });
    //             refreshManinPanel();
    //         } else {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //         }

    //     }
    // });

    ajax_call('service/remarketing/updateremaketingFilters', 'POST', $('#remarketing_filters').serialize(), function(response) {
        if (response && response.status) {
            $('body').alertMessage({ type: 'success', message: response.message });
            refreshManinPanel();
        } else {
            $('body').alertMessage({ type: 'error', message: response.message });
        }
    }, '', { "showLoader": true, "type": "form", "dataType": "json" });

});
$(document).on('click', '#create_follow_up_submit', function() {
    var $modalBdy = $(this).closest('.modal-body');
    var user_id = $('#user_id').val();
    // $.ajax({
    //     url: __SITE.baseUrl + "service/remarketing/create_follow_up",
    //     data: $("#create_follow_up").serialize(),
    //     type: "post",
    //     beforeSend: function() {
    //         $modalBdy.rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $modalBdy.rayanLoaderHide();
    //         if (data && data.status) {
    //             $('body').alertMessage({ type: 'success', message: data.message });
    //             loadcustomterPanels(user_id);
    //             $('#CreateFollowupModal').modal('hide');
    //         }
    //     },
    //     error: function() {
    //         $modalBdy.rayanLoaderHide();
    //         $('body').alertMessage({ type: 'error', message: 'Network Error.' });
    //     }
    // });


    ajax_call('service/remarketing/create_follow_up', 'POST', $('#create_follow_up').serialize(), function(response) {
        if (response && response.status) {
            $('body').alertMessage({ type: 'success', message: response.message });
            loadcustomterPanels(user_id);
            $('#CreateFollowupModal').modal('hide');
        }
    }, function() { $('body').alertMessage({ type: 'error', message: 'Network Error.' }); }, { "showLoader": true, "type": "form" });
    return false;
});
$(document).on('click', '#btn_follow_call', function() {
    var $modalBdy = $(this).closest('.modal-body');
    // var role_id = $('body').attr('active-role');
    // $.ajax({
    //     url: __SITE.baseUrl + 'service/remarketing/clicktofollowupcall',
    //     data: { "mobile": $(this).data('c_number'), "role_id": role_id },
    //     type: 'POST',
    //     beforeSend: function() {
    //         $modalBdy.rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $modalBdy.rayanLoaderHide();
    //         if (response == "-1") {
    //             result = "Mobile number not found";
    //             $('body').alertMessage({ type: 'error', message: result });
    //         } else {
    //             var s = response;
    //             var result = "";
    //             $.each($(s), function(i) {
    //                 result += " " + $(this).html();
    //             });
    //             $('body').alertMessage({ type: 'success', message: result });
    //         }

    //     },
    //     error: function() {
    //         $modalBdy.rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['mobile'] = $(this).data('c_number');

    ajax_call('service/remarketing/clicktofollowupcall', 'POST', data, function(response) {
        if (response == "-1") {
            result = "Mobile number not found";
            $('body').alertMessage({ type: 'error', message: result });
        } else {
            var s = response;
            var result = "";
            $.each($(s), function(i) {
                result += " " + $(this).html();
            });
            $('body').alertMessage({ type: 'success', message: result });
        }
    }, '', { "showLoader": true, "type": "form" });


});

$(document).on('click', '.disp_button', function() {
    if ($(this).val() == 4) {
        $('#call_me_later').show();
        $('#call_me_later').find('.fs_date').datetimepicker({
            format: 'YYYY-MM-DD hh:mm::ss',
            useCurrent: true,
            minDate: moment(),
        });
    } else {
        $('#call_me_later').hide();
    }
});

function lock_customer() {
    $.confirmIt("Are you want to lock this booking.", function() {
        // $.ajax({
        //     url: __SITE.baseUrl + 'service/panel_views/lock_customer',
        //     type: "post",
        //     data: { user_id: $('#user_id').val() },
        //     beforeSend: function() {
        //         $('.data-result-panel').rayanLoaderShow();
        //     },
        //     success: function(response) {
        //         $('.data-result-panel').rayanLoaderHide();
        //         if (response.status) {
        //             $('body').alertMessage({ type: 'success', message: response.message });
        //         } else {
        //             $('body').alertMessage({ type: 'error', message: response.message });
        //         }
        //     },
        //     error: function() {
        //         $('.data-result-panel').rayanLoaderHide();
        //     }
        // });

        var data = {};
        data['role_id'] = $('body').attr('active-role');
        data['user_id'] = $('#user_id').val();

        ajax_call('service/panel_views/lock_customer', 'POST', data, function(response) {
            if (response.status) {
                $('body').alertMessage({ type: 'success', message: response.message });
            } else {
                $('body').alertMessage({ type: 'error', message: response.message });
            }
        }, '', { "showLoader": true, "type": "form" });


    });
}

function unlock_customer() {
    $.confirmIt("Are you want to unlock this customer.", function() {
        // $.ajax({
        //     url: __SITE.baseUrl + 'service/panel_views/unlock_customer',
        //     type: "post",
        //     data: { user_id: $('#user_id').val() },
        //     beforeSend: function() {
        //         $('.data-result-panel').rayanLoaderShow();
        //     },
        //     success: function(response) {
        //         $('.data-result-panel').rayanLoaderHide();
        //         if (response.status) {
        //             $('body').alertMessage({ type: 'success', message: response.message });
        //         } else {
        //             $('body').alertMessage({ type: 'error', message: response.message });
        //         }
        //     },
        //     error: function() {
        //         $('.data-result-panel').rayanLoaderHide();
        //     }
        // });


        var data = {};
        data['role_id'] = $('body').attr('active-role');
        data['user_id'] = $('#user_id').val();

        ajax_call('service/panel_views/unlock_customer', 'POST', data, function(response) {
            if (response.status) {
                $('body').alertMessage({ type: 'success', message: response.message });
            } else {
                $('body').alertMessage({ type: 'error', message: response.message });
            }
        }, '', { "showLoader": true, "type": "form" });
    });
}

function export_current_list() {
    if ($('body').attr('panel-main') == 'main') {
        var roleId = $('body').attr('active-role');
        var page = 1;
        var oStatus = $('body').attr('order-status');
        oStatus = parseInt(oStatus) >= 0 ? parseInt(oStatus) : '';
        var formData = $('.panel-filter-form').serializeArray();
        var fromSearch = parseInt($('body').attr('panel-search')) > 0 ? parseInt($('body').attr('panel-search')) : 0;
        if (fromSearch) {
            formData.push({ "name": "role_id", "value": roleId });
            formData.push({ "name": "page", "value": page });
            var formDataArr = {};
            $.each(formData, function(k, v) {
                formDataArr[v.name] = v.value;
            });
            formData = formDataArr;
        } else {
            formData = { "role_id": roleId, page: page, order_status: oStatus };
        }
        var queryStr = [];
        $.each(formData, function(k, v) {
            queryStr.push(k + '=' + encodeURIComponent(v));
        });

        window.open(__SITE.baseUrl + 'service/common_ctrl/export_bookings?' + queryStr.join('&'), 'ExportCurrentBookings');

    }
}

// set up local storage start//

// set local storage//

function set_local_filter(user_id, roleId, filter_id) {

    var user_data = new Array();

    if (localStorage.getItem("user_id" + user_id) === null) {
        var user_data = { "user_id": user_id, "roleId": roleId, "filter_id": filter_id, "filter_value": "0", "filter_value_name": "0" };
        localStorage.setItem('user_id' + user_id, JSON.stringify(user_data));

    } else {

        var get_local_data = localStorage.getItem('user_id' + user_id);

        get_user_data = JSON.parse(get_local_data);

        var p_user_id = get_user_data.user_id;
        var p_roleId = get_user_data.roleId;
        var p_filter_id = get_user_data.filter_id;
        var p_filter_value = get_user_data.filter_value;
        var p_filter_value_name = get_user_data.filter_value_name;

        var role_arr = p_roleId.split(',');
        var filter_arr = p_filter_id.split(',');

        var role_chk = role_arr.indexOf(roleId);
        var filter_chk = filter_arr.indexOf(filter_id);

        if (role_chk != -1 && filter_chk != -1) {
            return false;
        }

        var p_user_id = p_user_id + ',' + user_id;
        var p_roleId = p_roleId + ',' + roleId;
        var p_filter_id = p_filter_id + ',' + filter_id;
        var p_filter_value = p_filter_value + ',' + "0";
        var p_filter_value_name = p_filter_value_name + "," + "0";


        var user_data = { "user_id": p_user_id, "roleId": p_roleId, "filter_id": p_filter_id, "filter_value": p_filter_value, "filter_value_name": p_filter_value_name };

        localStorage.removeItem('user_id' + user_id);

        localStorage.setItem('user_id' + user_id, JSON.stringify(user_data));


    }

}


// unset local storage //

function unset_local_filter(user_id, roleId, filter_id) {

    var user_id = $('#filter_a_id').val();
    var roleId = $('body').attr('active-role');

    if (localStorage.getItem("user_id" + user_id) === null) {
        return false;
    }

    var get_filter_data = localStorage.getItem('user_id' + user_id);

    get_user_data = JSON.parse(get_filter_data);

    var p_user_id = get_user_data.user_id;
    var p_roleId = get_user_data.roleId;
    var p_filter_id = get_user_data.filter_id;
    var p_filter_value = get_user_data.filter_value;
    var p_filter_value_name = get_user_data.filter_value_name;

    var user_arr = p_user_id.split(',');
    var role_arr = p_roleId.split(',');
    var filter_arr = p_filter_id.split(',');
    var filter_value_arr = p_filter_value.split(',');
    var filter_value_name_arr = p_filter_value_name.split(',');


    var filter_cnt = filter_arr.length;

    if (filter_cnt == 1) {
        localStorage.removeItem('user_id' + user_id);
        return false;
    }

    for (var k = 0; k < filter_arr.length; k++) {
        if (filter_arr[k] == filter_id) {
            user_arr.splice(k, 1);
            role_arr.splice(k, 1);
            filter_arr.splice(k, 1);
            filter_value_arr.splice(k, 1);
            filter_value_name_arr.splice(k, 1);
        }
    }



    for (var k = 0; k < filter_arr.length; k++) {
        if (k == 0) {
            p_user_id = user_arr[k];
            p_roleId = role_arr[k];
            p_filter_id = filter_arr[k];
            p_filter_value = filter_value_arr[k];
            p_filter_value_name = filter_value_name_arr[k];
        } else {
            p_user_id = p_user_id + ',' + user_arr[k];
            p_roleId = p_roleId + ',' + role_arr[k];
            p_filter_id = p_filter_id + ',' + filter_arr[k];
            p_filter_value = p_filter_value + ',' + filter_value_arr[k];
            p_filter_value_name = p_filter_value_name + ',' + filter_value_name_arr[k];
        }
    }

    var user_data = { "user_id": p_user_id, "roleId": p_roleId, "filter_id": p_filter_id, "filter_value": p_filter_value, "filter_value_name": p_filter_value_name };


    localStorage.removeItem('user_id' + user_id);

    localStorage.setItem('user_id' + user_id, JSON.stringify(user_data));

}

// unset local storage end//

// get pre filter//

function get_pre_filter() {

    var user_id = $('#filter_a_id').val();

    var roleId = $('body').attr('active-role');
    var filter_value_name_cnt = 0;
    var local_filter_dropdown = 0;

    if (localStorage.getItem("user_id" + user_id) === null) {
        return false;
    }

    var get_filter_data = localStorage.getItem('user_id' + user_id);



    get_user_data = JSON.parse(get_filter_data);

    var p_user_id = get_user_data.user_id;
    var p_roleId = get_user_data.roleId;
    var p_filter_id = get_user_data.filter_id;
    var p_filter_value = get_user_data.filter_value;
    var p_filter_value_name = get_user_data.filter_value_name;

    var user_arr = p_user_id.split(',');
    if (user_arr.indexOf(user_id) != -1) {

        var role_arr = p_roleId.split(',');
        if (roleId.indexOf(roleId) != -1) {

            var filter_arr = p_filter_id.split(',');
            var filter_value_arr = p_filter_id.split(',');
            var filter_arr = p_filter_id.split(',');
            var filter_value_arr = p_filter_value.split(',');
            var filter_value_name_arr = p_filter_value_name.split(',');

            for (var k = 0; k < role_arr.length; k++) {
                if (role_arr[k] == roleId) {
                    var get_filter = filter_arr[k];
                    // check for alraedy checked //
                    var p_chk = $('#' + get_filter).is(":checked");
                    if (p_chk == false) {
                        $('#' + get_filter).click();
                        if (filter_value_arr[k] != '0') {
                            filter_value_name_cnt++;
                            var filter_obj_set = $('[name="' + filter_value_name_arr[k] + '"]');

                            var filter_type = filter_obj_set[0].tagName;
                            // console.log(filter_type);

                            if (filter_type == "SELECT") {
                                local_filter_dropdown++;
                                var select_val = filter_value_arr[k];
                                var select_col_name = filter_value_name_arr[k];
                                var select_filter_obj = filter_obj_set;

                                var set_filter_time = setTimeout(function() {
                                    $('[name="' + select_col_name + '"]').val(select_val);
                                    /* $('.panel-filter-form').submit();*/ // COMMENT AUTO LOAD IT CREATE ISSUE IN BACBUTTON ALSO, IT LOADED DATA AUTOMATICALLY WHENEVER ANY SELECT TYPE PRESENT. THIS IS NOT REQUIRED.

                                }, 1200);

                            } else {
                                filter_obj_set.val(filter_value_arr[k]);
                            }
                        }
                    }

                }
            }

            if (local_filter_dropdown > 0) {

                is_filter_select = 1;
            } else {
                is_filter_select = 0;
            }

            if (filter_value_name_cnt > 0) {

                // CUR - 1563 Prevent onload booking Details
                //   $('.panel-filter-form').submit();

            }
        } else {
            return false;
        }
    } else {
        return false;
    }

}

// get pre filter end//


// set pre filter value //
function set_pre_filter_value() {
    var user_id = $('#filter_a_id').val();
    var roleId = $('body').attr('active-role');

    if (localStorage.getItem("user_id" + user_id) === null) {
        return false;
    }
    var formData = $('.panel-filter-form').serializeArray();

    var chk_set = 0;
    for (var t = 0; t < formData.length; t++) {

        var filter_obj = $('[name="' + formData[t].name + '"]');
        var filter_id = filter_obj.attr("data-dvc");
        var filter_value = filter_obj.val();
        var filter_name = filter_obj.attr("name");



        if (filter_id != undefined) {
            filter_id = 'dvc-' + filter_id;

            var get_filter_data = localStorage.getItem('user_id' + user_id);

            get_user_data = JSON.parse(get_filter_data);

            var p_user_id = get_user_data.user_id;
            var p_roleId = get_user_data.roleId;
            var p_filter_id = get_user_data.filter_id;
            var p_filter_value = get_user_data.filter_value;
            var p_filter_value_name = get_user_data.filter_value_name;

            var user_arr = p_user_id.split(',');
            if (user_arr.indexOf(user_id) != -1) {

                var role_arr = p_roleId.split(',');
                if (roleId.indexOf(roleId) != -1) {

                    var filter_arr = p_filter_id.split(',');
                    var filter_value_arr = p_filter_value.split(',');
                    var filter_value_name_arr = p_filter_value_name.split(',');
                    for (var k = 0; k < role_arr.length; k++) {
                        if (role_arr[k] == roleId) {
                            var get_filter = filter_arr[k];

                            if (get_filter == filter_id) {
                                filter_value_arr[k] = filter_value;
                                filter_value_name_arr[k] = filter_name;

                                chk_set++;
                            }

                        }
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }

        }

        // reset local storage //
        if (chk_set > 0) {
            for (var k = 0; k < filter_arr.length; k++) {
                if (k == 0) {
                    p_user_id = user_arr[k];
                    p_roleId = role_arr[k];
                    p_filter_id = filter_arr[k];
                    p_filter_value = filter_value_arr[k];
                    p_filter_value_name = filter_value_name_arr[k];
                } else {
                    p_user_id = p_user_id + ',' + user_arr[k];
                    p_roleId = p_roleId + ',' + role_arr[k];
                    p_filter_id = p_filter_id + ',' + filter_arr[k];
                    p_filter_value = p_filter_value + ',' + filter_value_arr[k];
                    p_filter_value_name = p_filter_value_name + ',' + filter_value_name_arr[k];
                }
            }

            var user_data = { "user_id": p_user_id, "roleId": p_roleId, "filter_id": p_filter_id, "filter_value": p_filter_value, "filter_value_name": p_filter_value_name };

            //console.log(user_data);

            localStorage.removeItem('user_id' + user_id);

            localStorage.setItem('user_id' + user_id, JSON.stringify(user_data));
        }


    }

}
// set pre filter alue end //
// local storage end //

/**
 *@author Shweta A.
 *@description This function is used to Load the Phlebo Kit UI from Main panel
 *@return {[object]} $response
 */
function phlebo_kit1() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/load_phleboKit",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/load_phleboKit', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/**
 *@author Shweta A.
 *@description This function is used to Load the Domain Management from Main panel
 *@return {[object]} $response
 */
function domain_type() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/panel_views/loadViewDomainManagement",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/panel_views/loadViewDomainManagement', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/**
 *@author Shweta A.
 *@description This function is used to Load the Domain Management from Main panel
 *@return {[object]} $response
 */
function merchant_costing() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/panel_views/loadViewMechantCostingManagement",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/panel_views/loadViewMechantCostingManagement', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/**
 *@author Shweta A.
 *@description This function is used to Load the Domain Management from Main panel
 *@return {[object]} $response
 */
function phlebo_attendance() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/panel_views/loadViewPhleboAttendance",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/panel_views/loadViewPhleboAttendance', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


/*health_quotes_management function to show the health quotes list
 * @param none
 * @returns load health quotes list
 */

function health_quotes_management() {
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadHealthQuotesList",
    //     data: {},
    //     type: "POST",
    //     dataType: 'html',
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadHealthQuotesList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

// Add Holidays panel //

function manage_holiday() {

    //console.log('aaaa');
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadHolidays",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadHolidays', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/*Doctor Degree List Add Edit
 @author Manu S.
 * @param none
 * @returns load Doctor Degree List
 */

function doc_degree() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/doctor_management/loadDegreeList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/doctor_management/loadDegreeList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

/*docSpeciality function to load new speciality panel
 @author Durgey K.
 * @param none
 * @return none
 */
function docSpeciality() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/doctor_management/loadSpecialityList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/doctor_management/loadSpecialityList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/*docSubspecialization function to load new doctor Subspecialization panel
 @author Manu S.
 * @param none
 * @return none
 */


function docSubspecialization() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/doctor_management/loadSubSpecialityList",

    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },

    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         //console.log(data);
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/doctor_management/loadSubSpecialityList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/*Affiliate function to load new affiliate panel
 @author Durgey K.
 * @param none
 * @return none
 */
function AffiliateManagement() {
    //    alert("sddhs");
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/doctor_management/loadAffiliateList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },

    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/doctor_management/loadAffiliateList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/*BD Chemist  function to load new Chemist panel
 @author Manu S.
 * @param none
 * @return none
 */


function bd_chemist_managemet() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/doctor_management/loadChemistList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/doctor_management/loadChemistList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}



/*SMS Vendor  function to load new SMS vendor panel
 @author Manu S.
 * @param none
 * @return none
 */


function sms_vendor_management() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/doctor_management/loadSmsVendorList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/doctor_management/loadSmsVendorList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

/*add_complain function to pop up a new form
 * @param none
 * @returns load parameter list
 *added by : Paulomi Chakraborty
 */
function add_complain() {

    $("#new_form_popup").modal('show');
}

function tickets_list() {
    // var roleId = $('body').attr('active-role');

    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadTicketsList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {

    //         $('.data-result-panel').rayanLoaderShow();
    //         $('.data-result-panel').html(data);
    //         $('.data-result-panel').rayanLoaderHide();
    //     },

    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }

    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadTicketsList', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true, "type": "form" });


}

/*list_complains function to pop up a new form
 * @param none
 * @returns load parameter list
 *added by : Paulomi Chakraborty
 */

function complains_list() {

    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadComplainsList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadComplainsList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


/**
 * payment panel
 * @returns {jqXHR}
 */
function payment_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/get_payment_list",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/get_payment_list', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/*send_sms_pool function to pop up a new form
 * @param none
 * @returns load parameter list
 *added by : Paulomi Chakraborty
 */

function send_sms_pool() {

    $("#sms_form_popup").modal('show');
}


/*Doctor Type function to load new doctor type panel
 @author Durgey K.
 * @param none
 * @return none
 */
function bd_doctor_type() {
    //    alert("sddhs");
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/doctor_management/loadDoctorTypeList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/doctor_management/loadDoctorTypeList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}



function re_sample() {
    var booking_id = $('body').attr('current-booking');
    orderid = (booking_id) ? booking_id : orderid;
    $("#resample_booking_id").val(booking_id);
    $('#resample').modal('show');
}

function slot_for_approved_resample() {
    var booking_id = $('body').attr('current-booking');
    orderid = (booking_id) ? booking_id : orderid;
    $("#resample_booking_id").val(booking_id);
    $('#resample').modal('show');

}


/*Doctor Services function to load new doctor service panel
 @author Durgey K.
 * @param none
 * @return none
 */
function doctor_service() {
    //    alert("sddhs");
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/doctor_management/loadDoctorServiceList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/doctor_management/loadDoctorServiceList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


/*Dialer channel function for dialer
 @author Durgey K.
 * @param none
 * @return none
 */
function dialer_channel() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/doctor_management/loadDialerChannelList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/doctor_management/loadDialerChannelList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/*ivr_Bookings_list function to show the ivr bookings list
 * @param none
 * @returns load ivr bookings list
 */

function ivr_booking_list() {

    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadIvrBookingList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadIvrBookingList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });


}
/*Dialer audios gets function for dialer
 @author Dilip.
 * @param none
 * @return none
 */
function audio_files() {
    var booking_id = $('body').attr('current-booking');
    $("#audioRequest").modal('show');
    $("#audioRequestBookingID").val(booking_id);
}

/*Update Customer phone no in dialer details page
 @author Dilip.
 * @param none
 * @return none
 */

function update_phone_no() {

    var booking_id = $('body').attr('current-booking');
    $("#phoneRequest").modal('show');
    $("#ur-booking-id").val(booking_id);
}
/*Doctor Management  function to load new Doctor panel
 @author durgey
 * @param none
 * @return none
 */
function doctor_management() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/doctor_management/loadDoctorList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/doctor_management/loadDoctorList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


/*Doctor Compounder  function to load new Doctor panel
 @author durgey.
 * @param none
 * @return none
 */
function pre_registration() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/doctor_management/loadPreRegistrationList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/doctor_management/loadPreRegistrationList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/*Doctor Compounder  function to load new Doctor panel
 @author durgey.
 * @param none
 * @return none
 */
function doctor_compounder() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/compounder_management/loadCompounderList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/compounder_management/loadCompounderList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function doctor_section() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/doctor_management/loadDoctorSectionList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/doctor_management/loadDoctorSectionList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/* Update Phone Number
 @author Dilip.
 * @param none
 * @return none
 */


function update_phone_no() {

    var booking_id = $('body').attr('current-booking');
    $("#phoneRequest").modal('show');
    $("#ur-booking-id").val(booking_id);
}

/* Generate the Refund Process
 @author Shweta A.
 * @param none
 * @return none
 */


function refund_process() {
    var booking_id = $('body').attr('current-booking');
    var $modal = $('#btn_refund_request');
    $modal.modal('show');
}

function list_refund_request() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadRefundRequestList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadRefundRequestList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function fake_bookings_list() {
    var roleId = $('body').attr('active-role');
    var pageNumber = typeof $('#pageNumber').val() != 'undefined' ? parseInt($('#pageNumber').val()) : 0;
    // var api_url = __SITE.baseUrl + "service/booking_management/loadFakeBookingsList";
    var api_url = "service/booking_management/loadFakeBookingsList";

    if (pageNumber > 0)
        api_url = api_url + '?per_page=' + pageNumber;

    // return $.ajax({
    //     url: api_url,
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //         if (pageNumber != 0)
    //             $("#pageNumber").val(pageNumber);
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call(api_url, 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
        if (pageNumber != 0)
            $("#pageNumber").val(pageNumber);
    }, '', { "showLoader": true, "type": "form" });
}

function refund_approved() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadRefundApprovedList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadRefundApprovedList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function handover(params=false,actionId=false) {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadHandOverList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['handover_type'] = (params.length > 0) ? params : 'booking';

    ajax_call('service/booking_management/loadHandOverList', 'POST', data, function(response) {
        if (response) {
            
            $('.data-result-panel').html(response);
            
            if(data['handover_type'] == "pay_in_cash"){
                
                $("#panel-partner-cash").addClass("active");
                $("#panel-sample-cash").removeClass("active");
                $("#cash_sample").removeClass("active");
                $("#pay_in_cash").addClass("active");
            }else{
                 $("#panel-partner-cash").removeClass("active");
                 $("#panel-sample-cash").addClass("active");
                 $("#pay_in_cash").removeClass("active");
                 $("#cash_sample").addClass("active");
            }
        }
    }, '', { "showLoader": true, "type": "form" });
}

function dept_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadDeptList",
    //     data: {},
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (response && response.status == 'error') {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //         } else {
    //             $('.data-result-panel').rayanLoaderHide();
    //             if (response) {
    //                 $('.data-result-panel').html(response);
    //             }
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadDeptList', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            if (response) {
                $('.data-result-panel').html(response);
            }
        }
    }, '', { "showLoader": true, "type": "form" });
}

function ticket_type_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadTicketTypeList",
    //     data: {},
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (response && response.status == 'error') {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //         } else {
    //             $('.data-result-panel').rayanLoaderHide();
    //             if (response) {
    //                 $('.data-result-panel').html(response);
    //             }
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadTicketTypeList', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            if (response) {
                $('.data-result-panel').html(response);
            }
        }
    }, '', { "showLoader": true, "type": "form" });
}


/*
Store Management : Load Vendor Panel
 */
function inventory_vendor_action() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "/service/inventory_management/load_vendor_panel",
    //     data: {},
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (response && response.status == 'error') {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //         } else {
    //             $('.data-result-panel').rayanLoaderHide();
    //             if (response) {
    //                 $('.data-result-panel').html(response);
    //             }
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/load_vendor_panel', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            if (response) {
                $('.data-result-panel').html(response);
            }
        }
    }, '', { "showLoader": true, "type": "form" });
}


/*
Store Management : Load Main Bucket / Healthians Bucket
 */

function inventory_main_bucket() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "/service/inventory_management/load_main_bucket",
    //     data: {},
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (response && response.status == 'error') {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //         } else {
    //             $('.data-result-panel').rayanLoaderHide();
    //             if (response) {
    //                 $('.data-result-panel').html(response);
    //             }
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/load_main_bucket', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            if (response) {
                $('.data-result-panel').html(response);
            }
        }
    }, '', { "showLoader": true, "type": "form" });
}


/*
Store Management : Load Distribution Center View
 */


function inventory_distribution_center() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "/service/inventory_management/load_distribution_center",
    //     data: {},
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (response && response.status == 'error') {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //         } else {
    //             $('.data-result-panel').rayanLoaderHide();
    //             if (response) {
    //                 $('.data-result-panel').html(response);
    //             }
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/load_distribution_center', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            if (response) {
                $('.data-result-panel').html(response);
            }
        }
    }, '', { "showLoader": true, "type": "form" });
}

/*
Store Management : Load Phlebo assignment list
 */


function inventory_phlebo() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "/service/inventory_management/load_phlebo",
    //     data: {},
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (response && response.status == 'error') {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //         } else {
    //             $('.data-result-panel').rayanLoaderHide();
    //             if (response) {
    //                 $('.data-result-panel').html(response);
    //             }
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/load_phlebo', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            if (response) {
                $('.data-result-panel').html(response);
            }
        }
    }, '', { "showLoader": true, "type": "form" });
}





function issue_type_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadIssueTypeList",
    //     data: {},
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (response && response.status == 'error') {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //         } else {
    //             $('.data-result-panel').rayanLoaderHide();
    //             if (response) {
    //                 $('.data-result-panel').html(response);
    //             }
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadIssueTypeList', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            if (response) {
                $('.data-result-panel').html(response);
            }
        }
    }, '', { "showLoader": true, "type": "form" });
}

function ticket_priority_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadTicketPriorityList",
    //     data: {},
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (response && response.status == 'error') {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //         } else {
    //             $('.data-result-panel').rayanLoaderHide();
    //             if (response) {
    //                 $('.data-result-panel').html(response);
    //             }
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadTicketPriorityList', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            if (response) {
                $('.data-result-panel').html(response);
            }
        }
    }, '', { "showLoader": true, "type": "form" });
}

function ticket_sla_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadTicketSLAList",
    //     data: {},
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (response && response.status == 'error') {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //         } else {
    //             $('.data-result-panel').rayanLoaderHide();
    //             if (response) {
    //                 $('.data-result-panel').html(response);
    //             }
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadTicketSLAList', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            if (response) {
                $('.data-result-panel').html(response);
            }
        }
    }, '', { "showLoader": true, "type": "form" });
}




/*
 * @author Pawan
 *User List for system users
 * @returns
 */
function user_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadUserList",
    //     data: { "role_id": roleId, 'action': 'user_list' },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (response && response.status == 'error') {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //         } else {
    //             $('.data-result-panel').rayanLoaderHide();
    //             if (response) {
    //                 $('.data-result-panel').html(response);
    //             }
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['action'] = 'user_list';

    ajax_call('service/booking_management/loadUserList', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            if (response) {
                $('.data-result-panel').html(response);
            }
        }
    }, '', { "showLoader": true, "type": "form" });
}




/**
 * @author Pawan
 * function to show role list
 * @returns
 */
function role_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadRoleList",
    //     data: {},
    //     type: "POST",
    //     dataType: 'html',
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadRoleList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form", dataType: 'html' });
}

/**
 * @author Pawan
 * function to show column list
 * @returns
 */
function column_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadColumnList",
    //     data: {},
    //     type: "POST",
    //     dataType: 'html',
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadColumnList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form", dataType: 'html' });
}

/**
 * @author  Pawan
 * function to show panel list
 * @returns
 */
function panel_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadPanelList",
    //     data: {},
    //     type: "POST",
    //     dataType: 'html',
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadPanelList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form", dataType: 'html' });
}

/**
 * @author Pawan
 * function to show status list
 * @returns
 */
function status_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadStatusList",
    //     data: {},
    //     type: "POST",
    //     dataType: 'html',
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadStatusList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form", dataType: 'html' });
}

/**
 * @author  Pawan
 * function to config Data Setup
 * @returns
 */
function configDataSetup() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadConfigDataSetup",
    //     data: {},
    //     type: "POST",
    //     dataType: 'html',
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadConfigDataSetup', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form", dataType: 'html' });
}

function collection_center() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/collection_management/load_collection_center_panel",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/collection_management/load_collection_center_panel', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function customer_follow_up() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/remarketing/loadViewCustomerFollowUp",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/remarketing/loadViewCustomerFollowUp', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/**
 *@author Shweta A.
 *Coupon Engine Action
 */
function coupon_engine() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadCouponEngineList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     dataType: 'html',
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadCouponEngineList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form", "dataType": "html" });
}

function load_labmateBookingList() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/load_labmateBookingList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/load_labmateBookingList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function load_itdoseBookingList() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/load_itdoseBookingList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/load_itdoseBookingList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function load_itdoseNotificationList() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/load_itdoseNotificationList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/load_itdoseNotificationList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function itdose_missing_codes() {


    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "itdose/itdose_missing_codes",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });


    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('itdose/itdose_missing_codes', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}



/**
 *@author Shweta A.
 *@description This function is used to Load the Product Management from Main panel
 *@return {[object]} $response
 */
// Accounting changes //
function product_management() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadViewProductManagement",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadViewProductManagement', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

/** Generate the Report data
 * @author Shweta A.
 */

function product_management_v2() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/product_management/loadViewProductManagement', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

function show_report_data() {
    var booking_id = $('body').attr('current-booking');
    var $modal = $('#btn_report_data');
    $modal.modal('show');
}

/*Add barcode controller and actions
 * @param none
 * @returns load Barcode panel
 * @author : Varun Kumar <varun.kumar@healthians.com>
 */

function generate_barcode() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/barcode_management/index",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/barcode_management/index', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function view_barcode() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/barcode_management/viewBarcode",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/barcode_management/viewBarcode', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function barcode_listing() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/barcode_management/barcode_listing",

    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/barcode_management/barcode_listing', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}



function itdose_pending_report() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "itdose/load_itdosePendingReport",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('itdose/load_itdosePendingReport', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function release_onHold_status() {
    var roleId = $('body').attr('active-role');
    var booking_id = $('body').attr('current-booking');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/panel_views/loadViewReleaseOnHoldStatus",
    //     data: {
    //         "role_id": roleId,
    //         "booking_id": booking_id
    //     },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['booking_id'] = booking_id;
    data['unique_name'] = "release_onHold_status";

    ajax_call('service/panel_views/loadViewReleaseOnHoldStatus', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}


function labmate_report_dashboard() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "labmate/loadLabmateReportDashboard",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('labmate/loadLabmateReportDashboard', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function seo_management() {
    // var roleId = $('body').attr('active-role');
    // //noinspection JSAnnotator
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/seo_management/index",

    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/seo_management/index', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}



function voice_tree_dashboard() {
    // var roleId = $('body').attr('active-role');
    // //noinspection JSAnnotator
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/voiceTreeDashboard",

    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/voiceTreeDashboard', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

function quality_labmate_data() {
    // var roleId = $('body').attr('active-role');
    // //noinspection JSAnnotator
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/labmateData",

    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/labmateData', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/*add_ticket function to pop up a new form
 * @param none
 * @returns load parameter list
 *added by : Pawan Kumar
 */
function add_ticket() {

    $("#new_ticket_popup").modal('show');
}

function agent_tickets() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + 'service/booking_management/loadAgentTickets',
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         $('.data-result-panel').html(data);
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadAgentTickets', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true, "type": "form" });
}

function team_tickets() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + 'service/ticket_management/loadTeamTickets',
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         $('.data-result-panel').html(data);
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/ticket_management/loadTeamTickets', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true, "type": "form" });
}


function customer_tickets() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + 'service/booking_management/loadTicketsList',
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         $('.data-result-panel').html(data);
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadTicketsList', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true, "type": "form" });
}

function user_complaints() {

    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadUserComplaints",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadUserComplaints', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


/*Account Panel
 @author Manu S.
 * @param none
 * @return none
 chnage done
 */
function account_order_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/get_order_list",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/get_order_list', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


/*Customer Service Bookinf Fetch Panel
 @author Manu S.
 * @param none
 * @return none
 */
function cs_booking_details() {
    // var roleId = $('body').attr('active-role');
    // var bookingId = $('body').attr('current-booking');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/load_cs_booking_filter",
    //     data: { "role_id": roleId, "booking_id": bookingId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['booking_id'] = bookingId;

    ajax_call('service/booking_management/load_cs_booking_filter', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function dnd_sms() {
    $("#dnd_form_popup").modal('show');
}

//var myTicket  = setInterval(notifyNewTicket, 60000);
//var myTicket1 = setInterval(notifyNewTicketPopup, 60000);
//var myTicket2 = setInterval(notifyTicketSLA, 10000);

function notifyNewTicket() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/ticket_management/notifyTickets",
    //     data: { "notify": 1 },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         response = JSON.parse(response);

    //         if (response.data != 0) {
    //             $('.badge').html(response.data);
    //             //createPopup();
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['notify'] = 1;

    ajax_call('service/ticket_management/notifyTickets', 'POST', data, function(response) {
        response = JSON.parse(response);
        if (response.data != 0) {
            $('.badge').html(response.data);
            //createPopup();
        }
    }, '', { "showLoader": true, "type": "form" });
}

function notifyNewTicketPopup() {
    // var roleId = $('body').attr('active-role');

    // return $.ajax({
    //     url: __SITE.baseUrl + "service/ticket_management/notifyTickets",
    //     data: { "notify": 0 },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         response = JSON.parse(response);

    //         var message = '';
    //         if ((response.data.length > 0)) {
    //             $('#ticket_popup').modal("show");
    //             popups = response.data.length;
    //             for (var i = 0; i < response.data.length; i++) {

    //                 var info = response.data[i];

    //                 var subject = "<span style='color: #9d261d'>" + info.title + "</span>";
    //                 message += '*' + ' You have been assigned with a new ticket "' +
    //                     subject + '" with booking id = ' + info.booking_id + ' and with ticket id = ' +
    //                     info.ticket_id + '.<br><br>';

    //             }
    //             $('#ticket_message').html(message);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['notify'] = 0;

    ajax_call('service/ticket_management/notifyTickets', 'POST', data, function(response) {
        response = JSON.parse(response);
        var message = '';
        if ((response.data.length > 0)) {
            $('#ticket_popup').modal("show");
            popups = response.data.length;
            for (var i = 0; i < response.data.length; i++) {

                var info = response.data[i];

                var subject = "<span style='color: #9d261d'>" + info.title + "</span>";
                message += '*' + ' You have been assigned with a new ticket "' +
                    subject + '" with booking id = ' + info.booking_id + ' and with ticket id = ' +
                    info.ticket_id + '.<br><br>';

            }
            $('#ticket_message').html(message);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function notifyTicketSLA() {
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/ticket_management/getSLATime",
    //     data: {},
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         console.log(response);
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/ticket_management/getSLATime', 'POST', data, function(response) {
        console.log(response);
    }, '', { "showLoader": true, "type": "form" });
}

// Added By Varun Kr.
function lead_form(lead_id) {
    var roleId = $('body').attr('active-role');
    if (lead_id === 'undefined') { lead_id = '0' }
    // alert('2: '+urlInfo['phoneNumber']);
    // console.log(urlInfo);
    if (typeof urlInfo['phoneNumber'] != 'undefined') {
        var queryStr = { "role_id": roleId, "lead_id": lead_id, "urlInfo": JSON.stringify(urlInfo) };
        $('.main-header').hide();
        $('.content-header').hide();
        delete urlInfo['phoneNumber'];
    } else {
        var queryStr = { "role_id": roleId, "lead_id": lead_id };
    }
    $('.assigned-role').closest('li.active').removeClass('active');
    $('[data-role-id=1]').closest('li').addClass('active');
    $('.assigned-role-option option:selected').removeAttr('selected');
    $('[data-role-id=1]').attr('selected', 'selected');
    //noinspection JSAnnotator
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/lead_management/lead_form",
    //     data: queryStr,
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    ajax_call('service/lead_management/lead_form', 'POST', queryStr, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function lead_list() {
    // var roleId = $('body').attr('active-role');
    // //noinspection JSAnnotator
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/lead_management/leads_list",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/lead_management/leads_list', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function outbound_leads() {
    // var roleId = $('body').attr('active-role');
    // //noinspection JSAnnotator
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/lead_management/outbound_leads",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/lead_management/outbound_leads', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function newBookingByLead(email, contact_number, roleId, customerName, lead_id, state, city_id, gender, calling_number, lead_selected_user, lead_source, lead_cloud_did, channel_type, channel_user, age, reffer_by, clinicUserId, b2b_user_type) {
    var queryStr = {
        "role_id": roleId,
        "email": email,
        "customerName": customerName,
        "lead_id": lead_id,
        "state": state,
        "city_id": city_id,
        "gender": gender,
        "lead_form_load": 1,
        "lead_selected_user": lead_selected_user,
        "lead_source": lead_source,
        "lead_cloud_did": lead_cloud_did,
        "channel_type": channel_type,
        "channel_user": channel_user,
        "age": age,
        "reffer_by": reffer_by,
        "clinicUserId": clinicUserId,
        "b2b_user_type": b2b_user_type
    };
    // $('body').attr('phoneNumber', contact_number);
    $('body').attr('leadId', lead_id);
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/load_new_booking_panel",
    //     data: queryStr,
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.new-booking-by-lead').html(data);
    //             // $('html,body').animate({
    //             //     scrollTop: $('body').position().top += 600
    //             // });
    //             // $(".dataTable_wrapper").removeAttr('style').css("height","auto");
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });


    ajax_call('service/booking_management/load_new_booking_panel', 'POST', queryStr, function(response) {
        if (response) {
            $('.new-booking-by-lead').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function sms_camp_list() {

    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/sms_campaign_management/loadSMSCampaignList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/sms_campaign_management/loadSMSCampaignList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/** Manage Lead Campaign List
 * @author Varun Kr.
 */
function leadCampaignList() {

    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/LeadActionController/manageLeadCampaign",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/LeadActionController/manageLeadCampaign', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/** Generate the Report data
 * @author Shweta A.
 */


function report_auto_validation() {
    var booking_id = $('body').attr('current-booking');
    var $modal = $('#btn_report_auto_validation_data');
    $modal.modal('show');
}


function allLeadList() {
    // var roleId = $('body').attr('active-role');
    // //noinspection JSAnnotator
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/lead_management/allLeads",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/lead_management/allLeads', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function camp_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/camp_management/camp_list",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/camp_management/camp_list', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

//Cur - 1181  shortfall dashboard


function shortfall_dashboard() {
    // var roleId = $('body').attr('active-role');
    // //noinspection JSAnnotator
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/shortfallDashboard",

    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/shortfallDashboard', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}


//CUR -1184 Quality LJ Charts


function lj_charts() {
    // var roleId = $('body').attr('active-role');
    // //noinspection JSAnnotator
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/ljcharts",

    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/ljcharts', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

function auto_diagnosis() {
    $("#list_auto_diagnosis_modal").modal('show');
}



// CUR -1184 Quality LJ Charts





// cur 1249

function amount_collection(strParam, param1) {
    var roleId = $('body').attr('active-role');

    var booking_id = $('body').attr('current-booking');
    var $modal = $('#btn_SampleCollected');
    //alert(bookingId);

    // return $.ajax({
    //     url: __SITE.baseUrl + "service/panel_views/loadViewAmountCollection",
    //     data: {
    //         "role_id": roleId,
    //         "booking_id": booking_id,
    //         "unique_name": 'amount_collection'
    //     },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         console.log(response);
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (response.data) {
    //             $('.data-result-panel').html(response.data);
    //         }
    //         if (response.status === "error") {
    //             $('body').alertMessage({ type: 'error', message: response.message });

    //             $modal.modal('hide');
    //             refresh_booking_details();
    //         } else {

    //             $modal.modal('show');
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['booking_id'] = booking_id;
    data['unique_name'] = "amount_collection";

    ajax_call('service/panel_views/loadViewAmountCollection', 'POST', data, function(response) {
        console.log(response);
        if (response.data) {
            $('.data-result-panel').html(response.data);
        }
        if (response.status === "error") {
            $('body').alertMessage({ type: 'error', message: response.message });
            $modal.modal('hide');
            refresh_booking_details();
        } else {
            $modal.modal('show');
        }
    }, '', { "showLoader": true, "type": "form" });

}



//Cur - 1249

// Mukesh Sharma == for collection details
function bank_collection_details() {
    //alert("checking");
    //alert(__SITE.baseUrl + "service/accounting/load_new_booking_panel");
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/accounting/load_new_booking_panel",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }


    //         /*$("#selectedFromDate").datepicker({
    //             format: 'dd/mm/yyyy',
    //             autoclose: true,
    //         }).on('changeDate', function (selected) {
    //             var startDate = new Date(selected.date.valueOf());
    //             $('#selectedToDate').datepicker('setStartDate', startDate);
    //         }).on('clearDate', function (selected) {
    //             $('#selectedToDate').datepicker('setStartDate', null);
    //         });

    //         $("#selectedToDate").datepicker({ maxDate: "0",format:'dd/mm/yyyy', autoclose: true});


    //         $('#selDateRange').daterangepicker();
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/accounting/load_new_booking_panel', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
        /*$("#selectedFromDate").datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
        }).on('changeDate', function (selected) {
            var startDate = new Date(selected.date.valueOf());
            $('#selectedToDate').datepicker('setStartDate', startDate);
        }).on('clearDate', function (selected) {
            $('#selectedToDate').datepicker('setStartDate', null);
        });
        
        $("#selectedToDate").datepicker({ maxDate: "0",format:'dd/mm/yyyy', autoclose: true});
        */

        $('#selDateRange').daterangepicker();
    }, '', { "showLoader": true, "type": "form" });
}



//CUR-1250 Distance Travelled by Phlebo


function phlebo_distance_travelled() {
    // var roleId = $('body').attr('active-role');
    // //noinspection JSAnnotator
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/phlebo_management/phlebo_distance_travelled",

    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }



    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/phlebo_management/phlebo_distance_travelled', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}




//CUR-1250 Distance Travelled by Phlebo

// Mukesh Sharma == for collection details
function bank_collections() {

    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/accounting/get_collection_lists",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/accounting/get_collection_lists', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}



function closeViewReport() {
    var $modal = $('#view_report_modal');
    $modal.modal('hide');
}

function closeViewDetail() {
    var $modal = $('#view_detail');
    $modal.modal('hide');
}

function viewReceipt(colId) {

    // var ContentLength = "";
    // var ContentType = "";
    // var encodeImage = "";
    var collection_id = colId;
    // $.ajax({
    //     url: __SITE.baseUrl + "service/accounting/get_collection_receipt_detail",
    //     data: { "collection_id": collection_id },
    //     type: "POST",
    //     dataType: 'json',
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(res) {

    //         if (res.status && res.data) {
    //             var col_data = res.data;

    //             ContentLength = col_data.ContentLength;
    //             ContentType = col_data.ContentType;
    //             encodeImage = col_data.encodeImage;

    //             var $modal = $('#view_report_modal');
    //             var omyFrame = document.getElementById("myFrame");
    //             omyFrame.style.display = "block";
    //             omyFrame.src = "data:" + ContentType + ";base64, " + encodeImage;
    //             $modal.modal('show');
    //             $('.data-result-panel').rayanLoaderHide();
    //         } else {
    //             $('.data-result-panel').rayanLoaderHide();
    //             alert("Receipt is not available");
    //         }
    //     }
    // });

    var data = {};
    data['collection_id'] = collection_id;

    ajax_call('service/accounting/get_collection_receipt_detail', 'POST', data, function(response) {
        if (response.status && response.data) {
            var col_data = response.data;

            ContentLength = col_data.ContentLength;
            ContentType = col_data.ContentType;
            encodeImage = col_data.encodeImage;

            var $modal = $('#view_report_modal');
            var omyFrame = document.getElementById("myFrame");
            omyFrame.style.display = "block";
            omyFrame.src = "data:" + ContentType + ";base64, " + encodeImage;
            $modal.modal('show');
        } else {
            alert("Receipt is not available");
        }
    }, '', { "showLoader": true, 'dataType': 'json', "type": "form" });


}

function getdetailpage(coll_id) {
    //e.preventDefault();
    //var collection_id = $(this).data('bid');
    var collection_id = coll_id;
    // $.ajax({
    //     url: __SITE.baseUrl + "service/accounting/get_collection_detail",
    //     data: { "collection_id": collection_id },
    //     type: "POST",
    //     dataType: 'json',
    //     beforeSend: function() {
    //         // $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(res) {

    //         if (res.status && res.data) {

    //             var col_data = res.data;

    //             var htmlList = '<table class="table-new table-striped table-bordered table-hover" id="dataTables-example"><thead><tr><th>S.R.</th> <th>Booking Id</th><th>Payment Type</th><th>Amount</th> <th>Transaction date</th><th>Is Deposited In Bank</th> </tr></thead><tbody>';
    //             $.each(col_data, function(k, list) {

    //                 var depost_in_bank = "No";
    //                 if (list.is_deposited_in_bank == "1")
    //                     var depost_in_bank = "yes";

    //                 htmlList += "<tr><td>" + (k + 1) + "</td><td>" + list.booking_id + "</td><td>" + list.type_of_payment + "</td><td>" + list.recieved_amount + "</td><td>" + list.created_at + "</td><td>" + depost_in_bank + "</td></tr>";
    //             });
    //             htmlList += "</tbody></table>";
    //             $("#view_detail").modal('show');
    //             $("#transaciton_list").html(htmlList);
    //             $('.data-result-panel').rayanLoaderHide();
    //         } else {

    //             alert("No Detail Found");

    //         }



    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });



    var data = {};
    data['collection_id'] = collection_id;

    ajax_call('service/accounting/get_collection_detail', 'POST', data, function(response) {
        if (response.status && response.data) {
            var col_data = response.data;
            var htmlList = '<table class="table-new table-striped table-bordered table-hover" id="dataTables-example"><thead><tr><th>S.R.</th> <th>Booking Id</th><th>Payment Type</th><th>Amount</th> <th>Transaction date</th><th>Is Deposited In Bank</th> </tr></thead><tbody>';
            $.each(col_data, function(k, list) {

                var depost_in_bank = "No";
                if (list.is_deposited_in_bank == "1")
                    var depost_in_bank = "yes";

                htmlList += "<tr><td>" + (k + 1) + "</td><td>" + list.booking_id + "</td><td>" + list.type_of_payment + "</td><td>" + list.recieved_amount + "</td><td>" + list.created_at + "</td><td>" + depost_in_bank + "</td></tr>";
            });
            htmlList += "</tbody></table>";
            $("#view_detail").modal('show');
            $("#transaciton_list").html(htmlList);
        } else {
            alert("No Detail Found");
        }
    }, '', { "showLoader": true, 'dataType': 'json', "type": "form" });

}

function paam_bookings() {

    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "routeallocation/paam_bookings",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //         $('.dealy').prependTo("#locus-dataTables-example");
    //         addSerialNumber();

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('routeallocation/paam_bookings', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
        $('.dealy').prependTo("#locus-dataTables-example");
        addSerialNumber();
    }, '', { "showLoader": true, "type": "form" });
}

function routeallocation_dashboard() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "routeallocation/dashboard",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('routeallocation/dashboard', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/*
@author : somnath
Description :  for phlebo attendance register


 */



function attendance_register() {
    // var roleId = $('body').attr('active-role');
    // //noinspection JSAnnotator
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/phlebo_management/attendance_register",

    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }



    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/phlebo_management/attendance_register', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

function lead_ticket_assignee() {


    var roleId = $('body').attr('active-role');
    var head_department_filter = 0;
    if (roleId == 62) {
        head_department_filter = 28;
    } else if (roleId == 63) {
        head_department_filter = 29;
    }
    //noinspection JSAnnotator
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/assignee_management/show_panel",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/assignee_management/show_panel', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

function runner_pickup() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "runner/runer_taskList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('runner/runer_taskList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/* phlebo_task_list function to show the Phlebo tasks listing
 * @param none
 * @returns load Phlebo task list
 */

function phlebo_task_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadPhleboTaskList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadPhleboTaskList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}




function subscription_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/subscription_management_crm/load_subscription_list",
    //     data: {},
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (response && response.status == 'error') {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //         } else {
    //             $('.data-result-panel').rayanLoaderHide();
    //             if (response) {
    //                 $('.data-result-panel').html(response);
    //             }
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/subscription_management_crm/load_subscription_list', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            if (response) {
                $('.data-result-panel').html(response);
            }
        }
    }, '', { "showLoader": true, "type": "form" });
}


function customer_subscription() {
    var roleId = $('body').attr('active-role');
    var phoneNumber = $('body').attr('phoneNumber');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/subscription_management_crm/load_customer_subscription_panel",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {

    //             $('.data-result-panel').html(data);

    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/subscription_management_crm/load_customer_subscription_panel', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}




/*
For loading subscription detail Pannel
 */


function subscription() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/subscription_management_crm/load_subscription",
    //     data: {},
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (response && response.status == 'error') {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //         } else {
    //             $('.data-result-panel').rayanLoaderHide();
    //             if (response) {
    //                 $('.data-result-panel').html(response);
    //             }
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/subscription_management_crm/load_subscription', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            if (response) {
                $('.data-result-panel').html(response);
            }
        }
    }, '', { "showLoader": true, "type": "form" });
}




$(document).on('dblclick', '.view-subscription_deatil', function() {
    var user_subscribe_id = $(this).attr('user-subscribe-id');
    loadcustomterPanels(user_subscribe_id);
});



function lis_diagno_bookings() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "diagno/load_bookinglist",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('diagno/load_bookinglist', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}
/*
 For loading subscription detail Pannel
 */


function manage_lead_source() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/LeadActionController/manageLeadSource",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });


    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/LeadActionController/manageLeadSource', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function camp_booking() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/collection_management/load_camp_booking",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/collection_management/load_camp_booking', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function loadBlankBookingView() {
    clear_map_interval();
    // var roleId = $('body').attr('active-role');
    $('body').attr('actionId', 0);
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/get_blank_booking",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/get_blank_booking', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


/** Generate the Report data
 * @author Shweta A.
 */


function cust_pretest_info() {
    var booking_id = $('body').attr('current-booking');
    var $modal = $('#btn_customer_pretest_data');
    $modal.modal('show');
}





/*
@author : somnath
loads list of cutomers whose last report uploaded as partial report
 */



function partial_report() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/partial_report/loadPartialReportList",
    //     data: {},
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (response && response.status == 'error') {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //         } else {
    //             $('.data-result-panel').rayanLoaderHide();
    //             if (response) {
    //                 $('.data-result-panel').html(response);
    //             }
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/partial_report/loadPartialReportList', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            if (response) {
                $('.data-result-panel').html(response);
            }
        }
    }, '', { "showLoader": true, "type": "form" });

}

function bd_report() {
    // var roleId = $('body').attr('active-role');
    // //noinspection JSAnnotator
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/bdReport",

    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/bdReport', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}





function phlebo_track() {
    // var roleId = $('body').attr('active-role');
    // //noinspection JSAnnotator
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/phlebo_management/phlebo_track",

    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }



    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/phlebo_management/phlebo_track', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

var drawDrivingRouteOnMapInterval, getMarkerDataInterval, drawPathOnMapInterval, plotmarkerhome;

function clear_map_interval() {
    clearInterval(getMarkerDataInterval);
    clearInterval(plotmarkerhome);
    clearInterval(drawPathOnMapInterval);
    clearInterval(drawDrivingRouteOnMapInterval);
}


function send_customer_maternal_form() {
    var booking_id = $('body').attr('current-booking');
    var $modal = $('#btn_send_customer_maternal_form');
    $modal.modal('show');
    $modal.find('#send_button').on('click', function(e) {
        e.preventDefault();
        var customer_id = $modal.find('#customer').val();
        if (customer_id != "") {
            // $.ajax({
            //     url: __SITE.baseUrl + 'cron/customer_pretest_data/sendPreTestCommunication',
            //     data: { "booking_id": booking_id, "customer_id": customer_id },
            //     type: 'POST',
            //     beforeSend: function() {
            //         $modal.find('.modal-body').rayanLoaderShow();
            //     },
            //     success: function(response) {
            //         if (response && response.status) {
            //             $('body').alertMessage({ type: 'success', message: response.message });
            //             $modal.modal('hide');
            //             //refresh_booking_details();
            //         } else {
            //             $('body').alertMessage({ type: 'error', message: response.message });
            //         }
            //         $modal.find('.modal-body').rayanLoaderHide();
            //     },
            //     error: function() {
            //         $modal.find('.modal-body').rayanLoaderHide();
            //     }
            // });

            var data = {};
            data['role_id'] = $('body').attr('active-role');
            data['booking_id'] = booking_id;
            data['customer_id'] = customer_id;

            ajax_call('cron/customer_pretest_data/sendPreTestCommunication', 'POST', data, function(response) {
                if (response && response.status) {
                    $('body').alertMessage({ type: 'success', message: response.message });
                    $modal.modal('hide');
                    //refresh_booking_details();
                } else {
                    $('body').alertMessage({ type: 'error', message: response.message });
                }
            }, '', { "showLoader": true, "type": "form" });



        } else {
            alert("Please select Customer");
        }
    });
}

function phlebo_kit() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/inventory_management/load_inventory_pannel",
    //     data: { "role_id": roleId, 'inward_outward': 1 },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['inward_outward'] = 1;

    ajax_call('service/inventory_management/load_inventory_pannel', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function view_kit_inventory() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/inventory_management/view_kit_inventory",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/view_kit_inventory', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


/**
 *
 * Function :distribution_center_dashboard
 * @developer: Anubhaw K Sharma
 * @date: 31 May 2018
 *
 */

function distribution_center_dashoboard() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/inventory_management/distribution_center_dashoboard",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/distribution_center_dashoboard', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}













function view_consumable_kit() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/inventory_management/view_consumable_kit",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });


    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/view_consumable_kit', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function paam_night_schedule() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "routeallocation/route_schedule",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('routeallocation/route_schedule', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function zone_wise_sms() {

    $("#zone_wise_sms").modal('show');
}

function bd_lead_form(contact_number) {
    if (contact_number === 'undefined') { contact_number = '0' }

    var data = {};

    data['role_id'] = $('body').attr('active-role');
    data['contact_number'] = contact_number;

    ajax_call('service/BdLeadActionController/bdLeadForm', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function bd_lead_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/BdLeadActionController/bdLeadList",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/BdLeadActionController/bdLeadList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function vendor_panel() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/inventory_management/load_vendor_pannel",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/load_vendor_pannel', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function view_vendor_inventory() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/inventory_management/view_vendor_inventory",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/view_vendor_inventory', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function stock_dashboard() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/inventory_management/stock_dashboard",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/stock_dashboard', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}



function city_panel() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/inventory_management/load_city_pannel",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/load_city_pannel', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function view_city_inventory() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/inventory_management/view_city_inventory",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/view_city_inventory', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}




function vendor_transaction() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/inventory_management/vendor_transaction",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/vendor_transaction', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}







/*
 function : manage_item_kit

 Scope: Call this function to load the view for item management.
 */

function manage_item_kit() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/inventory_management/load_item_kit_management",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/load_item_kit_management', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}



/*
 function : manage_vendor

 Scope: Call this function to load the view for vendor management.
 */

function manage_vendor() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/inventory_management/load_vendor_management",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/load_vendor_management', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}





function city_dashboard() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/inventory_management/city_dashboard",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/city_dashboard', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function phlebo_view() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "routeallocation/phlebo_view",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('routeallocation/phlebo_view', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function sms_report() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/complain_management/sms_report",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/complain_management/sms_report', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function track_courier() {
    var booking_id = $('body').attr('current-booking');
    $("#courierTracking").modal('show');
    $("#courierBookingID").html(booking_id);
}


function capture_lead() {
    var booking_id = $('body').attr('current-booking');
    $("#capture_lead").modal('show');
}

function new_healthians_service() {
    // var roleId = $('body').attr('active-role');
    // var phoneNumber = $('body').attr('phoneNumber');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/healthians_service/load_healthians_service_panel",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {

    //             $('.data-result-panel').html(data);

    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/healthians_service/load_healthians_service_panel', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function healthians_service_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/healthians_service/load_service_list",
    //     data: {},
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (response && response.status == 'error') {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //         } else {
    //             $('.data-result-panel').rayanLoaderHide();
    //             if (response) {
    //                 $('.data-result-panel').html(response);
    //             }
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/healthians_service/load_service_list', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            if (response) {
                $('.data-result-panel').html(response);
            }
        }
    }, '', { "showLoader": true, "type": "form" });
}


function healthians_service_due_list() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/healthians_service/load_due_service_list",
    //     data: {},
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();

    //         if (response && response.status == 'error') {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //         } else {
    //             $('.data-result-panel').rayanLoaderHide();
    //             if (response) {
    //                 $('.data-result-panel').html(response);
    //             }
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });


    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/healthians_service/load_due_service_list', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            if (response) {
                $('.data-result-panel').html(response);
            }
        }
    }, '', { "showLoader": true, "type": "form" });

}
$(document).on('dblclick', '.view-service-detail', function() {
    var user_subscribe_id = $(this).attr('user-service-id');
    loadcustomterPanels(user_subscribe_id);
});



function phlebo_sales_target() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/phlebo_management/loadPhleboSalesTarget",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/phlebo_management/loadPhleboSalesTarget', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}



function reached_booking() {
    var roleId = $('body').attr('active-role');
    var booking_id = $('body').attr('current-booking');
    var current_booking_status = $('body').attr('current-order-status');

    $.confirmIt("Do you want to mark this booking as sample collector reached home?", function() {
        // return $.ajax({
        //     url: __SITE.baseUrl + "service/panel_views/loadViewReachedBooking",
        //     data: {
        //         "role_id": roleId,
        //         "booking_id": booking_id,
        //         "current_booking_status": current_booking_status,
        //         "unique_name": "reached_booking",
        //         "proceed": true
        //     },
        //     type: "POST",
        //     beforeSend: function() {
        //         $('.data-result-panel').rayanLoaderShow();
        //     },
        //     success: function(response) {
        //         if (response.status == 1) {
        //             $('body').alertMessage({ type: 'success', message: response.message });
        //         } else {
        //             $('body').alertMessage({ type: 'error', message: response.message });
        //         }
        //         refreshManinPanel();
        //         $('.data-result-panel').rayanLoaderHide();
        //     },
        //     error: function() {
        //         $('body').alertMessage({ type: 'error', message: 'Network Error.' });
        //         $('.data-result-panel').rayanLoaderHide();
        //     }
        // });

        var data = {};
        data['role_id'] = $('body').attr('active-role');
        data['booking_id'] = booking_id;
        data['current_booking_status'] = current_booking_status;
        data['unique_name'] = "reached_booking";
        data['proceed'] = true;

        ajax_call('service/panel_views/loadViewReachedBooking', 'POST', data, function(response) {
            if (response.status == 1) {
                $('body').alertMessage({ type: 'success', message: response.message });
            } else {
                $('body').alertMessage({ type: 'error', message: response.message });
            }
            refreshManinPanel();
        }, '', { "showLoader": true, "type": "form" });


    });
}


function cancel_service() {
    $('#cancelServiceModal').modal('show');

}

// Mukesh
function online_transaction_log() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/common_ctrl/get_online_transaction_log",
    //     data: {},
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(response) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (response && response.status == 'error') {
    //             $('body').alertMessage({ type: 'error', message: response.message });
    //         } else {
    //             $('.data-result-panel').rayanLoaderHide();
    //             $('.data-result-panel').html(response);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/common_ctrl/get_online_transaction_log', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}


function load_lead_agent_criteria() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     // url: __SITE.baseUrl + "service/LeadActionController/loadLeadAgentCriteria",
    //     url: __SITE.baseUrl + "service/LeadActionController/loadLeadAgentCriteria",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {

    //             $('.data-result-panel').html(data);

    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/LeadActionController/loadLeadAgentCriteria', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}


/*
Function : phlebo_ledger
scope : Load ledger view for phlebo
 */


function phlebo_ledger() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/inventory_management/load_phlebo_ledger",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/load_phlebo_ledger', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}






/*
Function : load_main_inventory_ledger
scope : Load ledger view for phlebo
 */


function load_main_inventory_ledger() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/inventory_management/load_main_inventory_ledger",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/load_main_inventory_ledger', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}




/*
Function : load_vender_ledger
scope : Load ledger view for phlebo
 */


function load_vendor_ledger() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/inventory_management/load_vendor_ledger",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/load_vendor_ledger', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function insert_action_auditlog(user_id, jsActionName, role_id) {

    data = { "user_id": user_id, "jsActionName": jsActionName, "role_id": role_id };
    // $.ajax({
    //     url: __SITE.baseUrl + 'service/booking_management/insert_action_auditlog',
    //     data: data,
    //     dataType: 'json',
    //     type: 'POST',
    //     beforeSend: function() {

    //     },
    //     success: function(response) {

    //     },
    //     error: function() {

    //     }
    // });


    // var data = {};
    // data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/insert_action_auditlog', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', {});

}

// function check_action_panel(actionId){
//     data = {"actionId":actionId};
//     $.ajax({
//             url: __SITE.baseUrl + 'service/booking_management/check_action_panel',
//             data: data,
//             dataType: 'json',
//             type: 'POST',
//             beforeSend: function () {

//             },
//             success: function (response) {

//             },
//             error: function () {

//             }
//         });
// }

/* Habit Panel */
function habit() {
    // var roleId = $('body').attr('active-role');
    // //noinspection JSAnnotator
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadViewHabit",

    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadViewHabit', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

/* Risk Panel */
function risk() {
    // var roleId = $('body').attr('active-role');
    // //noinspection JSAnnotator
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadViewRisk",

    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });


    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/loadViewRisk', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}



// Mukesh
function revert_sample() {
    var roleId = $('body').attr('active-role');
    var booking_id = $('body').attr('current-booking');
    var current_order_status = $('body').attr('current-order-status');
    if (confirm("Are you sure?")) {
        // return $.ajax({
        //     url: __SITE.baseUrl + "service/common_ctrl/revert_sample_to_sample_collected",
        //     data: { "booking_id": booking_id, unique_name: "revert_sample", current_order_status: current_order_status },
        //     type: "POST",
        //     beforeSend: function() {
        //         $('.data-result-panel').rayanLoaderShow();
        //     },
        //     success: function(response) {
        //         $('.data-result-panel').rayanLoaderHide();
        //         if (response && response.status == 'error') {
        //             $('body').alertMessage({ type: 'error', message: response.message });
        //         } else {
        //             $('body').alertMessage({ type: 'success', message: response.message });
        //             loadBlankBookingView();
        //         }
        //     },
        //     error: function() {
        //         $('.data-result-panel').rayanLoaderHide();
        //     }
        // });

        var data = {};
        data['role_id'] = $('body').attr('active-role');
        data['booking_id'] = booking_id;
        data['unique_name'] = "revert_sample";
        data['current_order_status'] = current_order_status;

        ajax_call('service/common_ctrl/revert_sample_to_sample_collected', 'POST', data, function(response) {
            if (response && response.status == 'error') {
                $('body').alertMessage({ type: 'error', message: response.message });
            } else {
                $('body').alertMessage({ type: 'success', message: response.message });
                loadBlankBookingView();
            }
        }, '', { "showLoader": true, "type": "form" });
    }
}

function map_virtual_number() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/VirtualNumberController/mapVirtualNumber",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {

    //             $('.data-result-panel').html(data);

    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/VirtualNumberController/mapVirtualNumber', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}


function loadActionList(strparam, actionId) {
    var roleId = $('body').attr('active-role');
    var page = $('body').attr('next-page');
    $('body').attr('actionId', actionId);
    var formData = $('.panel-filter-form').serializeArray();
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/loadActionList" + '?per_page=' + page + '&role_id=' + roleId + '&actionId=' + actionId,
    //     data: formData,
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             loadBookingFilters(actionId);
    //             $('.data-result-panel').html(data);

    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });



    ajax_call('service/booking_management/loadActionList?per_page=' + page + '&role_id=' + roleId + '&actionId=' + actionId, 'POST', formData, function(response) {
        if (response) {
            loadBookingFilters(actionId);
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function lead_campaign_page() {
    // var roleId = $('body').attr('active-role');
    // var phoneNumber = $('body').attr('phoneNumber');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/booking_management/lead_campaign_page",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {

    //             $('.data-result-panel').html(data);

    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/lead_campaign_page', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function coupon_limit_management() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/coupon_management/couponCreationLimit",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/coupon_management/couponCreationLimit', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function covid_docs_verification() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/coupon_management/couponCreationLimit",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/covidDocsVerification', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function doctor_management_panel_v2() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/doctor_management/doctorManagementPanel', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function covid_drive_bookings_list() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/covid19DriveBookingsList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function booking_agent_change_log() {
    var roleId = $('body').attr('active-role');
    return $.ajax({
        url: __SITE.baseUrl + "service/booking_management/bookingAgentChangeLog",
        data: { "role_id": roleId },
        type: "POST",
        beforeSend: function() {
            $('.data-result-panel').rayanLoaderShow();
        },
        success: function(data) {
            $('.data-result-panel').rayanLoaderHide();
            if (data) {
                $('.data-result-panel').html(data);
            }
        },
        error: function() {
            $('.data-result-panel').rayanLoaderHide();
        }
    });
}

function enduser_reconcile() {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/inventory_management/load_enduser_reconcile",
    //     data: { "role_id": roleId, 'inward_outward': 1 },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['inward_outward'] = 1;

    ajax_call('service/inventory_management/load_enduser_reconcile', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function editActivitySchedulerJs(activity_scheduler_id) {
    $("#activity_scheduler_popup").modal('show');
    $("#activity_status").val('1');
    $("#activity_report_name").val('');
    $("#activity_scheduler_id").val('');
    $("#activity_subject").val('');
    $("#activity_query_group").val('');
    $("#activity_query_group_div").hide();
    $("#activity_body").val('');
    $("#activity_to").val('');
    $("#activity_from").val('');
    $("#activity_scheduled").val('');
    $("#activity_is_attachment").prop('checked', false);
    $("#query_type_1").prop('checked', true);

    // $.ajax({
    //     url: __SITE.baseUrl + "service/activity_scheduler/getDataById",
    //     data: { activity_scheduler_id: activity_scheduler_id },
    //     type: "POST",
    //     dataType: 'json',
    //     beforeSend: function() {

    //         $('.data-result-panel').rayanLoaderShow();

    //     },
    //     success: function(data) {
    //         if (data.query_group == null) {
    //             $("#activity_query_group_div").hide();
    //             $("#activity_query_group").prop('required', false);
    //             $("#activity_body").prop("required", true);
    //             $("#activity_body_div").show();
    //         } else {
    //             $("#query_type_2").prop('checked', true);
    //             $("#activity_query_group_div").show();
    //             $("#activity_query_group").prop('required', true);
    //             $("#activity_body").prop("required", false);
    //             $("#activity_body_div").hide();
    //         }
    //         $("#activity_status").val(data.active_status);
    //         $("#activity_subject").val(data.subject);
    //         $("#activity_body").val(data.query);
    //         $("#activity_to").val(data.to);
    //         $("#activity_query_group").val(data.query_group);
    //         $("#activity_scheduled").val(data.schedule_time);
    //         if (data.from_name == 'Tech Alerts')
    //             $("#activity_from").val(1);
    //         else $("#activity_from").val(2);
    //         if (data.is_attachment == 1)
    //             $("#activity_is_attachment").prop('checked', true);
    //         $("#activity_scheduler_id").val(data.id);
    //         $("#activity_report_name").val(data.report_name);

    //         $('.data-result-panel').rayanLoaderHide();
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //         $('body').alertMessage({ type: 'error', message: "Something went wrong" });
    //     }
    // });



    var data = {};
    data['activity_scheduler_id'] = activity_scheduler_id;

    ajax_call('service/activity_scheduler/getDataById', 'POST', data, function(response) {
        if (response.query_group == null) {
            $("#activity_query_group_div").hide();
            $("#activity_query_group").prop('required', false);
            $("#activity_body").prop("required", true);
            $("#activity_body_div").show();
        } else {
            $("#query_type_2").prop('checked', true);
            $("#activity_query_group_div").show();
            $("#activity_query_group").prop('required', true);
            $("#activity_body").prop("required", false);
            $("#activity_body_div").hide();
        }
        $("#activity_status").val(response.active_status);
        $("#activity_subject").val(response.subject);
        $("#activity_body").val(response.query);
        $("#activity_to").val(response.to);
        $("#activity_query_group").val(response.query_group);
        $("#activity_scheduled").val(response.schedule_time);
        if (response.from_name == 'Tech Alerts')
            $("#activity_from").val(1);
        else $("#activity_from").val(2);
        if (response.is_attachment == 1)
            $("#activity_is_attachment").prop('checked', true);
        $("#activity_scheduler_id").val(response.id);
        $("#activity_report_name").val(response.report_name);
    }, '', { "showLoader": true, 'dataType': 'json', "type": "form" });

}

function filter_csv_number() {
    var phoneNumber = $('body').attr('phoneNumber');
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/BookingReportDownload/filterCsvNumber', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function playAudioJs(url, callId = '') {
    window.open(url, '_blank');
}

function promotional_email_template() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('emailTemplatesController/loadViewPromotionalEmailTemplate', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function promotional_email_images() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('emailTemplatesController/loadViewPromotionalEmailImages', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function distributioncenter_pending_approval() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/distributioncenter_pending_approval', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function distributioncenter_pending_processing() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/distributioncenter_pending_processing', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function crm_users_role_wise() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['action'] = 'crm_users_role_wise';

    ajax_call('service/booking_management/loadUserList', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            $('.data-result-panel').rayanLoaderHide();
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function crm_users_permissions() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('users/loadCrmUsersPermissions', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            $('.data-result-panel').rayanLoaderHide();
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function distribution_new_dashboard() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/distribution_new_dashboard', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function roi() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/marketing_mis/getROI', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}



function phlebo_review_distribution_center() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/phlebo_review_distribution_center', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}



function phlebo_review_individual() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/phlebo_review_individual', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}


function uploadDataPredictiveDialer() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/dialer_management/uploadDataPredictiveDialer', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function remarketingPredictiveDialing() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/dialer_management/remarketingPredictiveDialing', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function dispose_call() {
    getdispostionpanel();
    return false;
}

function salesteam_sales_target() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/phlebo_management/loadSalesTeamTarget', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}



function sample_centrifuge_list() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('collection_centre/collection_centre/load_sampleList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function barcode_scanner() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('barcode_management/barcode_management/load_barcode_panel', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}



function updateClinicalHistoryJs(cus_trf_id) {
    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['cus_trf_id'] = cus_trf_id;

    ajax_call('service/panel_views/loadViewAutoUpdateclinicalhistory', 'POST', data, function(response) {
        if (response) {
            $('#auto_required_clinical_history').modal('show');
            $('#auto_required_clinical_history').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function sample_on_hold() {
    var roleId = $('body').attr('active-role');
    var booking_id = $('body').attr('current-booking');
    var current_order_status = $('body').attr('current-order-status');
    if (confirm("Are you sure?")) {
        var data = {};
        data['role_id'] = $('body').attr('active-role');
        data['booking_id'] = booking_id;
        data['unique_name'] = "sample_on_hold";
        data['current_order_status'] = current_order_status;

        ajax_call('service/common_ctrl/sample_on_hold', 'POST', data, function(response) {
            if (response && response.status == 'error') {
                $('body').alertMessage({ type: 'error', message: response.message });
            } else {
                $('body').alertMessage({ type: 'success', message: response.message });
                loadBlankBookingView();
            }
        }, '', { "showLoader": true, "type": "form" });


    }
}


function audit_score_card() {

    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/learn_and_development/load_audit_score_card",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/learn_and_development/load_audit_score_card', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}




function addAgentScore(call_id) {
    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/learn_and_development/add_agent_score_from_call_history",
    //     data: { "call_id": call_id, "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('#auto_agent_history').modal('show');
    //             $('#auto_agent_history').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['call_id'] = call_id;

    ajax_call('service/learn_and_development/add_agent_score_from_call_history', 'POST', data, function(response) {
        if (response) {
            $('#auto_agent_penalty').modal('show');
            $('#auto_agent_penalty').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function getCallDuration(call_id) {

    try {
        return $('td[data-field="call id"]:contains("' + call_id + '")').closest('tr').find("td[data-field='Call Duration (Min)']").html().trim();
    } catch (e) {
        return false;
    }
}

function addPenaltyJs(call_id) {
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/learn_and_development/loadViewAutoAgentPenalty",
    //     data: { "call_id": call_id },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('#auto_agent_penalty').modal('show');
    //             $('#auto_agent_penalty').html(data);
    //         }

    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['call_id'] = call_id;

    ajax_call('service/learn_and_development/loadViewAutoAgentPenalty', 'POST', data, function(response) {
        if (response) {
            $('#auto_agent_penalty').modal('show');
            $('#auto_agent_penalty').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function penalty_list() {

    var roleId = $('body').attr('active-role');
    return $.ajax({
        url: __SITE.baseUrl + "service/learn_and_development/load_penalty_list",
        data: { "role_id": roleId },
        type: "POST",
        beforeSend: function() {
            $('.data-result-panel').rayanLoaderShow();
        },
        success: function(data) {
            $('.data-result-panel').rayanLoaderHide();
            if (data) {
                $('.data-result-panel').html(data);
            }

        },
        error: function() {
            $('.data-result-panel').rayanLoaderHide();
        }
    });

    // var data = {};
    // data['role_id'] = $('body').attr('active-role');

    // ajax_call('service/learn_and_development/load_penalty_list', 'POST', data, function(response) {
    //     if (response) {
    //         $('.data-result-panel').html(response);
    //     }
    // }, '', { "showLoader": true ,"type":"form" });
}




// for L n D
function add_score_card_common() {

    var callid = $("#call_id").val();
    var agentid = $("#agentid").val();
    var score_remark = $("#score_remark").val();
    var role_id = $("#role_id").val();
    var total_score = $("#totalScore").val();
    if (callid == "") {
        alert("Call Id is required");
        return false;
    }

    var inBlank = 0;
    var wCount = 0;
    var wQuestions = 0;
    var queAns = new Array();
    var score_card = new Array();
    var numItems = $('.inputscoreCard').length;
    var i = 0;
    $(".inputscoreCard").each(function() {
        if ($(this).val() == "") {
            inBlank++;
        }
        if ($(this).val() > $(this).data("weightid")) {
            wCount++;
        }
        if ($(this).val() != "" || $(this).val() != null) {
            queAns[$(this).data("idd")] = $(this).val();
        }
    });
    var i;
    var total_ques = numItems;
    for (i = 0; i < total_ques; i++) {
        score_card[i] = $("input[name='radio_" + i + "']:checked").val();
    }
    if (inBlank > 0) {
        alert("Please fill all questions score.");
        return false;
    }
    if (wCount > 0) {
        alert("Score should not be greater than weightage");
        return false;
    }

    // $.ajax({
    //     url: __SITE.baseUrl + "service/learn_and_development/add_agent_score",
    //     data: { "call_id": callid, "total_score": total_score, "role_id": role_id, "queans": JSON.stringify(queAns), "remark": score_remark, "agentid": agentid, "score_card": JSON.stringify(score_card) },
    //     type: 'post',
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data && data.status == true) {
    //             $('body').alertMessage({ type: 'success', message: data.message });
    //             $('#auto_agent_history').html();
    //             $('#auto_agent_history').modal('hide');
    //             loadViewsByAction('CallRecording', 'call_recording', '0', '', '304', '1');
    //         } else {
    //             $('body').alertMessage({ type: 'error', message: data.message });
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //         $('body').alertMessage({ type: 'error', message: 'Record have some issue.' });
    //     }
    // });


    var data = {};
    data['roleId'] = $('body').attr('active-role');
    data['call_id'] = callid;
    data['total_score'] = total_score;
    data['queans'] = JSON.stringify(queAns);
    data['remark'] = score_remark;
    data['agentid'] = agentid;
    data['score_card'] = JSON.stringify(score_card);

    ajax_call('service/learn_and_development/add_agent_score', 'POST', data, function(response) {
        if (response && response.status == true) {
            $('body').alertMessage({ type: 'success', message: response.message });
            $('#auto_agent_history').html();
            $('#auto_agent_history').modal('hide');
            loadViewsByAction('CallRecording', 'call_recording', '0', '', '304', '1');
        } else {
            $('body').alertMessage({ type: 'error', message: response.message });
        }
    }, '', { "showLoader": true, "type": "form" });

}

function add_score_card_sales() {

    var callid = $("#call_id").val();
    var agentid = $("#agentid").val();
    var score_remark = $("#score_remark").val();
    var role_id = $("#role_id").val();
    var total_score = $("#totalScore").val();
    if (callid == "") {
        alert("Call Id is required");
        return false;
    }

    var inBlank = 0;
    var wCount = 0;
    var wQuestions = 0;
    var queAns = new Array();
    var score_card = new Array();
    var numItems = $('.inputscoreCard').length;
    var i = 0;
    $(".inputscoreCard").each(function() {
        if ($(this).val() == "") {
            inBlank++;
        }
        if ($(this).val() > $(this).data("weightid")) {
            wCount++;
        }
        if ($(this).val() != "" || $(this).val() != null) {
            queAns[$(this).data("idd")] = $(this).val();
        }
    });
    var i = 0;
    $(".wetmark").each(function() {
        var myval = parseInt($(this).html());

        if (!isNaN(myval)) {
            score_card[i] = myval
        }
        i++;
    });
    // for (i = 0; i < numItems; i++) {
    //     score_card[i] = $("input[name='radio_" + i + "']:checked").val();
    // }
    if (inBlank > 0) {
        alert("Please fill all questions score.");
        return false;
    }
    if (wCount > 0) {
        alert("Score should not be greater than weightage");
        return false;
    }

    // $.ajax({
    //     url: __SITE.baseUrl + "service/learn_and_development/add_agent_score",
    //     data: { "call_id": callid, "total_score": total_score, "role_id": role_id, "queans": JSON.stringify(queAns), "remark": score_remark, "agentid": agentid, "score_card": JSON.stringify(score_card) },
    //     type: 'post',
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data && data.status == true) {
    //             $('body').alertMessage({ type: 'success', message: data.message });
    //             $('#auto_agent_history').html();
    //             $('#auto_agent_history').modal('hide');
    //             loadViewsByAction('CallRecording', 'call_recording', '0', '', '304', '1');
    //         } else {
    //             $('body').alertMessage({ type: 'error', message: data.message });
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //         $('body').alertMessage({ type: 'error', message: 'Record have some issue.' });
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');
    data['call_id'] = callid;
    data['total_score'] = total_score;
    data['queans'] = JSON.stringify(queAns);
    data['remark'] = score_remark;
    data['agentid'] = agentid;
    data['score_card'] = JSON.stringify(score_card);

    ajax_call('service/learn_and_development/add_agent_score', 'POST', data, function(response) {
        if (response && response.status == true) {
            $('body').alertMessage({ type: 'success', message: response.message });
            $('#auto_agent_history').html();
            $('#auto_agent_history').modal('hide');
            loadViewsByAction('CallRecording', 'call_recording', '0', '', '304', '1');
        } else {
            $('body').alertMessage({ type: 'error', message: response.message });
        }
    }, '', { "showLoader": true, "type": "form" });

}

function penalty_added_common() {

    //$(document).on('submit', '#dynamic_core_div_penalty form', function(e){

    //e.preventDefault();
    //$(this).find('[type=submit]').prop('disbaled', true);

    var callid = $("#call_id_penalty").val();
    var ptype = $("#ptype").val();
    var amount = $("#amount").val();
    var remarks = $("#remarks").val();
    if (ptype == "") {
        alert("Please select penalty type.");
        return false;
    }

    // $.ajax({
    //     url: __SITE.baseUrl + "service/learn_and_development/add_penalty",
    //     data: { "call_id": callid, "ptype": ptype, "amount": amount, "remarks": remarks },
    //     type: 'post',
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data && data.status == true) {
    //             $('body').alertMessage({ type: 'success', message: data.message });
    //             $('#auto_agent_penalty').html();
    //             $('#auto_agent_penalty').modal('hide');
    //             loadViewsByAction('CallRecording', 'call_recording', '0', '', '304', '1');
    //         } else {
    //             $('body').alertMessage({ type: 'error', message: data.message });
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //         $('body').alertMessage({ type: 'error', message: 'Record have some issue.' });
    //     }
    // });

    var data = {};
    data['roleId'] = $('body').attr('active-role');
    data['call_id'] = call_id;
    data['ptype'] = ptype;
    data['amount'] = amount;
    data['remarks'] = remarks;

    ajax_call('service/learn_and_development/add_penalty', 'POST', data, function(response) {
        if (response && response.status == true) {
            $('body').alertMessage({ type: 'success', message: response.message });
            $('#auto_agent_penalty').html();
            $('#auto_agent_penalty').modal('hide');
            loadViewsByAction('CallRecording', 'call_recording', '0', '', '304', '1');
        } else {
            $('body').alertMessage({ type: 'error', message: response.message });
        }
    }, '', { "showLoader": true, "type": "form" });

    //});
}



function two_level_approval() {

    // var roleId = $('body').attr('active-role');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/learn_and_development/loadRefundRequestList2Level",
    //     data: { "role_id": roleId },
    //     type: "POST",
    //     beforeSend: function() {
    //         $('.data-result-panel').rayanLoaderShow();
    //     },
    //     success: function(data) {
    //         $('.data-result-panel').rayanLoaderHide();
    //         if (data) {
    //             $('.data-result-panel').html(data);
    //         }
    //     },
    //     error: function() {
    //         $('.data-result-panel').rayanLoaderHide();
    //     }
    // });

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/learn_and_development/loadRefundRequestList2Level', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function city_agent_criteria() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/LeadActionController/getCityAgentCriteria', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true });

}

function viewPDFParseData(userId, pdfId) {
    var data = {};
    data['roleId'] = $('body').attr('active-role');
    data['pdf_id'] = pdfId;
    data['user_id'] = userId;

    ajax_call('webv1/pdf_parser/loadViewPDFParserData', 'POST', data, function(response) {
        if (response.status) {
            $('#pdf_parser_data').modal('show');
            $('#pdf_parser_data').html(response.data);
        } else {
            $('body').alertMessage({ type: 'error', message: response.message });
        }
    }, '', { "showLoader": true, "type": "form" });
}

function uploadPDF() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('webv1/pdf_parser/loadViewPDFUploadData', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true });
}


function editAssignedCustomerJs(order_id, cust_id) {
    var roleId = $('body').attr('active-role');
    bookingId = order_id;
    loadPanels();

}

function viewPhleboSelfieJs($log_id) {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/phlebo_image/getPhleboImage/' + $log_id, 'GET', data, function(response) {
        if (response) {
            if (!$("#selfie_wrapper").html()) {
                $('html').append("<div id='selfie_wrapper'></div>");
            }
            $('#selfie_wrapper').html(response);
            $("#phlebo_selfie_modal").modal('show');
        }
    }, '', { "showLoader": true });

    return false;
}

function loadCallRecordFilters(actionId) {
    var roleId = $('body').attr('active-role');
    var oStatus = $('body').attr('order-status');
    var panelName = $('body').attr('panel-main');
    // return $.ajax({
    //     url: __SITE.baseUrl + "service/customer_call_details/get_filters",
    //     data: { "role_id": roleId, "order_status": oStatus, "panel": panelName, "actionId": actionId },
    //     type: "POST",
    //     beforeSend: function() {

    //     },
    //     success: function(data) {

    //         if (data) {
    //             $('.panle-filters').html(data);
    //             loadFilterValues();
    //             get_pre_filter();
    //         }
    //     },
    //     error: function() {

    //     }
    // });

    var data = {};
    data['roleId'] = roleId;
    data['order_status'] = oStatus;
    data['panel'] = panelName;
    data['actionId'] = actionId;

    ajax_call('service/customer_call_details/get_filters', 'POST', data, function(response) {
        if (response) {
            $('.panle-filters').html(response);
            loadFilterValues();
            get_pre_filter();
        }
    }, '', { "showLoader": true });
}

function customer_call_details() {
    var page = 1;
    var roleId = $('body').attr('active-role');
    var actionId = $('body').attr('actionId');
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/customer_call_details/records?per_page   =' + page + '&role_id=' + roleId + '&actionId=' + actionId, 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true });
}

function agent_recordings() {
    var page = 1;
    var roleId = $('body').attr('active-role');
    var actionId = $('body').attr('actionId');
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/customer_call_details/agent_recordings?per_page=' + page + '&role_id=' + roleId + '&actionId=' + actionId, 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true });
}

function download_leads() {
    $("#downloadLeads_modal").modal('show');
    console.log('download----leads');
}


function doctor_consultation_assign() {
    $("#doctor_consultation_assign").modal('show');
}

function loadDoctorConsultationAssignView() {
    loadViewsByAction('DoctorConsultationAssign', 'doctor_consultation_assign', '1');
}

function manage_access() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/grantroles/getRoles', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true });

}

function loadBookingAction(lead_id, dept_id) {
    // loadViewsByAction('CreateOutwardLeadNext', 'create_outward_lead_next', '1');
    // $('body').on('hidden.bs.modal', '#myContractorModal', function() {
    //     loadViewsByAction('DoctorConsultationAssign', 'doctor_consultation_assign', '1');
    // });
    // $('body').on('hidden.bs.modal', '#myContractorModal', function() {
    //     loadViewsByAction('CaptureLead', 'capture_lead', '1');
    // });

    loadViewsByAction('CaptureLead', 'capture_lead', '1');

    $('body').on('hidden.bs.modal', '#capture_lead', function() {
        if (lead_id != '' && dept_id != '') {
            if (dept_id == 3 || dept_id == 2) {
                loadViewsByAction('LeadForm', 'lead_list', '0');
            } else {
                refreshManinPanel();
            }
        } else {
            refreshManinPanel();
        }

    });


}

function show_camp_booking(bookingStr) {
    var data = {};
    data['roleId'] = $('body').attr('active-role');
    data['bookingStr'] = bookingStr;

    ajax_call('service/collection_management/load_camp_booking_list', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true, "type": "form" });
}

function CSprintReportJs(booking_id) {
    var data = {};
    data['roleId'] = $('body').attr('active-role');
    data['ids'] = booking_id;

    ajax_call('service/panel_views/loadViewReportPrint', 'POST', data, function(response) {
        if (response) {
            $('body').find('#actionsView div').detach();
            $('body').find('#actionsView').append("<div>" + response + "</div>");
            var strFun = "report_print";
            var funcCall = strFun + "('" + "" + "');";
            try {
                var ret = eval(funcCall);
            } catch (err) {
                console.log(err);
            }
        } else {
            $('body').alertMessage({ type: 'error', message: response.message });
        }
    }, '', { "showLoader": true });
}

function agent_dashboard(params) {
    var dept = parseInt($("#filter_dept_id").val());
    var departments = [2, 3, 11];
    var roleId = $('body').attr('active-role');
    var post_data = { "role_id": roleId };

    if (params.length > 0) {
        var params = new URLSearchParams(params);
        for (pair of params.entries()) {
            post_data[pair[0]] = pair[1];
        }
    }

    if (true) {

        var data = {};
        data['roleId'] = $('body').attr('active-role');

        ajax_call('service/agent_management/dashboard', 'POST', post_data, function(response) {
            var dashboard_div = '<div id="dashboard_wrapper"></div>';
            if ($('#dashboard_wrapper').attr('id') != 'dashboard_wrapper') {
                $('body').append(dashboard_div);
            }

            $('#dashboard_wrapper').html(response);
            $("#agent_dashboard").modal('show');
            $("#agent_dashboard_custom").modal('show');
        }, '', { "showLoader": true, "type": "form" });


    }
}






/*
    Function : banner_management
    Scope   : This is default landing function to start the banner management.
 */


function banner_management() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/banner_management/load_default_view', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}





// Add New Banner

function bm_add_new_banner() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/banner_management/load_banner_view', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}



// Add New Page Group

function bm_add_new_page_group() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/banner_management/load_page_group_view', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}


function bm_load_banner_sequence(bannergroup) {
    if (bannergroup > 0) {
        var data = {};
        data['roleId'] = $('body').attr('active-role');
        data['banner_group_id'] = bannergroup;

        ajax_call('service/banner_management/load_page_banner_sequence', 'POST', data, function(response) {
            if (response && response.status == 'error') {
                $('body').alertMessage({ type: 'error', message: response.message });
            } else {
                $('.data-result-panel').html(response);
            }
        }, '', { "showLoader": true, "type": "form" });
    }
}

function website_seo() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/seo_crud/getSeoData', 'POST', data, function(response) {
        $("#editseodata").modal('hide');
        $('#insertseomodal').modal('hide');
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });

}

function map_cluster() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/phlebo_management/map_cluster', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function loadDndList() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('dnd/dnd_management/loadDndList', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });

}

function website_crud() {

    $("#editcrudModal").modal('hide');
    $('#insertseomodal').modal('hide');

    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/website_crud/getCrudData', 'POST', data, function(response) {
        $("#editseodata").modal('hide');
        $('#insertseomodal').modal('hide');
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });

}

function landing_page_crud() {
    $("#editLandingcrudModal").modal('hide');
    $('#insertLandingCrudModal').modal('hide');
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/landing_crud_master/getCrudData', 'POST', data, function(response) {
        $("#editLandingcrudModal").modal('hide');
        $('#insertLandingCrudModal').modal('hide');
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function printTRF() {

    var divContents = $("#print_trf").html();
    var printWindow = window.open('', 'Print-Window');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>TRF Details</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(divContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    setTimeout(function() { printWindow.close(); }, 10);


}

function livehealth_bookings() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('liveHealth/livehealth_bookings', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });


}

function campaign_did_permissions() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/campaigndid_master/show_campaign_roles', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });

}



function submit_supervisor_collection() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/accounting/load_submit_supervisor_collection', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
        $("#collection_on_0").datepicker({ maxDate: 0, format: 'dd/mm/yyyy', autoclose: true });
        $("#deposited_on_0").datepicker({ maxDate: 0, format: 'dd/mm/yyyy', autoclose: true });
    }, '', { "showLoader": true });

}


function supervisor_collection() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/accounting/supervisor_collection', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
        $('#cashDepositSupDateRange').daterangepicker();
        $('#selSupDateRange').daterangepicker();
    }, '', { "showLoader": true });

}


function viewCollectionReceipt(colId) {

    var ContentLength = "";
    var ContentType = "";
    var encodeImage = "";
    var collection_id = colId;
    var data = {};
    data['roleId'] = $('body').attr('active-role');
    data['collection_id'] = collection_id;

    ajax_call('service/accounting/show_supervisor_collection_receipt', 'POST', data, function(response) {
        if (response.status && response.data) {
            var col_data = response.data;

            ContentLength = col_data.ContentLength;
            ContentType = col_data.ContentType;
            encodeImage = col_data.encodeImage;

            var $modal = $('#view_supervisor_report_modal');
            var omyFrame = document.getElementById("supervisor_myFrame");
            omyFrame.style.display = "block";
            omyFrame.src = "data:" + ContentType + ";base64, " + encodeImage;
            $modal.modal('show');
            $('.data-result-panel').rayanLoaderHide();
        } else {
            $('.data-result-panel').rayanLoaderHide();
            alert("Receipt is not available");
        }
    }, '', { "showLoader": true });


}


function closeSupervisorViewReport() {
    var $modal = $('#view_supervisor_report_modal');
    $modal.modal('hide');
}


function awb_to_mobile() {
    var data = {};
    data['roleId'] = $('body').attr('active-role', 18);
    getMainActions();
    ajax_call('service/BookingReportDownload/getNumbersbyAWBNumber', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });

}

function bdAllLeads() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/lead_management/bdAllLeads', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function smart_report() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/smartreport/getsmartreport', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function audit_listing() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/audit_management/showauditlist', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function csat_daily_mis_report() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/customer_call_details/get_csat_daily_mis_report', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });


}

function ajax_call($uri, $method, $data, $success, $error, $options) {
    var allowed_methods = ['GET', 'POST'];

    if (allowed_methods.indexOf($method.toUpperCase()) == -1) {
        return false;
    }

    $data = (typeof $data == 'undefined') ? {} : $data;
    $options = (typeof $options == 'undefined') ? {} : $options;
    $type = (typeof $options.type == 'undefined') ? 'json' : $options.type;
    $dataType = (typeof $options.dataType == 'undefined') ? '' : $options.dataType;

    if ($method.toUpperCase() == "POST" && $type == "json") {
        $data = JSON.stringify($data)
    }
    // console.log($options);
    let contentType = ($type == 'json') ? "application/json" : 'application/x-www-form-urlencoded';

    $.ajax({
        url: __SITE.baseUrl + $uri,
        data: $data,
        type: $method.toUpperCase(),
        dataType: $dataType,
        headers: {
            "Content-Type": contentType,
        },
        beforeSend: function() {
            if (typeof $options.showLoader != 'undefined') {
                $('body').rayanLoaderShow();
//                alert();
            }
        },
        success: function(data) {
            if (typeof $options.showLoader != 'undefined') {
                $('body').rayanLoaderHide();
            }

            if (typeof $success == 'function') {
                $success(data)
            }
        },
        error: function(jhr) {
            if (typeof $options.showLoader != 'undefined') {
                $('body').rayanLoaderHide();
            }

            if (typeof $error == 'function') {
                $error(jhr)
            }
        }
    });
}


function action_2() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/customer_call_details/get_csat_daily_mis_report', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function payout_transaction(param, actionId) {
    ajax_call('service/panel_views/loadViewPaytmTransaction', 'get', '', function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function partner_approval(param, actionId) {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/panel_views/loadViewPartnerApproval', 'get', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function partner_invoice(param, actionId) {
    ajax_call('service/panel_views/loadViewPartnerInvoice', 'get', '', function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function phlebo_communication() {
    var $modal = $('#phlebo_comm_form_popup');
    $modal.modal('show');
}

function item_management() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/load_item_kit_management', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function vendor_management() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/inventory_management/load_vendor_management', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function restricted_report() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/restricted_report/loadRestrictedReportList', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            $('.data-result-panel').rayanLoaderHide();
            if (response) {
                $('.data-result-panel').html(response);
            }
        }
    }, '', { "showLoader": true });
}

function totp_qr_code(params) {
    var $modal = $('#topt_qr_code');
    $modal.modal('show');
}


function real_time_status() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/phlebo_management/realTimeStatus', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function special_test() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/special_test', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}


function my_followup() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');
    data['follow_up'] = 1;

    ajax_call('service/booking_management/loadTicketsList', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });


}

function phlebo_forecasting() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('phlebo_forecasting/loadForeCastView', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });

}

function zone_wise_slot() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('phlebo_forecasting/zoneWiseSlot', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function sales_revenue_target() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('sales/target/getList', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function custom_action_handler(unique_name, param) {
    var post_data = {};
    post_data['unique_name'] = unique_name;

    ajax_call("manage/tabs/getActionDetails", "post", post_data, function(data) {
        if (typeof data.action_details != 'undefined') {
            var a = data.action_details;

            loadViewsByAction(a.api_action_name, a.unique_name, a.drill_down, "param=" + param, a.action_id, a.is_dynamic_listing);
        }
    }, '', { showLoader: true });
}

function buy_supplements(params) {
    data['roleId'] = $('body').attr('active-role');
    var params = new URLSearchParams(params);
    for (pair of params.entries()) {
        data[pair[0]] = pair[1];
    }

    ajax_call('service/doctor_management/getSupplements', 'get', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function follow_up_tracker() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/follow_up_tracker/getFollowUps', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function load_dev_new_booking() {
    var roleId = 1;
    var email = 'dewashish@healthians.com';
    var customerName = 'dewashish anand';
    var lead_id = 2351036;
    var state = 26;
    var city_id = 23;
    var gender = 'M';
    var lead_form_load = 1;
    var lead_selected_user = 0;
    var lead_source = 13;
    var lead_cloud_did = '';
    var channel_type = 0;
    var channel_user = 0;
    var age = 29;
    var reffer_by = '';



    $('#lead_activity_and_form').hide();
    var queryStr = {
        "role_id": roleId,
        "email": email,
        "customerName": customerName,
        "lead_id": lead_id,
        "state": state,
        "city_id": city_id,
        "gender": gender,
        "lead_form_load": 1,
        "lead_selected_user": lead_selected_user,
        "lead_source": lead_source,
        "lead_cloud_did": lead_cloud_did,
        "channel_type": channel_type,
        "channel_user": channel_user,
        "age": age,
        "reffer_by": reffer_by
    };

    // $('body').attr('phoneNumber', contact_number);
    $('body').attr('leadId', lead_id);
    return $.ajax({
        url: __SITE.baseUrl + "service/booking_management/load_new_booking_panel",
        data: queryStr,
        type: "POST",
        beforeSend: function() {
            $('.data-result-panel').rayanLoaderShow();
        },
        success: function(data) {
            $('.data-result-panel').rayanLoaderHide();
            if (data) {
                $('.new-booking-by-lead').html(data);
                // $('html,body').animate({
                //     scrollTop: $('body').position().top += 600
                // });
                // $(".dataTable_wrapper").removeAttr('style').css("height","auto");
            }

        },
        error: function() {
            $('.data-result-panel').rayanLoaderHide();
        }
    });

}

function booking_audit() {
    $("#auditRequestModal").modal('show');
}

function sales_tl_mapping() {
    ajax_call('service/team_management/getInboundOutboundTLMapping', 'POST', { test: "test" }, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function pending_cash_list() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('spoc_report/getPendingList', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function subscription_booking() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/subscription_booking_list', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function phlebo_pending_shortfall() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('phlebo_management/phleboShortFallView', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
        $('#selSampleDateRange').daterangepicker();
    }, '', { "showLoader": true });
}

function edit_billing_customer_info() {
    ajax_call('service/edit_customer_info/loadForm', 'GET', {}, function(response) {
        $('body').find('#actionsView div').detach();
        $('body').find('#actionsView').append("<div>" + response + "</div>");
    }, '', { "showLoader": true });
}

function supp_orders(params) {
    ajax_call('service/doctor_management/suppOrders', 'get', [], function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function phlebo_cash_withdraw() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/phlebo_management/phlebo_cash_withdraw', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function coupon_campaign_management() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/coupon_management/loadCampaignCouponEngineList', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });
}

function sticky_sources() {
    ajax_call('service/LeadAjaxController/viewLeadSourceStickyAgents', 'GET', [], function(response) {
        $('.data-result-panel').html(response);
    }, '', { showLoader: true });
}

function cron_predictive_dialer() {
    $('#cronDialer').modal('show');
}


function tele_consultation(front_url, booking_id, login_id) {
    var url = front_url + '/teleconsultation/' + booking_id + '/' + login_id + '/';
    console.log("tele_consultation", url);
    window.open(url, "", "width=800,height=600, left=400, top=200");
    return false;
}

function user_attendance() {
    ajax_call('service/userAttendance/getAttendanceLog', 'GET', [], function(response) {
        $('.data-result-panel').html(response);
    }, '', { showLoader: true });
}

function covid19_drive_verification() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/load_covidDrive', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

function cs_hardcopy_request() {
    var roleId = $('body').attr('active-role', 18);
    getMainActions();
    loadViewsByAction('CsHardcopyRequest', 'cs_hardcopy_request', '0', '', '349', '1', '9');
}

function upload_product_faq() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/ProductManagementController/uploadProductFaq', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function b2b_phlebo_list() {

    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/load_b2bphleboList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

function vdoc_booking() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/booking_management/vdocBookingFrom', 'POST', data, function(response) {
        if (response) {
            if (document.getElementsByTagName('btn_follow_call')) {
                var contact_number = $('#user_number').val();
                var follow_up_id = $('#follow_up_id').val();
            }
            $('.data-result-panel').html(response);
            /*   if (contact_number) {
                   $('#search-customer-val').val(contact_number);
                   $('#search-customer-val').trigger('change');
                   $('#coupon_code_div').append('<input type="hidden" name="follow_up_id" value="' + follow_up_id + '">');
               }*/
        }
    }, '', { "showLoader": true, "type": "form" });
}

function b2bVdocLeadSubmitted(email, contact_number, roleId, customerName, lead_id, state, city_id, gender, calling_number, lead_selected_user, lead_source, lead_cloud_did, channel_type, channel_user, age, reffer_by, clinicUserId, doc_speciality) {

    console.log(lead_id);

    var queryStr = {
        "role_id": roleId,
        "email": email,
        "customerName": customerName,
        "lead_id": lead_id,
        "state": state,
        "city_id": city_id,
        "gender": gender,
        "lead_form_load": 1,
        "lead_selected_user": lead_selected_user,
        "lead_source": lead_source,
        "lead_cloud_did": lead_cloud_did,
        "channel_type": channel_type,
        "channel_user": channel_user,
        "age": age,
        "reffer_by": reffer_by,
        "clinicUserId": clinicUserId,
        "doc_speciality": doc_speciality
    };


    $('body').attr('leadId', lead_id);

    ajax_call('service/booking_management/vdocBookingFrom', 'POST', queryStr, function(response) {
        if (response) {
            if (document.getElementsByTagName('btn_follow_call')) {
                var contact_number = $('#user_number').val();
                var follow_up_id = $('#follow_up_id').val();
            }
            $('.data-result-panel').html(response);
            /*   if (contact_number) {
                   $('#search-customer-val').val(contact_number);
                   $('#search-customer-val').trigger('change');
                   $('#coupon_code_div').append('<input type="hidden" name="follow_up_id" value="' + follow_up_id + '">');
               }*/
        }
    }, '', { "showLoader": true, "type": "form" });
}


function b2b_online_transaction_log() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/common_ctrl/get_b2b_online_transaction_log', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}


function b2b_partner_ledger() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/b2b_partner_management/b2b_partner_ledger', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function drLalBookingList() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');
    ajax_call('drLal/drLalBookingList', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function bioline_bookings() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('bioline/bookingList', 'POST', data, function(response) {


        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });


}


function covid_booking_status_update() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('covid/covidBookingStatusManagement', 'POST', data, function(response) {


        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

function voucher_coupon() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/common_ctrl/get_voucher_coupon_list', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function clinical_history() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/clinical_history/listing', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function covid_cancel_booking() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('covid/covidCancelBookingView', 'POST', data, function(response) {

        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function affiliate_user_data() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/common_ctrl/get_affiliate_user_data_list', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function printTRF_v1() {
    var html = $("#print_trf").html();
    var hiddenFrame = $('<iframe style="display: none"></iframe>').appendTo('body')[0];
    hiddenFrame.contentWindow.printAndRemove = function() {
        hiddenFrame.contentWindow.print();
        $(hiddenFrame).remove();
    };
    var htmlDocument = "<!doctype html>" +
        "<html>" +
        '<body onload="printAndRemove();">' + // Print only after document is loaded
        html +
        '</body>' +
        "</html>";
    var doc = hiddenFrame.contentWindow.document.open("text/html", "replace");
    doc.write(htmlDocument);
    doc.close();
}

function bulk_srf_update() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('covid/bulkSrfUpdateView', 'POST', data, function(response) {

        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function lab_listing() {
   var data = {};
   data['role_id'] = $('body').attr('active-role');

   ajax_call('labmanagement/merchantList', 'POST', data, function(response) {
       if (response) {
           $('.data-result-panel').html(response);
       }
   }, '', { "showLoader": true, "type": "form" });

}


function city_management() {
   var data = {};
   data['role_id'] = $('body').attr('active-role');

   ajax_call('citymanagement/cityList', 'POST', data, function(response) {
       if (response) {
           $('.data-result-panel').html(response);
       }
   }, '', { "showLoader": true, "type": "form" });

}

function bulk_change_lab() {
   var data = {};
   data['role_id'] = $('body').attr('active-role');

   ajax_call('bulkchangelab/bulkchangeLabView', 'POST', data, function(response) {
       if (response) {
           $('.data-result-panel').html(response);
       }
   }, '', { "showLoader": true, "type": "form" });

}

function covid_phlebo() {
   var data = {};
   data['role_id'] = $('body').attr('active-role');

   ajax_call('covidphlebo/covidPhleboList', 'POST', data, function(response) {
       if (response) {
           $('.data-result-panel').html(response);
       }
   }, '', { "showLoader": true, "type": "form" });

}


function insurance_online_transaction_log() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/common_ctrl/get_insurance_online_transaction_log', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

function  agent_booking_cancel_list() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/common_ctrl/get_agent_booking_cancel_list', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function edelweiss_insurance_data() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/common_ctrl/get_edelweiss_insurance_data', 'POST', data, function(response) {
        if (response && response.status == 'error') {
            $('body').alertMessage({ type: 'error', message: response.message });
        } else {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

function covid_payment_upload() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('covid/covidPaymentUploadView', 'POST', data, function(response) {

        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function bulk_covid_booking() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('covid/updateBulkCovidBookingView', 'POST', data, function(response) {


        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

function download_pending_covid_booking() {
   var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('covid/downloadPendingCovidBooking', 'POST', data, function(response) {
        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });

}

function bulk_ticket_close() {
    var data = {};
    data['role_id'] = $('body').attr('active-role');

    ajax_call('service/ticket_management/bulkTicketCloseView', 'POST', data, function(response) {

        if (response) {
            $('.data-result-panel').html(response);
        }
    }, '', { "showLoader": true, "type": "form" });
}

function bookings_with_ucid() {
    var data = {};
    data['roleId'] = $('body').attr('active-role');

    ajax_call('service/BookingReportDownload/getUcidInBookings', 'POST', data, function(response) {
        $('.data-result-panel').html(response);
    }, '', { "showLoader": true });

}
