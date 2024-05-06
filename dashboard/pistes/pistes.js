import {displayPosts} from "/projet-webdev/sql/posts/pistes/posts.js"

window.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("user") === null || localStorage.getItem("token") === null) {
        window.location.href = "/projet-webdev/login";
        return;
    }

    document.getElementById("logout").innerHTML += ` (${localStorage.getItem("user")})`;
});

export async function getPistes() {
    let pistes_vertes = document.getElementById("pistes-vertes");
    let pistes_bleues = document.getElementById("pistes-bleues");
    let pistes_rouges = document.getElementById("pistes-rouges");
    let pistes_noires = document.getElementById("pistes-noires");

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/projet-webdev/sql/pistes/getPistes.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = async function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);

                response.forEach(function (piste) {
                    let new_piste = document.createElement("div");
                    new_piste.classList.add("piste-container");

                    new_piste.innerHTML =   `
                                            <div class="piste-texte">${piste.name}</div>
                                            <div class="switch-position">
                                                <label class="switch">
                                                    <input type="checkbox" piste-id="${piste.id}" ${piste.state === '1' ? 'checked' : ''}>
                                                    <span class="slider round"></span>
                                                </label>
                                            </div>
                                            <div class="comment-svg"><img src="/projet-webdev/sql/posts/comment.svg" width="auto" height="auto" onclick="displayPosts(${piste.id})"></div>
                                            <div id="post-container-${piste.id}"></div>
                                            `;


                    switch (piste.color) {
                        case 'Verte':
                            pistes_vertes.appendChild(new_piste);
                            break;
                        case 'Bleue':
                            pistes_bleues.appendChild(new_piste);
                            break;
                        case 'Rouge':
                            pistes_rouges.appendChild(new_piste);
                            break;
                        case 'Noire':
                            pistes_noires.appendChild(new_piste);
                            break;
                    }
                    setTimeout(function () {
                        new_piste.classList.add("piste-container-show");
                    }, 10);
                });

                await sleep(200); //Timeout for the switch transition effect
                let checkboxes = document.querySelectorAll("#pistes input[type='checkbox']");

                checkboxes.forEach(function (checkbox) {
                    checkbox.addEventListener('change', function () {
                        updatePisteState(this.getAttribute("piste-id"), this.checked);
                    });
                });
            }
        }
    };

    xhr.send();
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function updatePisteState(pisteId, newState) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/projet-webdev/sql/pistes/updatePisteState.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    let request = {
        "state": newState,
        "id": pisteId
    };

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                //nothing
            } else {
                console.error("Failed to update piste state:", xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify(request));
}

window.refresh = function (){
    document.getElementById("pistes-vertes").innerHTML = "";
    document.getElementById("pistes-bleues").innerHTML = "";
    document.getElementById("pistes-rouges").innerHTML = "";
    document.getElementById("pistes-noires").innerHTML = "";
    getPistes();
}

window.goToRemontees = function () {
    window.location.href = "/projet-webdev/dashboard/remontees";
};

window.goToChat = function () {
    window.location.href = "/projet-webdev/dashboard/chat";
}

window.logout = function () {
    localStorage.clear();
    window.location.href = "/projet-webdev/login";
};

window.getPistes = getPistes;
window.displayPosts = displayPosts;

getPistes();
