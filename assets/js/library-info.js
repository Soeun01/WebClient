
// 검색 함수
jQuery(function ($) {
    // const url = "http://localhost:58156/Service1.svc/";
    const url = "http://localhost:59755/WSUforestService.svc/";

    // $(".booklist").append("<li class=\"list1\">안녕</li>");

    // keyup : 키보드를 눌렀다 땔때 실행되는 함수
    $(".serch-text").keyup(function (event) {
            var val = $(this).val();        

        //on("click") : 버튼 클릭 했을 때 실행되는 함수
        $(".serch-btn").on("click", function () {
            if (val == "") {
                $(".booklist li").show();
            } else {
                $(".booklist li").hide();
                $(".booklist li:contains(\"" + val + "\")").show();
            }
        });
    });

    

});