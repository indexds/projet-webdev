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

$reqwest = "SELECT login from users WHERE login = '$login' AND password = '$passwd'";
$result = $conn->query($reqwest);

$row = $result->fetch_assoc();
if ($row && $row["login"] == $login) {
    echo json_encode("Login Successful!");
} else {
    echo json_encode("Invalid credentials!");
}

$conn->close();
