// 도서 대출 목록 페이지

jQuery(function ($) {
    // const url = "http://localhost:58156/Service1.svc/";
    const url = "http://localhost:59755/WSUforestService.svc/";

    //도서 대출 목록 출력 : 페이지 로딩시 실행
    $(function () {
        //쿠키에 사용자 이름 가져오기
        var cookieCheck = $.cookie("userId");

        fetch(url + "WSU_BookCheckOutList/" + cookieCheck)
            .then(response => response.json())
            .then(data => {
                var book = data[0].split("@");
                console.log(book);
                // $("#booklist").append("도서");
                makeRentalBook(data);
            });
    })

    //도서 추가 함수 구현
    function makeRentalBook(book) {
        for (var i = 0; i < book.length; i++) {
            //bookInfo[0] = W_ID 유저 아이디
            //bookInfo[1] = B_ID 책 아이디
            //bookInfo[2] = type 타입(실제 or 전자책)
            //bookInfo[3] = title 책 제목
            //bookInfo[4] = rentaldate 대출 날짜
            //bookInfo[5] = returndate 반납 예정일
            //bookInfo[6] = renewcount 반납 연장 횟수
            //bookInfo[7] = overduedays 연체일
            var bookInfo = book[i].split("@");

            // 리스트 추가
            $("#booklist").append("<li><a class=\"bookCover c" + (i + 1) + "\" href=\"book_detail.html\"></a><div class=\"bookContent\"><div class=\"bookTitle t" + (i + 1) + "\"></div><span class=\"bookAuthor a" + (i + 1) + "\"></span></div><div class=\"returnAndRenew\"><div class=\"rentalDate d" + (i + 1) + "\"></div><div class=\"bookReturnBtn rt" + (i + 1) + "\"></div><div class=\"bookRenewBtn rn" + (i + 1) + "\"></div></div></li>");

            // 책 표지 추가
            $(".c" + (i + 1)).append("<img src=\"https://library.wsu.ac.kr/Sponge/Images/bookDefaults/MMbookdefaultsmall.png\">");

            // 책 제목 추가
            if (bookInfo[2] == "real") {
                //실제책 <span class=\"bookId i" + (i + 1) + "\">" + bookInfo[0] + "</span>
                $(".t" + (i + 1)).append("<a class=\"bookLink\" href=\"book_detail" + bookInfo[1] + ".html\">" + bookInfo[3] + "</a>");
            } else {
                //전자책
                $(".t" + (i + 1)).append("<a class=\"bookLink\" href=\"book_detail" + bookInfo[1] + ".html\">" + bookInfo[3] + " [전자책]</a>");
            }

            // 책 저자명 추가
            $(".a" + (i + 1)).text("작가이름");

            // 반납기한 추가
            var returndate = bookInfo[5].split(" ");
            $(".d" + (i + 1)).append("<span>반납 기한 : ~" + returndate[0] + "</span>");

            // 반납 버튼 추가
            $(".rt" + (i + 1)).append("<button>반납</button>");

            //기간 연장 버튼 추가
            $(".rn" + (i + 1)).append("<button>기간 연장 (" + bookInfo[6] + "/3)</button>");

        }
    }


});