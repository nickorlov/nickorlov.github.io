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
		//�������� ����������� ��������� ������� �� ������
		event.preventDefault();

		//�������� ������������� ���� � �������� href
		var id  = $(this).attr('href'),

		//������ ������ �� ������ �������� �� ����� �� ������� ��������� �����
			top = $(id).offset().top;
		
		//��������� ������� �� ���������� - top �� 1000 ��
		$('body,html').animate({scrollTop: top}, 1000);
	});
});