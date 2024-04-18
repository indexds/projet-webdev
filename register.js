function goToLogin(){
    window.location.href = "login.php";
}

function validateForm() {
    let login = document.getElementById("login");
    let password = document.getElementById("password");
    let confirm_password = document.getElementById("confirm-password");

    let login_content = login.value.trim();
    let password_content = password.value.trim();
    let confirm_password_content = confirm_password.value.trim();

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

    if (confirm_password_content === '') {
        responseElement.innerHTML = "Please fill in all fields";
        confirm_password.classList.add('invalid');
    } else {
        confirm_password.classList.remove('invalid');
    }

    if (login_content !== '' && password_content !== '') {
        responseElement.innerHTML = "";
        checkPassword();
    }
}

function checkPassword(){
    let password = document.getElementById("password");
    let confirm_password = document.getElementById("confirm-password");

    let password_content = document.getElementById("password").value;
    let confirm_password_content = document.getElementById("confirm-password").value;
    let response = document.getElementById("response");


    if(password_content != confirm_password_content){
        response.innerHTML = "Passwords do not match";
        password.classList.add('invalid');
        confirm_password.classList.add('invalid');
    }
    else{
        response.innerHTML = "";
        password.classList.remove('invalid');
        confirm_password.classList.remove('invalid');
        registerUser();
    }
}

function registerUser(){
    var registerData = {
        "login": document.getElementById("login").value,
        "password": document.getElementById("password").value
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "sql_register.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                document.getElementById("response").innerHTML = response;
                if(response === "Registration Successful!"){
                    document.getElementById("response").style.color = "#00a400";
                    window.location.href = "index.php";
                }
            } else {
                console.error("Error:", xhr.statusText);
            }
        }
    };

    xhr.send(JSON.stringify(registerData));
}