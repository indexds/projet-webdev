window.addEventListener("beforeunload", function(){
    localStorage.removeItem("last_received_id");
});

window.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("user") === null || localStorage.getItem("token") === null) {
        window.location.href = "/projet-webdev/login";
        return;
    }

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
    document.getElementById("logout").innerHTML += ` (${localStorage.getItem("user")})`;
});

async function getMessages() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/projet-webdev/sql/chat/getMessages.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.timeout = 0;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let messages = JSON.parse(xhr.responseText);
                let chat = document.getElementById("chat-box");

                messages.forEach(function (message) {
                    let newMessage = document.createElement("div");
                    newMessage.classList.add("message");
                    newMessage.innerHTML = `
                        <div class="message-user_date">
                            <div class="message-user">${message.login}</div>
                            <div class="message-date">${message.date}</div>
                        </div>
                        <div class="message-content">${message.content}</div>
                    `;

                    chat.appendChild(newMessage);
                    // Adding class to trigger transition effect
                    setTimeout(function () {
                        newMessage.classList.add("message-show");
                        let messageInput = document.getElementById("message-input");
                        messageInput.classList.add("message-show");
                    }, 10);
                });

                if (messages.length > 0) {
                    localStorage.setItem("last_received_id", parseInt(messages[messages.length - 1].id));
                }

                getMessages();
            } else {
                console.error("Failed to get messages:", xhr.status);
                window.location.href = "/projet-webdev/dashboard/chat";
            }
        }
    };

    xhr.send(JSON.stringify({ "last_received_id": parseInt(localStorage.getItem("last_received_id")) }));
}

async function sendMessage() {
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

                document.getElementById("message-input").value = "";

                if (JSON.parse(xhr.responseText) === "INVALID_TOKEN") {
                    alert("Session expired, please reconnect.");
                    logout();
                }

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
    window.location.href = "/projet-webdev/dashboard/chat";
}

window.logout = function () {
    localStorage.clear();
    window.location.href = "/projet-webdev/login";
}
