async function getPistes() {
    let pistes = document.getElementById("pistes");
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/projet-webdev/sql/sql_getPistes.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = async function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                let html = '';

                response.forEach(function (piste) {
                    html += "<div>" + piste.id + "</div>";
                    html += "<div>" + piste.name + "</div>";
                    html += "<div>" + piste.color + "</div>";
                    html += "<div>" + piste.state + "</div>";
                    html += '<label class="switch"><input type="checkbox" piste-id="' + piste.id + '" ' + (piste.state === '1' ? 'checked' : '') + '><span class="slider round"></span></label>';
                });
                await(sleep(300));
                pistes.innerHTML = html;

                // Attach event listeners to checkboxes
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

//black magic
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
                console.log("Piste state updated successfully!");
                // Reload pistes data and refresh UI
                getPistes();
            } else {
                console.error("Failed to update piste state:", xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify(request));
}
getPistes();