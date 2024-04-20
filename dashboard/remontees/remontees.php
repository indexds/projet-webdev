<html>

<head>
    <title>Station Kaka - Pistes</title>
    <link href="/projet-webdev/dashboard/remontees/remontees.css" rel="stylesheet" type="text/css" />
    <link href="/projet-webdev/dashboard/remontees/switch.css" rel="stylesheet" type="text/css" />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💩</text></svg>">
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

<script async src = "/projet-webdev/dashboard/remontees/remontees.js"></script>
</html>