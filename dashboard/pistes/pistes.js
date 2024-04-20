async function getPistes() {
    let pistes_vertes = document.getElementById("pistes-vertes");
    let pistes_bleues = document.getElementById("pistes-bleues");
    let pistes_rouges = document.getElementById("pistes-rouges");
    let pistes_noires = document.getElementById("pistes-noires");

    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/projet-webdev/sql/sql_getPistes.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = async function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);

                let [html_vertes, html_bleues, html_rouges, html_noires] = ['', '', '', ''];

                response.forEach(function (piste) {
                    let html = `<div class="piste-container">
                                <div class="piste-texte">${piste.name}</div>
                                <label class="switch">
                                    <input type="checkbox" piste-id="${piste.id}" ${piste.state === '1' ? 'checked' : ''}>
                                    <span class="slider round"></span>
                                </label>
                                </div>`;

                    switch (piste.color) {
                        case 'Verte':
                            html_vertes += html;
                            break;
                        case 'Bleue':
                            html_bleues += html;
                            break;
                        case 'Rouge':
                            html_rouges += html;
                            break;
                        case 'Noire':
                            html_noires += html;
                            break;
                    }
                });

                await (sleep(200));
                pistes_vertes.innerHTML = html_vertes;
                pistes_bleues.innerHTML = html_bleues;
                pistes_rouges.innerHTML = html_rouges;
                pistes_noires.innerHTML = html_noires;



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

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function updatePisteState(pisteId, newState) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/projet-webdev/sql/sql_updateState.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    let request = {
        "state": newState,
        "id": pisteId
    };

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                getPistes();
            } else {
                console.error("Failed to update piste state:", xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify(request));
}

function goToRemontees(){
    window.location.href = "/projet-webdev/dashboard/remontees";
}

getPistes();