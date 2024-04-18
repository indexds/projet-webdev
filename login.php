<html>

<head>
    <title>WazeLite</title>
    <link href="login.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <div class="header">
    </div>
    <div class="login-container">
        <h1>Station 💩</h1>
        <strong><div class="response" id="response" ></div></strong>

        <input type="text" placeholder="Login" name="login" id="login">
        <input type="password" placeholder="Password" name="password" id="password">

        <button class="button-container" onclick=validateForm()>Login</button>
        <button class="button-container" onclick=goToRegister()>Register</button>
    </div>
</body>

<script async src = "login.js"></script>
</html>