
// 검색 함수
jQuery(function ($) {
    // keyup : 키보드를 눌렀다 땔때 실행되는 함수
    $('.serch-text').keyup(function (event) {
        var val = $(this).val();
        //
        $('.serch-btn').on('click', function () {
            if (val == "") {
                $('.booklist li').show();
            } else {
                $('.booklist li').hide();
                $(".booklist li:contains('" + val + "')").show();
            }
        });
    });
});
