import { displayPosts } from "/projet-webdev/sql/posts/remontees/posts.js";

document.getElementById("logout").innerHTML += ` (${localStorage.getItem("user")})`;

async function getRemontees() {

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/projet-webdev/sql/remontees/getRemontees.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = async function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                let html = '';

                let ids_seen = [];
                response.forEach(async function (remontee) {
                    if(!ids_seen.includes(remontee.id)){
                        html += `<div class="remontee-piste-container">
                                    <div class="remontee-container">
                                        <div class="remontee-texte">${remontee.remontee_name}</div>
                                        <div class="switch-position">
                                            <label class="switch">
                                                <input type="checkbox" remontee-id="${remontee.id}" ${remontee.remontee_state === '1' ? 'checked' : ''}>
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="remontee-container remontee-id-${remontee.id}"></div>
                                    <div class="comment-svg"><img src="/projet-webdev/sql/posts/comment.svg" width="auto" height="auto" onclick="displayPosts(${remontee.id})"></div>
                                    <div id="post-container-${remontee.id}"></div>
                                </div>`;
                        ids_seen.push(remontee.id);
                    }

                });


                await sleep(200);
                document.getElementById("remontees").innerHTML = html;


                response.forEach(async function (remontee) {
                    let remontee_container = document.querySelector(`.remontee-id-${remontee.id}`);
                    remontee_container.innerHTML += `<div class="remontee-container remontee-id-${remontee.id} ${remontee.piste_state === '1' ? 'piste-green' : 'piste-red'}">
                                                    ${remontee.piste_name}
                                                    </div>`;
                });



                let checkboxes = document.querySelectorAll("#remontees input[type='checkbox']");

                checkboxes.forEach(function (checkbox) {
                    checkbox.addEventListener('change', function () {
                        updateRemonteeState(this.getAttribute("remontee-id"), this.checked);
                    });
                });
            }
        }
    };

    xhr.send();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateRemonteeState(remonteeId, newState) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/projet-webdev/sql/remontees/updateRemonteeState.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    let request = {
        "state": newState,
        "id": remonteeId
    };

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                getRemontees();
            } else {
                console.error("Failed to update remontee state:", xhr.status);
            }
        }
    };
    console.log(JSON.stringify(request));
    xhr.send(JSON.stringify(request));
}

window.goToPistes = function() {
    window.location.href = "/projet-webdev/dashboard/pistes";
}

window.logout = function () {
    localStorage.clear();
    window.location.href = "/projet-webdev/login";
}

window.displayPosts = displayPosts;

getRemontees();