async function getRemontees() {

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/projet-webdev/sql/getRemontees.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = async function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);

                let html = '';

                response.forEach(function (remontee) {
                    html += `<div class="remontee-container">
                                    <div class="remontee-texte">${remontee.name}</div>
                                    <div class="switch-position">
                                        <label class="switch">
                                            <input type="checkbox" remontee-id="${remontee.id}" ${remontee.state === '1' ? 'checked' : ''}>
                                            <span class="slider round"></span>
                                        </label>
                                    </div>
                                </div>`;
                });

                await sleep(200);
                document.getElementById("remontees").innerHTML = html;



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
    xhr.open("POST", "/projet-webdev/sql/updateRemonteeState.php", true);
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

    xhr.send(JSON.stringify(request));
}

function goToPistes() {
    window.location.href = "/projet-webdev/dashboard/pistes";
}

function logout(){
    window.location.href = "/projet-webdev/login";
}

getRemontees();