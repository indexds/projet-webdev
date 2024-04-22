<html>

<head>
    <title>Station Kaka - Pistes</title>
    <link href="/projet-webdev/dashboard/pistes/pistes.css" rel="stylesheet" type="text/css" />
    <link href="/projet-webdev/dashboard/switch.css" rel="stylesheet" type="text/css" />
    <link href="/projet-webdev/sql/posts/posts.css" rel="stylesheet" type="text/css" />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💩</text></svg>">
    <div class="header">
        <div class="buttons">
            <button id="refresh" onclick="refresh()">Refresh</button>
            <button id="remontees" onclick="goToRemontees()">Remontées</button>
            <button id="chat" onclick="goToChat()">Chat</button>
            <button id="logout" onclick="logout()">Logout</button>
        </div>
    </div>
</head>

<body>
    <div class="margin">
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
    </div>
</body>

<script type="module" src="/projet-webdev/dashboard/pistes/pistes.js"></script>
</html>