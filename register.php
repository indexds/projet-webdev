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
        <div class="response" id="response"></div>
        <input type="text" placeholder="Login" name="login" id="login">
        <input type="password" placeholder="Password" name="password" id="password">
        <input type="password" placeholder="Confirm Password" name="confirm-password" id="confirm-password">

        <button class="button-container" onclick="checkPassword()">Register</button>
        <button class="button-container" onclick="goToLogin()">Login</button>
    </div>
</body>
<script async src="register.js"></script>

</html>