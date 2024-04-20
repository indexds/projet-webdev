async function getRemontees() {
    let pistes = document.getElementById("pistes");
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/projet-webdev/sql/sql_getRemontees.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = async function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                let html = '';

                response.forEach(function (piste) {
                    html += "<div>" + piste.name + "</div>";
                    html += "<div>" + piste.color + "</div>";
                    html += '<label class="switch"><input type="checkbox" piste-id="' + piste.id + '" ' + (piste.state === '1' ? 'checked' : '') + '><span class="slider round"></span></label>';
                    html += "<br>";
                });

                await (sleep(200));
                pistes.innerHTML = html;

                let checkboxes = document.querySelectorAll("#pistes input[type='checkbox']");

                checkboxes.forEach(function (checkbox) {
                    checkbox.addEventListener('change', function () {
                        updateRemonteeState(this.getAttribute("piste-id"), this.checked);
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

async function updateRemonteeState(pisteId, newState) {
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

function goToPistes() {
    window.location.href = "/projet-webdev/dashboard/pistes";
}

getRemontees();