function goToLogin() {
    window.location.href = "/projet-webdev/login/";
}

function checkField(field){
    let element = document.getElementById(field);
    let response_element = document.getElementById("response");

    if (element.value.trim() === "") {
        response_element.innerHTML = "Please fill in all fields";
        element.classList.add("invalid");
        return false;
    }
    else {
        response_element.innerHTML = "";
        element.classList.remove("invalid");
        return true;
    }
}

function validateRegister() {

    let login = checkField("login")
    let password = checkField("password");
    let confirm_password = checkField("confirm-password");

    if (login && password && confirm_password){
        let password = document.getElementById("password");
        let confirm_password = document.getElementById("confirm-password");
        let response = document.getElementById("response");

        if (password.value.trim() != confirm_password.value.trim()) {
            response.innerHTML = "Passwords do not match";
            response.classList.add('invalid');
            password.classList.add('invalid');
            confirm_password.classList.add('invalid');

        }
        else {
            response.innerHTML = "";
            response.classList.remove('invalid');
            password.classList.remove('invalid');
            confirm_password.classList.remove('invalid');

            registerUser();
        }
    }

function registerUser() {

    let login = document.getElementById("login");
    let password = document.getElementById("password");

    let registerData = {
        "login": login.value.trim(),
        "password": password.value.trim()
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/projet-webdev/sql/register.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        let response_element = document.getElementById("response");
        let login_element = document.getElementById("login");

        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                response_element.innerHTML = response;
                if(response === "Registration Successful!"){
                    response_element.classList.add('valid');
                    window.location.href = "/projet-webdev/login/";
                }
                else if (response === "Login already exists!"){
                    response_element.classList.add('invalid');
                    login_element.classList.add('invalid');
                }
            } else {
                console.error("Error:", xhr.statusText);
            }
        }
    };

    xhr.send(JSON.stringify(registerData));
}
}