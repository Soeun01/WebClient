// 도서 상세 정보 페이지

jQuery(function ($) {
    // const url = "http://localhost:58156/Service1.svc/";
    const url = "http://localhost:59755/WSUforestService.svc/";

    var cookieCheck = $.cookie("userId"); //유저 아이디(쿠키)
    var bookId = $(".page-bookId").text(); //책 아이디

    // 페이지 로딩시 실행
    $(function () {
        // 도서 상세 정보 출력
        fetch(url + "WSU_BookInfoSelect/" + bookId)
            .then(response => response.json())
            .then(data => {
                makeBookDetail(data);
            });

        // 대출 현황 확인
        fetch(url + "WSU_BookRentalCheck/" + cookieCheck + "/" + bookId)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var res = data.split(",");

                if (res[0] == "011") { // 도서 본인이 대출 상태
                    $(".rentarBtn").text("반납");
                } else if (res[0] == "013") { // 도서 반납 상태
                    $(".rentarBtn").text("대출");
                } else { // 대출 반납 
                    $(".rentarBtn").attr("disabled", false);
                }
            })

        // 찜 유무 확인
        fetch(url + "WSU_BookHeartCheck/" + cookieCheck + "/" + bookId)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var res = data.split(",");

                if (res[0] == "021") { // 도서 찜 상태
                    $(".bookHeart > img").attr("src", "./assets/img/library/redHeart.png");
                } else if (res[0] == "022") { // 도서 찜해제 상태
                    $(".bookHeart > img").attr("src", "./assets/img/library/heart.png");
                } else { // 도서 찜 유무 확인 실패
                    console.log("도서 찜 유무 확인 실패");
                }
            })
    })

    // 도서 대출/반납/예약 버튼
    $(".rentarBtn").on("click", function () {
        var btnName = $(".rentarBtn").text();

        if (btnName == "대출") { // 대출 버튼
            console.log(btnName);
            fetch(url + "WSU_BookCheckOut/" + cookieCheck + "/" + bookId)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    var res = data.split(",");
                    
                    if(res[0] == "130") {   // 대출 성공
                        location.reload();
                    } else {    // 대출 실패 + 사유
                        alert("[" + res[1] + "] " + res[2]);
                    }
                })
        } else {    // 반납 버튼
            console.log(btnName);
            fetch(url + "WSU_BookReturn/" + cookieCheck + "/" + bookId)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    var res = data.split(",");
                    
                    if(res[0] == "140") {   // 반납 성공
                        // location.reload();
                    } else if(res[0] == "141") {    // 반납 성공 + 연체 반납
                        alert(res[2]);
                        // location.reload();
                    } else {    // 반납 실패 + 사유
                        alert("[" + res[1] + "] " + res[2]);
                    }
                })
        }
    });

    // 도서 찜 버튼
    $(".bookHeart > img").on("click", function () {
        // 1) 찜 유무 확인
        fetch(url + "WSU_BookHeartCheck/" + cookieCheck + "/" + bookId)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var res = data.split(",");

                if (res[0] == "021") { // 2-1) 도서 찜 상태
                    fetch(url + "WSU_BookUnHeart/" + cookieCheck + "/" + bookId)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            var res = data.split(",");

                            if (res[0] == "180") { // 3-1) 도서 찜 해제 성공
                                console.log(res[1]);
                                $(".bookHeart > img").attr("src", "./assets/img/library/heart.png");
                            } else { // 3-2) 도서 찜 해제 실패
                                console.log(res[1]);
                            }
                        })
                } else if (res[0] == "022") { // 2-2) 도서 찜 해제 상태
                    fetch(url + "WSU_BookHeart/" + cookieCheck + "/" + bookId)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            var res = data.split(",");

                            if (res[0] == "170") { // 4-1) 도서 찜 성공
                                console.log(res[1]);
                                $(".bookHeart > img").attr("src", "./assets/img/library/redHeart.png");
                            } else if (res[0] == "171") { // 4-2) 실패, 이미 찜한 도서
                                console.log("[" + res[1] + "] " + res[2]);
                            } else { // 4-3) 도서 찜 실패
                                console.log(res[1]);
                            }
                        })
                } else { // 2-3) 도서 찜 유무 확인 실패
                    console.log("도서 찜 유무 확인 실패");
                }
            })

    });


    // 도서 추가 함수 구현
    function makeBookDetail(book) {
        // 표지 이미지 추가
        $(".detail-bookCover").append("<img src=\"" + book.Thumbnail + "\">");

        // 책 제목 설정
        $(".detail-bookTitle").text(book.Title);

        // 자료 유형 설정
        if (book.Type == "real") {
            $(".type").text("단행본");
            $(".rentarBtn").attr("disabled", true); //대출 버튼 사용 안함
        } else {
            $(".type").text("전자자료");
            $(".rentarBtn").attr("disabled", false); //대출 버튼 사용함
        }

        // isbn 설정
        $(".isbn").text(book.Isbn);

        // 출판날짜 설정
        $(".publishingDate").text(book.Publishingdate);

        // 저자명 설정
        $(".authors").text(book.Authors);

        // 책제목/저자명 설정
        $(".title-authors").text(book.Title + " / " + book.Authors);

        // 출판사 설정
        $(".publisher").text(book.Publisher);

        // 번역자 설정
        $(".translators").text(book.Translators);

        // 도서소개 설정
        $(".contents").text(book.Contents);

        // 도서상태 설정
        if (book.Status == "library") {
            $(".status").text("대출 가능");
        } else if (book.Status == "rental") {
            $(".status").text("대출 중");
        } else if (book.Status == "broken") {
            $(".status").text("파손");
        } else { //reservation
            $(".status").text("예약됨");
        }
    }

});