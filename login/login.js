function goToRegister() {
    window.location.href = "/projet-webdev/register/";
}

// Login if enter key pressed
document.addEventListener( 'keydown', function( event ) {
    if( event.key === "Enter" ) {
        validateLogin();
    }
});

function checkField(field) {
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

function validateLogin() {
    let login = checkField("login");
    let password = checkField("password");

    if (login && password) {
        loginUser();
    }
}

function loginUser() {

    let login = document.getElementById("login");
    let password = document.getElementById("password");

    let loginData = {
        "login": login.value.trim(),
        "password": password.value.trim()
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/projet-webdev/sql/auth/login.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        let response_element = document.getElementById("response");

        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);

                if (response.message === "Login Successful!") {
                    response_element.innerHTML = response.message;
                    response_element.classList.add('valid');
                    window.location.href = "/projet-webdev/dashboard/";

                    localStorage.setItem("user", loginData.login);
                    localStorage.setItem("token", response.token);
                }
                else if (response === "Invalid credentials!") {
                    response_element.innerHTML = response;
                    response_element.classList.add('invalid');
                    login.classList.add('invalid');
                    password.classList.add('invalid');
                }
            } else {
                console.error("Error:", xhr.statusText);
            }
        }
    };

    xhr.send(JSON.stringify(loginData));
}
