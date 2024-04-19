<?php
header('Content-Type: application/json');

$db_server = "localhost";
$db_user = "root";
$db_passwd = "";
$db_name = "users";

$post = json_decode(file_get_contents('php://input'), true);

$login = $post["login"];
$passwd = $post["password"];

$conn = new mysqli($db_server, $db_user, $db_passwd, $db_name);

if ($conn->connect_error) {
    echo json_encode("Couldn't connect to database!");
    die();
}

//Reqwest
$reqwest = $conn->prepare("SELECT password from users WHERE login = ?");
$reqwest->bind_param("s", $login);
$reqwest->execute();
$reqwest->store_result();
$reqwest->bind_result($hash);
$reqwest->fetch();


if ($reqwest->num_rows() > 0 && password_verify($passwd, $hash)) {
    echo json_encode("Login Successful!");
} else {
    echo json_encode("Invalid credentials!");
}

$conn->close();
