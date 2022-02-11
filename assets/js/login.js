//로그인 기능

$(function () {
    //서버 주소
    // const url = "http://localhost:58156/Service1.svc/";
    const url = "http://localhost:59755/WSUforestService.svc/";

    //버튼 클릭시 실행
    $("#loginBtn").on("click", function () {
        //입력 받은 id, pw
        var id = $("#userId").val();
        var pw = $("#userPw").val();

        if (id == "" || pw == "") {
            alert("아이디와 비밀번호를 입력하세요.");
        } else {
            fetch(url + "WSU_Login/" + id + "/" + pw)
                .then(response => response.json())
                .then(data => {
                    var msg = data.split(",");
                    //로그인 성공
                    if (msg[0] == "100") {
                        // alert("[" + msg[0] + "] " + msg[1] + "\n" + msg[2]);
                        
                        // 쿠키 생성
                        $.cookie("userId", id, {
                            expires: 1,
                            path: "/"
                        });
                        
                        //얘를 제외한 모든게 됨
                        location.href = "index.html";
                    } else { //로그인 실패
                        alert("[" + msg[0] + "] " + msg[1] + "\n" + msg[2]);
                        location.reload();
                    }
                });
        }
    });

});