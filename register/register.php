<html>

<head>
    <title>Station 💩 - Register</title>
    <link href="/projet-webdev/register/register.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <div class="header"></div>
    <div class="login-container">
        <h1>Station 💩</h1>
        <strong><div class="response" id="response"></div></strong>

        <input type="text" placeholder="Login" name="login" id="login">
        <input type="password" placeholder="Password" name="password" id="password">
        <input type="password" placeholder="Confirm Password" name="confirm-password" id="confirm-password">

        <button class="button-container" onclick="validateRegister()">Register</button>
        <button class="button-container" onclick="goToLogin()">Login</button>
    </div>
</body>
<script async src="/projet-webdev/register/register.js"></script>
</html>