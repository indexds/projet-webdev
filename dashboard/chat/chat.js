async function getMessages(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/projet-webdev/sql/chat/getMessages.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let messages = JSON.parse(xhr.responseText);

                let chat = document.getElementById("chat-box");

                messages.forEach(function (message){
                    chat.innerHTML += `<div class="message">
                                        <div class="message-user">${message.login}</div>
                                        <div class="message-content">${message.content}</div>
                                        <div class="message-date">${message.date}</div>
                                    </div>`;
                })

            } else {
                console.error("Failed to get messages:", xhr.status);
            }
        }
    };

    xhr.send();
}

async function addMessage(){
    //to be implemented
}

window.goToPistes = function() {
    window.location.href = "/projet-webdev/dashboard/pistes";
}

window.goToRemontees = function() {
    window.location.href = "/projet-webdev/dashboard/remontees";
}

window.refresh = function() {
    console.log("refresh");
    //TO BE IMPLEMENTED
}

window.logout = function () {
    localStorage.clear();
    window.location.href = "/projet-webdev/login";
}

getMessages();