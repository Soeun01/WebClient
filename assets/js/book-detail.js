// 도서 상세 정보 페이지

jQuery(function ($) {
    // const url = "http://localhost:58156/Service1.svc/";
    const url = "http://localhost:59755/WSUforestService.svc/";

    //도서 상세 정보 출력 : 페이지 로딩시 실행
    $(function () {
        var bookId = $(".page-bookId").text();

        fetch(url + "WSU_BookInfoSelect/" + bookId)
            .then(response => response.json())
            .then(data => {
                makeBookDetail(data);
            });
    })

    //도서 추가 함수 구현
    function makeBookDetail(book) {
        // 표지 이미지 추가
        $(".detail-bookCover").append("<img src=\"" + book.Thumbnail + "\">");

        // 책 제목 설정
        $(".detail-bookTitle").text(book.Title);
        
        // 자료 유형 설정
        if(book.Type == "real") {
            $(".type").text("단행본");
        } else {
            $(".type").text("전자자료");
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
        if(book.Status == "library") {
            $(".status").text("대출 가능");
        } else if(book.Status == "broken") {
            $(".status").text("손상됨?");
        } else {    //reservation
            $(".status").text("예약됨");
        }
    }

    //도서 대출/반납/예약 버튼
    $(".rentarBtn").on("click", function () {

    });

    //도서 찜 버튼
    $(".bookHeart img").on("click", function () {

    });

});