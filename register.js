function goToLogin(){
    window.location.href = "login.php";
}

function checkPassword(){
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    if(password != confirmPassword){
        document.getElementById("response").innerHTML = "Passwords do not match";
    }
    else{
        document.getElementById("response").innerHTML = "";
        register();
    }
}

function register(){
    var registerData = {
        "login": document.getElementById("login").value,
        "password": document.getElementById("password").value
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "sqlçregister.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                document.getElementById("response").innerHTML = response;
            } else {
                console.error("Error:", xhr.statusText);
            }
        }
    };

    xhr.send(JSON.stringify(registerData));
}
