var btn_login = document.querySelector('.btn-primary');

btn_login.addEventListener('click', function() {
    var url = 'http://localhost:58156/Service1.svc/Stu_Login';
    // 보낼 데이터
    var data = {
        id: document.getElementById('email').value,
        password: document.getElementById('fullname').value
    };

    fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',   //omit(X), same-origin(cors), include(no-cors)
            body: data,
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
});