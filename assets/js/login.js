//로그인 기능

$(function () {
    //버튼 클릭시 실행
    $("#loginBtn").on("click", function () {
        //서버 주소
        const url = "http://localhost:58156/Service1.svc/GetLogin/";
        //입력 받은 id, pw
        var id = $("#stuId").val();
        var pw = $("#stuPw").val();

        if (id == "" || pw == "") {
            alert("아이디와 비밀번호를 입력하세요.");
            location.href = "login.html";
        } else {
            fetch(url + id + "/" + pw)
                .then(response => response.json())
                // .then(data => alert(data));
                .then(data => {
                    if (data == "성공") {
                        alert("[로그인 " + data + "]");
                        location.href = "index.html";
                    } else {
                        alert("[로그인 " + data + "] 아이디 혹은 비밀번호가 잘못되었습니다.");
                        location.href = "login.html";
                    }
                });
        }
    });
});

// (function() {
//     checkLogin(60000); // 1000 밀리세컨드 = 1초

//     function checkLogin(delay) {
//         setTimeout(function() {
//             var hasCookie, hasSession;

//             var loginCookie = document.cookie.indexOf("myLogin");
//             if ((loginCookie > 0) && (typeof loginCookie === "number")) {
//                 hasCookie = true;
//             }

//             if (document.getElementById("logout") !== null) {
//               hasSession = true;
//             }

//             if (hasCookie && hasSession) {
//                 console.log("isLogin: true");
//             }
//             else {
//                 if (hasCookie || hasSession) {
//                     // 둘 중 하나만 존재하는 경우 로그아웃 페이지로 이동시킴
//                     window.location.replace("/includes/signout/");

//                 }
//                 else {
//                     return false;
//                 }
//             }

//             checkLogin(60000); // 재귀함수를 사용하여 반복수행함
//         }, delay);
//     }

// })();