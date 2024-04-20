<html>

<head>
    <title>Station 💩 - Pistes</title>
    <link href="/projet-webdev/dashboard/pistes/pistes.css" rel="stylesheet" type="text/css" />
    <link href="/projet-webdev/dashboard/pistes/switch.css" rel="stylesheet" type="text/css" />
    <div class="header">
        <div class="buttons">
            <button id="refresh" onclick="getRemontees()">Refresh</button>
            <button id="remontees" onclick="goToPistes()">Pistes</button>
            <button id="logout" onclick="logout()">Logout</button>
        </div>
    </div>
</head>

<body>
    <div class="margin">
        <div id="remontees"></div>
    </div>
</body>

<script async src = "/projet-webdev/dashboard/pistes/pistes.js"></script>
</html>