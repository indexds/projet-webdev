function getPistes() {
    let pistes = document.getElementById("pistes");
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/projet-webdev/sql/sql_getPistes.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);


                // Clear previous content
                pistes.innerHTML = '';
                // Build HTML string
                let html = '';
                response.forEach(function (piste) {
                    html += "<p>" + piste.id + "<br>" + piste.name + "<br>" + piste.color + "<br>" + piste.state + "</p>";

                });
                pistes.innerHTML = html;
            } else {
                if (xhr.status === 0) {
                    console.error("Network error occurred");
                } else {
                    console.error("Error:", xhr.statusText);
                }
            }
        }
    };

    xhr.send();
}

getPistes();