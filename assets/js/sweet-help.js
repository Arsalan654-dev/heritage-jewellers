/* source: assets/js/sweet-help-2ba772a8-2.js */
/* eslint-disable */
"use strict";
function sweetHelpLoadScript(onJQueryLoad) {

    if (typeof (jQuery) == 'undefined' || !jQuery.ajax) {
        (function () {
            // Load jquery script if doesn't exist
            var script = document.createElement("SCRIPT");
            script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js';
            script.type = 'text/javascript';
            script.onload = onJQueryLoad;
            document.head.appendChild(script);
        })();
    } else {
        onJQueryLoad()
    }

}

function sweetHelpInitCss(e) {
    if(document.getElementById("sweet-help-css")){
        e();
        return;
    }
    var t = document.createElement("link");
    const date = new Date();
    t.setAttribute("rel", "stylesheet"),
        t.setAttribute("type", "text/css"),
        (t.onload = e),
        t.setAttribute("href", "https://appV2.sweethelp.io/sweet-help.css");
    document.head.appendChild(t);
}

function sweetHelpBtnLoad(){
    const BASE_URL = 'https://appV2.sweethelp.io';
    const path = window.location.pathname;
    const currentPath = window.location.href;
    function sweetHelpShopId() {
        if (window.Shopify != undefined) {
            return window.Shopify.shop
        }
        var domain;
        var url = window.location.href
        if (url.indexOf("://") > -1) {
            domain = url.split('/')[2];
        } else {
            domain = url.split('/')[0];
        }
        domain = domain.split(':')[0];
        return domain;
    }
    var shop_id = sweetHelpShopId();
    localStorage.removeItem("chkevnt");

    function sweetHelpGetCurrentTime(){
        var d = new Date();
        return d.getTime();
    }
    function sweetHelpMobileCheck() {
        var e = !1;
        return ! function(t) {
            (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0)
        }(navigator.userAgent || navigator.vendor || window.opera), e;
    }
    function sweetHelpDeviceType() {
        if (sweetHelpMobileCheck()) {
            return 1;
        } else {
            return 2;
        }
    }

    function sweetHelpWhatsappLink(phone, message, current_device_type) {
        var link = ""
        var IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (current_device_type == 2) {
            link = "https://web.whatsapp.com/send?text=" + message
        } else if(current_device_type == 1 && !IOS) {
            link = "whatsapp://send?text=" + message
        } else if(current_device_type == 1 && IOS) {
            link = "https://api.whatsapp.com/send?text=" + message
        }
        if(phone) {
            //added by TS 22062022
            phone=phone.replace(/ |-/g, "")
            link += "&phone=" + phone
        }
        return link
    }
    function sweetHelpIsCollectionsPage() {
        if ((window.location.pathname.match("(.*)/collections/(.*)") || window.location.pathname.match("(.*)/collections")) && !(window.location.pathname.match("(.*)/products/(.*)") || window.location.pathname.match("(.*)/products"))) {
            return true
        } else {
            return false
        }
    }
    function sweetHelpIsCartPage() {
        if ((window.location.pathname.match("(.*)/cart/(.*)") || window.location.pathname.match("(.*)/cart"))) {
            return true
        } else {
            return false
        }
    }
    function sweetHelpIsOrdersPage() {
        if ((window.location.pathname.match("(.*)/orders/(.*)") || window.location.pathname.match("(.*)/orders") || window.location.pathname.match("(.*)/checkouts/(.*)"))) {
            return true
        } else {
            return false
        }
    }
    function sweetHelpIsBlogsPage() {
        if ((window.location.pathname.match("(.*)/blogs/(.*)") || window.location.pathname.match("(.*)/blogs"))) {
            return true
        } else {
            return false
        }
    }
    function sweetHelpIsGlobalPage() {
        if ((window.location.pathname.match("(.*)/pages/(.*)") || window.location.pathname.match("(.*)/pages"))) {
            return true
        } else {
            return false
        }
    }
    function sweetHelpIsAccountPage() {
        if ((window.location.pathname.match("(.*)/account/(.*)") || window.location.pathname.match("(.*)/account"))) {
            return true
        } else {
            return false
        }
    }
    function sweetHelpIsThankYouPage() {
        if (window.location.pathname.match("(.*)/orders/(.*)") || window.location.pathname.match("(.*)/checkouts/(.*)")) {
            return true
        } else {
            return false
        }
    }
    function sweetHelpIsProductYouPage() {
        if ((window.location.pathname.match("(.*)/products/(.*)") || window.location.pathname.match("(.*)/products"))) {
            return true
        } else {
            return false
        }
    }
    function sweetHelpIsCheckoutPage(){
        if ((window.location.pathname.match("(.*)/checkouts/(.*)") || window.location.pathname.match("(.*)/checkouts"))) {
            return true
        } else {
            return false
        }
    }
    function sweetHelpIsWhatsAppBtnVisible(settings) {
        var wpnl;
        var wpn;
        wpnl=window.location.pathname.length;
        if(wpnl>1 && wpnl <=4){
            wpn=window.location.pathname.substring(0,3);
        }else{
            wpn=window.location.pathname;
        }

        if ((window.location.pathname === "/"
             ||wpn === "/ar"
             ||wpn === "/es"
             ||wpn === "/en"
             ||wpn === "/fr"
             ||wpn === "/it"
             ||wpn === "/nl"
             ||wpn === "/de"
             )
        && settings.home_page === "home_page"){
            return true;
        }
        if (sweetHelpIsCollectionsPage() &&  settings.collections === "collections") {
            return true;
        }
        if (sweetHelpIsProductYouPage() &&  settings.product_pages === "product_pages") {
            return true;
        }
        if (sweetHelpIsCartPage() && settings.cart_page === "cart_page") {
            return true;
        }
        if (sweetHelpIsOrdersPage() &&  settings.thank_you_page === "thank_you_page") {
            return true;
        }
        if (sweetHelpIsBlogsPage() &&  settings.blog_page === "blog_page") {
            return true;
        }
        if (sweetHelpIsGlobalPage() &&  settings.url_ending_with === "url_ending_with") {
            return true;
        }
        if (sweetHelpIsAccountPage() &&  settings.account_page === "account_page") {
            return true;
        }
    }

    function sweetHelpIsWhatsAppShareVisible(share) {
        var wpnl;
        var wpn;

        wpnl=window.location.pathname.length;
        if(wpnl>1){
            wpn=window.location.pathname.substring(0,3);
        }else{
            wpn=window.location.pathname;
        }

        if ((window.location.pathname === "/"
             ||wpn === "/ar"
             ||wpn === "/es"
             ||wpn === "/en"
             ||wpn === "/fr"
             ||wpn === "/it"
             ||wpn === "/nl"
             ||wpn === "/de"
             )
        && share.home_page === "home_page") {
            return true;
        }
        if (sweetHelpIsCollectionsPage() &&  share.collections === "collections") {
            return true;
        }
        if (sweetHelpIsProductYouPage() &&  share.product_pages === "product_pages") {
            return true;
        }
        if (sweetHelpIsCartPage() && share.cart_page === "cart_page") {
            return true;
        }
        if (sweetHelpIsOrdersPage() &&  share.thank_you_page === "thank_you_page") {
            return true;
        }
        if (sweetHelpIsBlogsPage() &&  share.blog_page === "blog_page") {
            return true;
        }
        if (sweetHelpIsGlobalPage() &&  share.url_ending_with === "url_ending_with") {
            return true;
        }
        if (sweetHelpIsAccountPage() &&  share.account_page === "account_page") {
            return true;
        }
    }

    function sweetHelpGetTargetButton(target) {
        if (!target) {
            return null
        } else if (target.tagName == "BUTTON") {
            return target
        }else if (target.tagName == "INPUT" && target.type == "submit") {
            return target
        } else if (jQuery(target).closest('button')) {
            return jQuery(target).closest('button')[0]
        }
    }
    function sweetHelpGetTargetAhref(target) {
        if(!target) {
            return null
        } else if (target.tagName == "A") {
            return target
        } else if (jQuery(target).closest("a")) {
            return jQuery(target).closest("a")[0]
        }
    }
   /* function sweetHelpLoadOptPopup(data, dismiss){
        var html = `<div id="sweetHelpModal" class="sweetHelpModal sweet-help-confirm-box">
                      <div class="sweethelp-updates-popup"><div class="sweethelp-popup-body"><span class="sweethelp-chatbox-close">X</span><h5>${data.text.headline ? data.text.headline : "Add your phone number to receive updates"}</h5>
                      <div class="sweethelp-modal-content"><div><ul><li> <img src="assets/images/modal-icon-one-e51c459b.png" alt="">${data.text.cart ? data.text.cart : "Order details"}</li>
                      <li> <img src="assets/images/modal-icon-two-6f5c6298.png" alt="">${data.text.shipping ? data.text.shipping : "Shipping details"}</li>
                      <li> <img src="assets/images/modal-icon-three-90b6ef21.png" alt="">${data.text.support ? data.text.support : "Customer support"}</li></ul></div>
                      <div class="sweethelp-modal-info-image"><img src="${data.text.image ? data.text.image : "assets/images/EN_PHONE-f35a0062.png"}" alt=""></div></div>
                      <div class="sweethelp-form-box-area"<div class="sweet-help-form-area">
                      <div class="sweethelp-form-box"><input type="number" class="sweethelp-form-control sweethelp-text-fild" id="sweethelp_optin_country_code" value="${(data.country_code ?data.country_code : 1 )}" placeholder="+${(data.country_code ?data.country_code : 1 )}">
                      <input type="number" class="sweethelp-form-control text-fild" id="sweethelp_optin_phone_number" placeholder="8794561320"></div>
                      <button class="sh-optin-widget-confirm-btn" id="sh-optin-widget-confirm-btn">${data.text.button ? data.text.button : "ACCEPT"}</button></div></div></div></div>
                    </div>`

        $( document ).ajaxComplete(function( event, request, settings ) {
            $('body').find("[tabindex='-1']").removeAttr('tabindex')
        });
        document.body.insertAdjacentHTML('beforeend', html);
    }
*/

    function sweetHelpAnalytics(from, shop_id){
        jQuery.ajax({
            type: "POST",
            url: BASE_URL+ "/api/shop/analytics/v1",
            headers: {"X-Shopify-Access-Token": "PRIVATEAPPTOKEN"},
            crossDomain: true,
            data: { from: from, shop_id: shop_id }
        })
            .done(function( msg ) {
            });
    }
    function sweetHelpClickAgent(phone, message, device, from){
        var link = '';
        if (from === 'chat'){
            link =  sweetHelpWhatsappLink(phone, message, device)
        }
        else if (from === 'share'){
            link =  sweetHelpWhatsappLink(false, message, device)
        }
        window.open(link);
        sweetHelpAnalytics(from, shop_id)
    }

    function sweetHelpIsTrue(val){
        return val === 1;
    }
    function sweetHelpSetCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    function sweetHelpGetCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    function sweetHelpShowCallOut(device, time, text){
        var id =  $("#sweet-help-chat-box");
        var htmlCallOut = `<div class="sweethelp-callout"><span id="closeCallout">X</span><p>${text}</p></div>`;
        id.prepend(htmlCallOut);
        setTimeout(function() {
            $('.sweethelp-callout').show();
            sweetHelpSetCookie('sh_call_out_popup_time', sweetHelpGetCurrentTime(), 1)
        }, time);

    }
    function sweetHelpShuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    function sweetHelpWhatsAppWidgetClass(val){
        if (val === 2){return "sweet-help-chatbox-one";}
        else if (val === 3){return "sweet-help-chatbox-two";}
        else if (val === 4){return "sweet-help-chatbox-three";}
        else{return ""}
    }
    function sweetHelpGetCountryCode(success){
        $.getJSON('assets/images/iso_code-b64a81f8.json', function(data) {
            success(data);
        })
    }

    function sweetHelpMakeWhatsappButton(data){

        var current_device_type = sweetHelpDeviceType()
        //console.log(current_device_type);
        var phone = data.phone != undefined && data.phone != null ? data.phone : null,
            setting = data.settings != undefined && data.settings != null ? data.settings : null;

        if (setting && setting.is_chat_enabled  && setting.selected_button != null && (setting.button_display_type && current_device_type) !== 0 && sweetHelpIsWhatsAppBtnVisible(setting.page)){
            var ifWidgetUnavailable = '';
            let mobilePosition = setting.button_display_position_mobile === 2 ? "sweethelp-wa-share-btn-pos-right" : "sweethelp-wa-share-btn-pos-left" ;
            let justifyContent = setting.button_display_position_mobile === 2 ? "sweethelp-justify-content-right" : "sweethelp-justify-content-left" ;
            let desktopPosition = setting.button_display_position_desktop === 2 ? "sweethelp-wa-share-btn-pos-right" : "sweethelp-wa-share-btn-pos-left" ;
            let leftRightPositionMobile =  setting.button_display_position_mobile === 2 ? "right" : "left" ;
            let leftRightPositionDesktop =  setting.button_display_position_desktop === 2 ? "right" : "left" ;

            let hideDesktop = setting.button_display_type === 1 && current_device_type === 2 ? "sweethelp-hide-wp-share-button" : (setting.button_display_type === 3 && current_device_type === 1 ? "sweethelp-hide-wp-share-button" :"" )
            let backgroundColor = setting.chat_bg_type === 1 ? 'style="background-color: '+ setting.chat_bg_one +' "': 'style="background-image: linear-gradient(110.56deg, '+setting.chat_bg_one+' 0%, '+setting.chat_bg_two+')"';
            let backgroundColorWidget = setting.widget_bg_color_type === 1 ? 'style="background-color: '+ setting.widget_bg_one +' "': 'style="background-image: linear-gradient(110.56deg, '+setting.widget_bg_one+' 0%, '+setting.widget_bg_two+')"';

            let chatHeightDesktop = setting.height_offset_desktop != null ? setting.height_offset_desktop : '';
            let chatEdgeDesktop =  setting.edge_offset_desktop != null ? setting.edge_offset_desktop : '';
            let chatHeightMobile = setting.height_offset_mobile != null ? setting.height_offset_mobile : '';
            let chatEdgeMobile = setting.edge_offset_mobile != null ? setting.edge_offset_mobile : '';

            let HTML = `<div id="sweet-help-chat-box" class="sweet-help-chat-box ${hideDesktop} ${current_device_type === 1 ? mobilePosition : desktopPosition}" style="bottom: ${current_device_type === 1 ? chatHeightMobile : chatHeightDesktop}px; ${current_device_type === 1 ? leftRightPositionMobile : leftRightPositionDesktop}: ${current_device_type === 1 ? chatEdgeMobile : chatEdgeDesktop}px">`

            if((phone && setting.is_widget_enabled) || (!phone && setting.show_chat_button_agent_offline)){
                HTML += `<div id="sweet-help-chat-chatbox-open" class="sweet-help-chat-chatbox-popup sweet-help-is-visible sweet-help-chat-chatbox-open sweethelp-chatbox-open ${hideDesktop}" >`;
                HTML += `<div id="sweet-help-chat-chatbox-popup" class="sweethelp-chatbox-popup sweet-help-tmplinput ${current_device_type === 1 ? mobilePosition : desktopPosition} ${sweetHelpWhatsAppWidgetClass(setting.widget_design_type)}" style="bottom: ${current_device_type === 1 ? chatHeightMobile : chatHeightDesktop}px; ${current_device_type === 1 ? leftRightPositionMobile : leftRightPositionDesktop}: ${current_device_type === 1 ? chatEdgeMobile : chatEdgeDesktop}px"><div class="sweet-help-wa-chat-bubble-header-common" ${backgroundColorWidget}>`; //${backgroundColorWidget}
                HTML += `<span class="sweet-help-chatbox-close"></span><div class="sweet-help-wa-chat-bubble-header-title" style="color: ${setting.widget_heading_color};">${setting.widget_title}</div>`;
                HTML += `<div class="sweet-help-wa-chat-bubble-header-desc" style="color: ${setting.widget_description_color};">${setting.widget_helper_text}</div></div>`;
                HTML += `<div class="sweet-help-wa-chat-bubble-body">${setting.widget_design_type == 4 ? "<div class='sweethelp-box-four-class' "+backgroundColorWidget+"></div>" : ""}<div class="sweet-help-wa-chat-bubble-body-over-lap"><div class="sweet-help-scroll-bar">`;

                if (phone && setting.is_store_online && setting.is_widget_enabled){
                    let agentsweetHelpShuffle = sweetHelpShuffle(phone);
                    for (let i =0; i < agentsweetHelpShuffle.length; i++) {
                        if (phone[i].is_enabled !== 0) {
                            var agentPhone = phone[i].country_code + phone[i].ph_number
                            var message = setting.chat_button_body + (sweetHelpIsTrue(setting.is_include_url) ? " " + currentPath : "" );
                            HTML += `<div onClick="sweetHelpClickAgent('${agentPhone}', '${message}', '${current_device_type}', 'chat')" target="_blank" class="sweet-help-profile-box">`;
                            HTML += `<div class="sweet-help-dp-image"><img class="" src="${phone[i].avatar_src}" alt="Friendly avatar agent on Whatsapp: professional cartoon with dark hair, headset, suit, smiling and pointing to chat icon for assistance"></div>`;
                            HTML += `<div class="sweet-help-wa-chat-bubble-cs-profile"><div class="sweet-help-wa-chat-bubble-profile-name">${phone[i].agent_name}</div><p>${phone[i].agent_role ? phone[i].agent_role : ""}</p></div></div>`;
                        }
                    }
                }else{
                    HTML += `<p class="sweethelp-offline-display-message" style="padding: 35px 15px;">${setting.offline_agent_msg ? setting.offline_agent_msg : "All of our store agents are offline now."}</p>`;
                }
                HTML += `</div></div></div><div class="sweet-help-wa-chat-widget-footer">`;

                // if (setting.show_copyright === 1){
                //     HTML += `<a href="https://sweethelp.io">Powered by<span style="color: ${setting.widget_bg_one}"> SweetHelp</span></a>`;
                // }

                HTML += `</div></div></div>`;
            }

            if (!setting.is_widget_enabled && phone){
                let agentPhone = phone[0].country_code + phone[0].ph_number;
                let message1 = setting.chat_button_body + (sweetHelpIsTrue(setting.is_include_url) ? " " + currentPath : "" );
                ifWidgetUnavailable = `onClick="sweetHelpClickAgent('${agentPhone}', '${message1}', '${current_device_type}', 'chat')"`;
            }

            if (setting.show_chat_button_agent_offline || phone || setting.is_widget_enabled || setting.is_chat_enabled){

                HTML += `<div class="sweethelp-chat-button-area" ${ifWidgetUnavailable}>`;
                if (setting.selected_button === 1){
                    HTML += `<div class="sweethelp-wa-custom-chat-btn size-small ${justifyContent} " ${backgroundColor}><div class="sh-wp-button-align">`;
                    HTML += `<div class="sweethelp-wa-custom-icon" style="background: ${setting.chat_icon_color}"></div>`;
                    HTML += `<div class="sweethelp-pl-2" style="color: ${setting.chat_button_color};"> ${setting.chat_button_text}</div></div></div>`;
                }else if(setting.selected_button === 2){
                    HTML += `<div class="sh-wp-button-align"><div class="sweethelp-wa-custom-circle-chat-btn " ${backgroundColor}>`;
                    HTML += `<div class="sweethelp-wa-custom-icon" style="background:${setting.chat_icon_color}"></div></div></div>`;
                }else if(setting.selected_button === 3){
                    HTML += `<div class="sweethelp-d-flex sweethelp-align-items-center ${justifyContent}"><div class="sh-wp-button-align"><div class="sweethelp-wa-chat-button-cta-text" style="color:  ${setting.chat_button_color};"> ${setting.chat_button_text}</div>`;
                    HTML += `<div class="sweethelp-wa-custom-circle-chat-btn" ${backgroundColor}><div class="sweethelp-wa-custom-icon" style="background: ${setting.chat_icon_color};"></div></div></div></div>`;
                }else if(setting.selected_button === 4){
                    HTML += `<div class="sweethelp-d-flex sweethelp-align-items-center ${justifyContent}"><div class="sh-wp-button-align"><div class="sweethelp-wa-custom-circle-chat-btn" ${backgroundColor}><div class="sweethelp-wa-custom-icon" style="background: ${setting.chat_icon_color};"></div></div>`;
                    HTML += `<div class="sweethelp-wa-chat-button-cta-text" style="color:  ${setting.chat_button_color};"> ${setting.chat_button_text}</div></div></div>`;
                }
                HTML += `</div>`;

            }
            document.body.insertAdjacentHTML('beforeend', HTML);


        }

        if (setting && sweetHelpIsTrue(setting.is_callout) && !sweetHelpGetCookie('sh_call_out_popup_time')){
            sweetHelpShowCallOut(current_device_type, setting.call_out_time, setting.call_out_text);
        }
    }

    function sweetHelpWhatsappShareButton(data){

        let shareData = data !=undefined && data != null && data != "" ? data : null
        var current_device_type = sweetHelpDeviceType()

        if ( shareData != null && (current_device_type) !== 0 && sweetHelpIsWhatsAppShareVisible(shareData.page)  && shareData.is_share_enabled == 1){
            let mobilePosition = shareData.button_display_position_mobile === 2 ? "sweethelp-wa-share-btn-pos-right" : "sweethelp-wa-share-btn-pos-left" ;
            let desktopPosition = shareData.button_display_position_desktop === 2 ? "sweethelp-wa-share-btn-pos-right" : "sweethelp-wa-share-btn-pos-left" ;
            let hideDesktop = shareData.button_display_type === 1 && current_device_type === 1 ? "sweethelp-hide-wp-share-button" : (shareData.button_display_type === 0 && current_device_type === 2 ? "sweethelp-hide-wp-share-button" : "")
            var message = shareData.share_button_body + (sweetHelpIsTrue(shareData.is_include_url) ? " " + currentPath : "" );
            let backgroundColor = shareData.share_bg_type === 1 ? 'style="background-color: '+ shareData.share_bg_one +' "': 'style="background-image: linear-gradient(110.56deg, '+shareData.share_bg_one+' 0%, '+shareData.share_bg_two+')"';
            let shareHtml = `<div class="${hideDesktop}" style="cursor: pointer" onClick="sweetHelpClickAgent('${false}', '${message}', '${current_device_type}', 'share')" target="_blank">
                               <div class="sweethelp-wa-share-btn-container ${current_device_type === 1 ? mobilePosition : desktopPosition}" ${backgroundColor}>
                                <p class="sweethelp-wa-share-btn-cta" style="color: ${shareData.share_button_color}">${shareData.share_button_text}</p>
                                <div class="sweethelp-wa-share-btn-img sweethelp-wa-share-icon sweethelp-wa-share-mask" style="background: ${shareData.share_icon_color}"></div></div></div>`
            document.body.insertAdjacentHTML('beforeend', shareHtml);
        }
    }

    /*function sweetHelpOrderData(BASE_URL, shop_id, countryCode, phone){
        jQuery.ajax({
            url: BASE_URL + "/api/shop/order/v1", //+un(document.location.hostname)
            type: "GET",
            headers: {"X-Shopify-Access-Token": "PRIVATEAPPTOKEN"},
            crossDomain: true,
            data:{
                orderId: Shopify.checkout.order_id,
                shop: shop_id,
                phone: phone,
                country_code: countryCode
            },
        });
    }
*/

    if (!window.sweet_help_whatsapp_init) {
        window.sweet_help_whatsapp_init = true
        sweetHelpFetchStoreSettings(shop_id, function (data) {
            window.sweetHelpClickAgent = sweetHelpClickAgent
            sweetHelpMakeWhatsappButton(data)
            sweetHelpWhatsappShareButton(data.share)
            /*if (data.optin) {
                document.body.addEventListener('click', function (e) {
                    const button = sweetHelpGetTargetButton(e.target)
                    let getButton = localStorage.getItem("chkevnt");
                    const checkout_ahref = sweetHelpGetTargetAhref(e.target)
                    const closest_form = button && button.getAttribute("type") === "submit" ? jQuery(button).closest('form') : null
                    let checkIfOptin = sweetHelpGetCookie('__swhelp_optin_popup_close_time');
                    let checkOptinAccept = sweetHelpGetCookie('__swhelp_optin_accept_time');
                    if (data.optin && !checkOptinAccept && !checkIfOptin && button && button.getAttribute('data-testid') && button.getAttribute('data-testid') === 'Checkout-button' && !getButton) {
                        if (data.optin) {
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            sweetHelpLoadOptPopup(data.optin)
                        }
                        localStorage.setItem("chkevnt", button.getAttribute('class'));
                    } else if (data.optin && !checkOptinAccept && !checkIfOptin && !getButton &&
                        ((button && button.getAttribute('name') === 'checkout' || button && button.getAttribute('onclick') === "window.location='/checkout'") ||
                            (e.target && e.target.name === 'checkout' && e.target.tagName === "INPUT") ||
                            (checkout_ahref && checkout_ahref.getAttribute("href") === "/checkout") ||
                            (closest_form && closest_form.attr("action") === "/checkout") ||
                            (closest_form && closest_form.attr("action") === "/cart"))) {
                        if (data.optin) {
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            sweetHelpLoadOptPopup(data.optin)
                        }
                        localStorage.setItem("chkevnt", button.getAttribute('class'));
                    } else if (data.optin && !checkOptinAccept && !checkIfOptin && button && button.getAttribute('data-testid') !== 'Checkout-button' &&
                        closest_form && closest_form.attr('action') === "/cart/add" && !getButton) {
                        if (data.optin) {
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            sweetHelpLoadOptPopup(data.optin)
                        }
                        localStorage.setItem("chkevnt", button.getAttribute('class'));
                    }
                }, true)
            }*/
        })

       /* jQuery(document).on('click', '#sh-optin-widget-confirm-btn', function(e) {
            var modal = document.getElementById("sweetHelpModal");
            let button = localStorage.getItem("chkevnt");
            var allClasses = jQuery("[class*='"+button+"']");
            var countryCode = jQuery("#sweethelp_optin_country_code").val()
            var phone =  jQuery("#sweethelp_optin_phone_number").val();
            if(!phone || phone.replace(/ /g,'').length < 6) {
                alert("Please enter a valid phone number")
                return
            }
            if (!countryCode){
                alert("Please enter a valid Country Code")
                return
            }
            if (phone && countryCode) {
                let makePhone = countryCode.toString() + phone.toString();
                jQuery.ajax({
                    url: BASE_URL + "/api/shop/optin/v1",
                    type: 'POST',
                    headers: {"X-Shopify-Access-Token": "PRIVATEAPPTOKEN"},
                    crossDomain: true,
                    data: {
                        "shop_name": shop_id,
                        "country_code": countryCode.toString(),
                        "phone": makePhone,
                        "url" : document.location.href,
                    }
                });
                // if (allClasses.length > 0){
                localStorage.setItem("__swhelp_opted_in_phone", makePhone);
                localStorage.setItem("__swhelp_opted_in_country_code", countryCode.toString());
                sweetHelpSetCookie('__swhelp_optin_accept_time', sweetHelpGetCurrentTime(), 1)
                sweetHelpSetCookie('__swhelp_opted_in_phone', makePhone, 1)
                modal.remove();
                allClasses.click();
                // }
            }
        });
        */
      /*  if (sweetHelpIsOrdersPage()){
            let localPhone = localStorage.getItem('__swhelp_opted_in_phone')
            let country_code = localStorage.getItem('__swhelp_opted_in_country_code')
            let phone = localPhone ? localPhone : sweetHelpGetCookie('__swhelp_opted_in_phone');
           // sweetHelpOrderData(BASE_URL, shop_id, country_code, phone)
        }
        */
    }


    function sweetHelpFetchStoreSettings(shop_id, success_callback) {
        jQuery.ajax({
            url: BASE_URL + "/api/shop/settings/v1/"+shop_id,
            type: 'GET',
            headers: {
                "X-Shopify-Access-Token": "PRIVATEAPPTOKEN",
                'Content-Type': 'application/json'
            },
            crossDomain: true,
            success: function (data) {
                success_callback(data)
            }
        });
    }

    jQuery(document).on("click", ".sweethelp-chat-button-area, .sweethelp-callout", function (e) {
        e.stopImmediatePropagation()
        jQuery(".sweet-help-chat-chatbox-popup").toggle('scale')
        jQuery('.sweethelp-callout').remove();
        // jQuery(".sweethelp-chat-button-area").hide()

    })
    jQuery(document).on("click", ".sweet-help-chatbox-close", function (e) {
        e.stopImmediatePropagation()
        jQuery(".sweet-help-chat-chatbox-popup").toggle('scale')
        // jQuery(".sweethelp-chat-button-area").show()
    })
    jQuery(document).keyup(function(e) {
        if (e.key === "Escape") {
            jQuery(".sweet-help-chat-chatbox-popup").hide()
        }
    });
    jQuery(document).on("click",".sweethelp-chatbox-close", function (e) {
        e.stopImmediatePropagation()
        sweetHelpSetCookie('__swhelp_optin_popup_close_time', sweetHelpGetCurrentTime(), 1)
        jQuery("#sweetHelpModal").remove()
    }).click()

    jQuery(document).on("click","#closeCallout", function (e) {
        e.stopImmediatePropagation()
        jQuery(this).parent('.sweethelp-callout').remove();
        sweetHelpSetCookie('sh_callout_removed_data', sweetHelpGetCurrentTime(), 1)
    })

    jQuery(document).on('click', '.sweetHelpclose', function (e) {
        // debugger
        e.stopPropagation();e.stopImmediatePropagation();
        let button = localStorage.getItem("chkevnt");
        var allClasses = jQuery("[class*='"+button+"']");
        if (allClasses.length > 0){
            jQuery(document).find('#sweetHelpModal').hide();
            allClasses.click();
        }
    })
}
(function () {
    sweetHelpLoadScript(function () {
        sweetHelpInitCss(function () {
            sweetHelpBtnLoad()
        });
    });
})();

