// 도서 대출 목록 페이지

jQuery(function ($) {
    // const url = "http://localhost:58156/Service1.svc/";
    const url = "http://localhost:59755/WSUforestService.svc/";

    // 쿠키에 사용자 이름 가져오기
    var cookieCheck = $.cookie("userId");

    // 도서 대출 목록 출력 : 페이지 로딩시 실행
    $(function () {
        // 로그인 유무 확인
        fetch(url + "WSU_LoginCheck/" + cookieCheck)
            .then(response => response.json())
            .then(data => {
                var res = data.split(",");
                // 로그인 중
                if (res[0] == "001") {
                    // 도서 대출 목록 가져오기
                    fetch(url + "WSU_BookCheckOutList/" + cookieCheck)
                        .then(response => response.json())
                        .then(data => {
                            // 도서리스트 추가
                            makeRentalBook(data);
                        })
                } else if (res[0] == "002") { // 로그아웃 중
                    alert("로그인이 필요합니다.");
                    location.href = "login.html";
                } else { // 로그인 체크 실패
                    alert("[" + res[0] + "] " + res[1]);
                    location.href = "index.html";
                }
            })
    })

    // 정렬 버튼
    // $("").on("click", function () {

    // })

    //도서 반납 & 도서 기한 연장
    //#region
    // 반납 버튼1
    $(document).on("click", ".rt1 button", function () {
        var bookId = $(".listReturnBookId").text()[0];
        returnBook(bookId);
    })

    // 기한 연장 버튼1
    $(document).on("click", ".rn1 button", function () {
        var bookId = $(".listRenewBookId").text()[0];
        renewBook(bookId);
    })

    // 반납 버튼2
    $(document).on("click", ".rt2 button", function () {
        var bookId = $(".listReturnBookId").text()[1];
        returnBook(bookId);
    })

    // 기한 연장 버튼2
    $(document).on("click", ".rn2 button", function () {
        var bookId = $(".listRenewBookId").text()[1];
        renewBook(bookId);
    })

    // 반납 버튼3
    $(document).on("click", ".rt3 button", function () {
        var bookId = $(".listReturnBookId").text()[2];
        returnBook(bookId);
    })

    // 기한 연장 버튼3
    $(document).on("click", ".rn3 button", function () {
        var bookId = $(".listRenewBookId").text()[2];
        renewBook(bookId);
    })

    // 반납 버튼4
    $(document).on("click", ".rt4 button", function () {
        var bookId = $(".listReturnBookId").text()[3];
        returnBook(bookId);
    })

    // 기한 연장 버튼4
    $(document).on("click", ".rn4 button", function () {
        var bookId = $(".listRenewBookId").text()[3];
        renewBook(bookId);
    })

    // 반납 버튼5
    $(document).on("click", ".rt5 button", function () {
        var bookId = $(".listReturnBookId").text()[4];
        returnBook(bookId);
    })

    // 기한 연장 버튼5
    $(document).on("click", ".rn5 button", function () {
        var bookId = $(".listRenewBookId").text()[4];
        renewBook(bookId);
    })

    // 반납 버튼6
    $(document).on("click", ".rt6 button", function () {
        var bookId = $(".listReturnBookId").text()[5];
        returnBook(bookId);
    })

    // 기한 연장 버튼6
    $(document).on("click", ".rn6 button", function () {
        var bookId = $(".listRenewBookId").text()[5];
        renewBook(bookId);
    })

    // 반납 버튼7
    $(document).on("click", ".rt7 button", function () {
        var bookId = $(".listReturnBookId").text()[6];
        returnBook(bookId);
    })

    // 기한 연장 버튼7
    $(document).on("click", ".rn7 button", function () {
        var bookId = $(".listRenewBookId").text()[6];
        renewBook(bookId);
    })

    // 반납 버튼8
    $(document).on("click", ".rt8 button", function () {
        var bookId = $(".listReturnBookId").text()[7];
        returnBook(bookId);
    })

    // 기한 연장 버튼8
    $(document).on("click", ".rn8 button", function () {
        var bookId = $(".listRenewBookId").text()[7];
        renewBook(bookId);
    })

    // 반납 버튼9
    $(document).on("click", ".rt9 button", function () {
        var bookId = $(".listReturnBookId").text()[8];
        returnBook(bookId);
    })

    // 기한 연장 버튼9
    $(document).on("click", ".rn9 button", function () {
        var bookId = $(".listRenewBookId").text()[8];
        renewBook(bookId);
    })

    // 반납 버튼10
    $(document).on("click", ".rt10 button", function () {
        var bookId = $(".listReturnBookId").text()[9];
        returnBook(bookId);
    })

    // 기한 연장 버튼10
    $(document).on("click", ".rn10 button", function () {
        var bookId = $(".listRenewBookId").text()[9];
        renewBook(bookId);
    })
    //#endregion


    // 도서 추가 함수 구현
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
            // $(".a" + (i + 1)).text("작가이름");

            // 반납기한 추가
            var returndate = bookInfo[5].split(" ");
            $(".d" + (i + 1)).append("<span>반납기한:" + returndate[0] + "</span>");

            // 반납 버튼 추가
            $(".rt" + (i + 1)).append("<button>반납<span class=\"listReturnBookId\">" + bookInfo[1] + "</span></button>");

            //기간 연장 버튼 추가
            $(".rn" + (i + 1)).append("<button>대출 연장 (" + bookInfo[6] + "/1)<span class=\"listRenewBookId\">" + bookInfo[1] + "</span></button>");

        }
    }

    // 도서 반납 기능 함수
    function returnBook(bookID) {
        fetch(url + "WSU_BookReturn/" + cookieCheck + "/" + bookID)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                var res = data.split(",");

                if (res[0] == "140") { // 반납 성공
                    location.reload();
                } else if (res[0] == "141") { // 반납 성공 + 연체 반납
                    alert(res[2]);
                } else { // 반납 실패 + 사유
                    alert("[" + res[1] + "] " + res[2]);
                }
            })
    }

    //도서 기한 연장 기능 함수
    function renewBook(bookID) {
        fetch(url + "WSU_BookRenew/" + cookieCheck + "/" + bookID)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var res = data.split(",");

                if (res[0] == "150") { // 연장 성공
                    location.reload();
                } else if (res[0] == "151") { // 대출 실패
                    alert("[" + res[1] + "]");
                } else { // 대출 실패 + 사유
                    alert("[" + res[1] + "] " + res[2]);
                }
            })
    }
});