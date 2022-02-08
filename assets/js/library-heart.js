// 도서 대출 목록 페이지

jQuery(function ($) {
    // const url = "http://localhost:58156/Service1.svc/";
    const url = "http://localhost:59755/WSUforestService.svc/";

    //도서 대출 목록 출력 : 페이지 로딩시 실행
    $(function () {
        //쿠키에 사용자 이름 가져오기
        var cookieCheck = $.cookie("userId");

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
    $("").on("click", function() {
        
    })

    // 검색 버튼
    $(".select-btn").on("click", function() {
        // console.log("클릭!");
        var selectData = $(".serch-text").val();
        if (selectData == "") {
            $('.booklist li').show();
        } else {
            $('.booklist li').hide();
            $(".booklist div:contains('" + selectData + "')").show();
        }
    })

    //찜 해제 버튼 => 아예 안됨..ㅜㅜ
    $(".hb1 > img").on("click", function () {
        console.log("실행");
    })


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
            // $(".hb" + (i + 1)).append("<span class=\"hideBookId\">" + bookInfo[0] + "</span>");
            // $(".hb" + (i + 1)).append("<button class=\"unheartbtn\">찜해제하기</button>");
            
        }
    }
});