// 도서 대출 목록 페이지

jQuery(function ($) {
    // const url = "http://localhost:58156/Service1.svc/";
    const url = "http://localhost:59755/WSUforestService.svc/";

    //쿠키에 사용자 이름 가져오기
    var cookieCheck = $.cookie("userId");

    //도서 대출 목록 출력 : 페이지 로딩시 실행
    $(function () {

        //로그인 유무 확인
        fetch(url + "WSU_LoginCheck/" + cookieCheck)
            .then(response => response.json())
            .then(data => {
                var res = data.split(",");
                // 로그인 중
                if (res[0] == "001") {
                    //도서 찜 목록 가져오기
                    fetch(url + "WSU_BookHeartList/" + cookieCheck)
                        .then(response => response.json())
                        .then(data => {
                            //도서 리스트 추가
                            makeHeartBook(data);
                        });
                } else if (res[0] == "002") { // 로그아웃 중
                    alert("로그인이 필요합니다.");
                    location.href = "login.html";
                } else { //003,로그인 체크 실패
                    alert("[" + res[0] + "] " + res[1]);
                    location.href = "index.html";
                }
            })

    })

    // 정렬 버튼
    $("").on("click", function () {

    })

    // 검색 버튼
    $(".select-btn").on("click", function () {
        // var selectData = $(".serch-text").val();
        // if (selectData == "") {
        //     $('.booklist li').show();
        // } else {
        //     $('.booklist li').hide();
        //     $(".booklist div:contains('" + selectData + "')").show();
        // }
    })


    //도서 찜 해제
    //#region
    // 찜 해제 버튼1
    $(document).on("click", ".hb1 img", function () {
        var bookId = $(".bookId").text()[0];
        unheartBook(bookId);
    })

    $(document).on("click", ".hb2 img", function () {
        var bookId = $(".bookId").text()[1];
        unheartBook(bookId);
    })

    $(document).on("click", ".hb3 img", function () {
        var bookId = $(".bookId").text()[2];
        unheartBook(bookId);
    })
    
    $(document).on("click", ".hb4 img", function () {
        var bookId = $(".bookId").text()[3];
        unheartBook(bookId);
    })

    $(document).on("click", ".hb5 img", function () {
        var bookId = $(".bookId").text()[4];
        unheartBook(bookId);
    })
    
    $(document).on("click", ".hb6 img", function () {
        var bookId = $(".bookId").text()[5];
        unheartBook(bookId);
    })
    
    $(document).on("click", ".hb7 img", function () {
        var bookId = $(".bookId").text()[6];
        unheartBook(bookId);
    })

    $(document).on("click", ".hb8 img", function () {
        var bookId = $(".bookId").text()[7];
        unheartBook(bookId);
    })
    
    $(document).on("click", ".hb9 img", function () {
        var bookId = $(".bookId").text()[8];
        unheartBook(bookId);
    })
    
    $(document).on("click", ".hb10 img", function () {
        var bookId = $(".bookId").text()[9];
        unheartBook(bookId);
    })
    //#endregion


    //도서 추가 함수 구현
    function makeHeartBook(book) {
        for (var i = 0; i < book.length; i++) {
            //bookInfo[0] = B_ID 책 아이디
            //bookInfo[1] = type 타입(실제 or 전자책)
            //bookInfo[2] = title 책 제목
            //bookInfo[3] = authors 작가들
            //bookInfo[4] = thumbnail 표지
            var bookInfo = book[i].split("@");

            // 리스트 추가
            $("#booklist").append("<li class=\"" + bookInfo[0] + "\"><a class=\"bookCover c" + (i + 1) + "\" href=\"book_detail.html\"></a><div class=\"bookContent\"><div class=\"bookTitle t" + (i + 1) + "\"></div><span class=\"bookAuthor a" + (i + 1) + "\"></span></div><div class=\"heartBtn hb" + (i + 1) + "\"></div></li>");

            // 책 표지 추가
            $(".c" + (i + 1)).append("<img src=\"" + bookInfo[4] + "\">");

            // 책 제목 추가
            if (bookInfo[1] == "real") {
                //실제책 <span class=\"bookId i" + (i + 1) + "\">" + bookInfo[0] + "</span>
                $(".t" + (i + 1)).append("<a class=\"bookLink\" href=\"book_detail" + bookInfo[0] + ".html\">" + bookInfo[2] + "</a>");
            } else {
                //전자책
                $(".t" + (i + 1)).append("<a class=\"bookLink\" href=\"book_detail" + bookInfo[0] + ".html\">" + bookInfo[2] + " [전자책]</a>");
            }

            // 책 저자명 추가
            $(".a" + (i + 1)).text(bookInfo[3]);

            //찜 버튼 추가
            $(".hb" + (i + 1)).append("<img src=\"./assets/img/library/redHeart.png\">");
            $(".hb" + (i + 1)).append("<span class=\"bookId\">" + bookInfo[0] + "</span>");

        }
    }

    //도서 찜 해제 함수
    function unheartBook(bookID) {
        fetch(url + "WSU_BookUnHeart/" + cookieCheck + "/" + bookID)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                var res = data.split(",");

                if (res[0] == "180") { // 3-1) 도서 찜 해제 성공
                    location.reload();
                } else { // 3-2) 도서 찜 해제 실패
                    alert(res[1]);
                }
            })
    }
});