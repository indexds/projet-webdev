window.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("last_received_id") === null) {
        localStorage.setItem("last_received_id", 0);
    }
    let input = document.getElementById("message-input");
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
    getMessages();
});

async function getMessages() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/projet-webdev/sql/chat/getMessages.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let messages = JSON.parse(xhr.responseText);
                let chat = document.getElementById("chat-box");

                messages.forEach(function (message) {
                    chat.innerHTML += `<div class="message">
                                        <div class="message-user">${message.login}</div>
                                        <div class="message-content">${message.content}</div>
                                        <div class="message-date">${message.date}</div>
                                    </div>`;
                });

                if (messages.length > 0) {
                    localStorage.setItem("last_received_id", parseInt(messages[messages.length - 1].id));
                }

                getMessages();
            } else {
                console.error("Failed to get messages:", xhr.status);
                setTimeout(getMessages, 5000);
            }
        }
    };

    xhr.send(JSON.stringify({ "last_received_id": parseInt(localStorage.getItem("last_received_id")) }));
}

async function sendMessage(){
    let input = document.getElementById("message-input").value;

    if (input === "") {
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/projet-webdev/sql/chat/sendMessage.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if(xhr.responseText === "Invalid token!"){
                    alert("Session expired, please reconnect.");
                    logout();
                }

                document.getElementById("message-input").value = "";

            } else {
                console.error("Failed to send message:", xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify({ "content": input, "login": localStorage.getItem("user"), "token": localStorage.getItem("token") }));
}

window.goToPistes = function () {
    localStorage.removeItem("last_received_id");
    window.location.href = "/projet-webdev/dashboard/pistes";
}

window.goToRemontees = function () {
    localStorage.removeItem("last_received_id");
    window.location.href = "/projet-webdev/dashboard/remontees";
}

window.refresh = function () {
    localStorage.removeItem("last_received_id");
    document.getElementById("chat-box").innerHTML = "";
    getMessages();
}

window.logout = function () {
    localStorage.clear();
    window.location.href = "/projet-webdev/login";
}
