<html>

<head>
    <title>Station Kaka - Login</title>
    <link href="/projet-webdev/login/login.css" rel="stylesheet" type="text/css" />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💩</text></svg>">
</head>

<body>
    <div class="header"></div>
    <div id="login-container">
        <h1>Station 💩</h1>
        <strong><div class="response" id="response"></div></strong>
        <input type="text" placeholder="Login" name="login" id="login">
        <input type="password" placeholder="Password" name="password" id="password">

        <button class="button-container" onclick=validateLogin()>Login</button>
        <button class="button-container" onclick=goToRegister()>Register</button>
    </div>
</body>
<script async src = "/projet-webdev/login/login.js"></script>
</html>