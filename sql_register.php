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

//SQL Injection prevention
$reqwest = $conn->prepare("INSERT INTO users (login, password) VALUES (?, ?)");
$reqwest->bind_param("ss", $login, $passwd);



if($reqwest->execute()) {
    echo json_encode("Registration Successful!");
} else {
    echo json_encode("Registration Failed!");
}

$reqwest->close();
$conn->close();
