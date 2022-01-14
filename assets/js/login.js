// var btn_login = document.querySelector('.btn-primary');

// btn_login.addEventListener('click', function() {
//     var url = 'http://localhost:58156/Service1.svc/Stu_Login';
//     // 보낼 데이터
//     var data = {
//         id: document.getElementById('email').value,
//         password: document.getElementById('fullname').value
//     };

//     fetch(url, {
//             method: 'POST',
//             mode: 'cors',
//             credentials: 'same-origin',   //omit(X), same-origin(cors), include(no-cors)
//             body: data,
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         }).then(res => res.json())
//         .then(response => console.log('Success:', JSON.stringify(response)))
//         .catch(error => console.error('Error:', error));
// });

var apiUrl = "http://andrewgodfroyportfolioapi.azurewebsites.net/api/Authentication";
    //alert(username + "|" + password + "|" + apiUrl);
    $.ajax({
        url: apiUrl,
        type: "POST",
        data: {
            username: username,
            password: password
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var authenticatedUser = JSON.parse(response);
            //alert("Data Loaded: " + authenticatedUser);
            if (onComplete != null) {
                onComplete(authenticatedUser);
            }
        },
        error: function (xhr, status, error) {
            //alert(xhr.responseText);
            if (onComplete != null) {
                onComplete(xhr.responseText);
            }
        }
    });