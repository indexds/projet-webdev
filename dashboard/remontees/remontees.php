<html>

<head>
    <title>Station 💩 - Remontées</title>
    <link href="/projet-webdev/dashboard/remontees/remontees.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <div class="header">
        <div class="buttons">
            <button id="refresh" onclick="getRemontees()">Refresh</button>
            <button id="remontees" onclick="goToPistes()">Pistes</button>
            <button id="logout" onclick="logout()">Logout</button>
        </div>
    </div>
    <div id="remontees"></div>

</body>
<script async src = "/projet-webdev/dashboard/remontees/remontees.js"></script>
</html>