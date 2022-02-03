//도서 통합 검색 페이지

jQuery(function ($) {
    // const url = "http://localhost:58156/Service1.svc/";
    const url = "http://localhost:59755/WSUforestService.svc/";

    // $(".booklist").append("<li class=\"list1\">안녕</li>");

    //베스트셀러 출력 : 페이지 로딩시 실행
    $(function () {
        fetch(url + "WSU_BookBestSellerList")
            .then(response => response.json())
            .then(data => {
                makeBook(data);
            });
    })

    // 도서 검색
    //on("click") : 버튼 클릭 했을 때 실행되는 함수
    $(".serch-btn").on("click", function () {
        var selectType = $(".serch-value option:selected").val();
        var selectData = $(".serch-text").val();
        if (selectData == "") {
            fetch(url + "WSU_BookBestSellerList")
                .then(response => response.json())
                .then(data => {
                    $("#booklist *").remove("li");
                    $(".pageTitle").text("베스트셀러");
                    makeBook(data);
                });
        } else {
            fetch(url + "WSU_BookSelect/" + selectType + "/" + selectData)
                .then(response => response.json())
                .then(data => {
                    $("#booklist *").remove("li");
                    $(".pageTitle").text("검색 내역 출력");
                    makeBook(data);
                });
        }
    });

    //도서 추가 함수 구현
    function makeBook(book) {
        for (var i = 0; i < book.length; i++) {
            //bookInfo[0] = B_ID 책 아이디
            //bookInfo[1] = type 타입(실제 or 전자책)
            //bookInfo[2] = title 책 제목
            //bookInfo[3] = authors 작가들
            //bookInfo[4] = thumbnail 표지
            var bookInfo = book[i].split("@");

            // 리스트 추가
            $("#booklist").append("<li><a class=\"bookCover c" + [i + 1] + "\" href=\"book_info.html\"></a><div class=\"bookContent\"><div class=\"bookTitle t" + [i + 1] + "\"></div><span class=\"bookAuthor a" + [i + 1] + "\"></span></div></li>");
            
            // 책 표지 추가
            $(".c" + [i + 1]).append("<img src=\"" + bookInfo[4] + "\">");
            
            // 책 제목 추가
            if (bookInfo[1] == "real") {
                //실제책
                $(".t" + [i + 1]).append("<a href=\"book_info.html\">" + bookInfo[2] + "</a>");
            } else {
                //전자책
                $(".t" + [i + 1]).append("<a href=\"book_info.html\">" + bookInfo[2] + " [전자책]</a>");
            }
            
            // 책 저자명 추가
            $(".a" + [i + 1]).text(bookInfo[3]);
        }
    }
});