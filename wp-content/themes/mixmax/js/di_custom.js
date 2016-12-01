// grupovie inputi (nomer telefona v forme))
	jQuery(function($)
	{
		$('.NumGroup').groupinputs();
	});


//
jQuery(function($){
   $("#Number3").mask("999-99-99");
   });
   
   
// plavnui scroll do yakorya
jQuery(document).ready(function($){
	$(".di_header").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),

		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		
		//анимируем переход на расстояние - top за 1000 мс
		$('body,html').animate({scrollTop: top}, 1000);
	});
});