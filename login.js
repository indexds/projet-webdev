function loginUser() {
    var loginData = {
        "login": document.getElementById("login").value,
        "password": document.getElementById("password").value
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "sql_login.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                document.getElementById("response").innerHTML = response;
                if(response === "Login Successful!"){
                    document.getElementById("response").style.color = "#00a400";
                    window.location.href = "index.php";
                }
            } else {
                console.error("Error:", xhr.statusText);
            }
        }
    };

    xhr.send(JSON.stringify(loginData));
}

function goToRegister() {

    window.location.href = "register.php";

}

function validateForm() {
    let login = document.getElementById("login");
    let password = document.getElementById("password");
    let login_content = login.value.trim();
    let password_content = password.value.trim();
    let responseElement = document.getElementById("response");

    if (login_content === '') {
        responseElement.innerHTML = "Please fill in all fields";
        login.classList.add('invalid');
    } else {
        login.classList.remove('invalid');
    }

    if (password_content === '') {
        responseElement.innerHTML = "Please fill in all fields";
        password.classList.add('invalid');
    } else {
        password.classList.remove('invalid');
    }

    if (login_content !== '' && password_content !== '') {
        responseElement.innerHTML = "";
        loginUser(); 
    }
}