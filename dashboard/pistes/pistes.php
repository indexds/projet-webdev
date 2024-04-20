<html>

<head>
    <title>Station 💩 - Pistes</title>
    <link href="/projet-webdev/dashboard/pistes/pistes.css" rel="stylesheet" type="text/css" />
    <link href="/projet-webdev/dashboard/pistes/switch.css" rel="stylesheet" type="text/css" />
    <div class="header">
        <div class="buttons">
            <button id="refresh" onclick="getPistes()">Refresh</button>
            <button id="remontees" onclick="goToRemontees()">Remontées</button>
            <button id="logout" onclick="logout()">Logout</button>
        </div>
    </div>
</head>

<body>

    <div id="pistes">
        <div class="piste-divider">
            <div class="piste-title">Pistes Vertes</div>
            <div class="piste-type-container" id="pistes-vertes"></div>
        </div>

        <div class="piste-divider">
            <div class="piste-title">Pistes Bleues</div>
            <div class="piste-type-container" id="pistes-bleues"></div>
        </div>

        <div class="piste-divider">
            <div class="piste-title">Pistes Rouges</div>
            <div class="piste-type-container" id="pistes-rouges"></div>
        </div>

        <div class="piste-divider">
            <div class="piste-title">Pistes Noires</div>
            <div class="piste-type-container" id="pistes-noires"></div>
        </div>
    </div>
</body>

<script async src = "/projet-webdev/dashboard/pistes/pistes.js"></script>
</html>