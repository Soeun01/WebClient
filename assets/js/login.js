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
            return;
        } else {
            fetch(url + id + "/" + pw)
                .then(response => response.json())
                // .then(data => alert(data));
                .then(data => {
                    alert(data);
                    if (data == "성공") {
                        location.href = "index.html";
                    } else {
                        location.href = "login.html";
                    }
                });
        }
    });
});