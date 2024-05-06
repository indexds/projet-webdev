let remontees_called = [];

export async function displayPosts(id) {
    if (remontees_called.includes(id)) {
        remontees_called.splice(remontees_called.indexOf(id), 1);
        let postContainer = document.getElementById("post-container-" + id);
        postContainer.style.height = postContainer.scrollHeight + "px";
        postContainer.offsetHeight; // Trigger reflow
        postContainer.style.height = 0;
        setTimeout(() => {
            postContainer.innerHTML = '';
            postContainer.style.height = "auto";
        }, 250); // Adjust the time to match your CSS transition time
        return;
    }

    remontees_called.push(id);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/projet-webdev/sql/posts/remontees/getRemonteePosts.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let posts = JSON.parse(xhr.responseText);
                let html = '';

                posts.forEach(function (post) {
                    let date = post.date.split(" ")[0].split("-").reverse().join("-") + " " + post.date.split(" ")[1].split(":").slice(0, 2).join(":");

                    html += `
                            <div class="post">
                                <div class="post-user-date">
                                    <div class="user">${post.login}</div>
                                    <div class="date">${date}</div>
                                </div>
                                <div class="post-content">${post.content}</div>
                            </div>
                            `;
                });

                let postContainer = document.getElementById("post-container-" + id);
                postContainer.style.height = "0";

                setTimeout(() => {
                    postContainer.innerHTML = html;
                    postContainer.innerHTML += `<input type="text" placeholder="Comment..." id="comment-input-${id}" class="comment-input"></input>`;
                    postContainer.style.height = postContainer.scrollHeight + "px";

                    let input = document.querySelector(`#comment-input-${id}`);

                    input.addEventListener('keypress', function (e) {
                        if (e.key === 'Enter') {

                            let xhr = new XMLHttpRequest();
                            xhr.open("POST", "/projet-webdev/sql/posts/remontees/addRemonteePost.php", true);
                            xhr.setRequestHeader("Content-Type", "application/json");

                            xhr.onreadystatechange = function () {
                                if (xhr.readyState === XMLHttpRequest.DONE) {
                                    if (xhr.status === 200) {

                                        displayPosts(id);

                                        if (JSON.parse(xhr.responseText) === "INVALID_TOKEN") {
                                            alert("Session expired, please reconnect.");
                                            logout();
                                        }

                                    }
                                }
                            }
                            xhr.send(JSON.stringify({ "content": input.value.trim(), "id_remontee": id, "login": localStorage.getItem("user"), "token": localStorage.getItem("token") }));
                        }
                    });
                }, 50);
            }
        }
    }
    xhr.send(JSON.stringify({ "id_remontee": id }));
}
