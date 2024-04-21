let pistes = document.querySelectorAll(".piste-container");
pistes.forEach(function (piste) {
    piste.addEventListener('click', function () {
        console.log("bite");
    });
});

console.log("caca");