// JavaScript Document

$(document).ready(function() {
    // Форма обратной связи................................./
    
    var regVr22 = "<div class='messenger_load'>Сообщение обрабатывается...</div><br />";
    
    $("#send").click(function(){
    		$("#loadBar").html(regVr22).show();
    		var posName = $("#posName").val();
            var posTel = $("#posTel").val();
            var radio = $("#radio:checked").val(); 
    		var posEmail = $("#posEmail").val(); 
    		$.ajax({
    			type: "POST",
    			url: "contact.php",
    			data: {"posName": posName, "radio": radio, "posTel": posTel, "posEmail": posEmail},
    			cache: false,
    			success: function(response){
    		var messageResp = "<div class='messenger_send'><span>";
    		var resultStat = ", cпасибо!<span>Ваше сообщение отправлено.</div>";
    		var oll = (messageResp + posName + resultStat);
    				if(response == 1){
                    $("#loadBar").html(oll).fadeIn(3000);
    				$("#posName").val("");
                    $("#posTel").val("");
                    $("#radio:checked").val("");
    				$("#posEmail").val(""); 
    				} else {
    		$("#loadBar").html(response).fadeIn(3000); }
    										}
    		});
    		return false;
    });


});


// owl carousel
$(document).ready(function() {
  
  $("#owl-demo").owlCarousel({
 
      autoPlay: 3000, //Set AutoPlay to 3 seconds
 
      items : 6,
      itemsDesktop : [1199,5],
      itemsDesktopSmall : [991,4],
      itemsTablet: [767,3],
      pagination: false

 
  });
 
});


// tel mask
jQuery(function($){
$("#telephone").mask("+7(999) 999-99-99");
});


// form
 function AjaxFormRequest(result_id,formMain,url) {
 jQuery.ajax({
 url: url,
 type: "POST",
 dataType: "html",
 data: jQuery("#"+formMain).serialize(),
 success: function(response) {
 document.getElementById(result_id).innerHTML = response;
 },
 error: function(response) {
 document.getElementById(result_id).innerHTML = "Возникла ошибка при отправке формы. Попробуйте еще раз";
 }
 });
 
 $(':input','#formMain')
 .not(':button, :submit, :reset, :hidden')
 .val('')
 .removeAttr('checked')
 .removeAttr('selected');
 }
 
 