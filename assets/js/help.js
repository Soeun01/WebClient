// 이용 안내 탭

$(document).ready(function(){
   
    $('.tabs li').click(function(){
      var tab_id = $(this).attr('data-tab');
   
      $('.tabs li').removeClass('current');
      $('.tab-content').removeClass('current');
   
      $(this).addClass('current');
      $("#"+tab_id).addClass('current');
    })
   
  })