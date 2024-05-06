<html>
<head>
    <title>Station Kaka - Chat</title>
    <link href="/projet-webdev/dashboard/chat/chat.css" rel="stylesheet" type="text/css" />
    <link href="/projet-webdev/main.css" rel="stylesheet" type="text/css" />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💩</text></svg>">

    <div class="header">
        <div class="buttons">
            <button id="refresh" onclick="refresh()">Refresh</button>
            <button id="pistes" onclick="goToPistes()">Pistes</button>
            <button id="chat" onclick="goToRemontees()">Remontées</button>
            <button id="logout" onclick="logout()">Logout</button>
        </div>
    </div>
</head>

<body>
    <div id="chat-box"></div>
    <input type="text" placeholder="Message.." id="message-input">
</body>

<script type="module" src="/projet-webdev/dashboard/chat/chat.js"></script>
</html>