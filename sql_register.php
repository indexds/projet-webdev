<?php
header('Content-Type: application/json');

$db_server = "localhost";
$db_user = "root";
$db_passwd = "";
$db_name = "users";

$post = json_decode(file_get_contents('php://input'), true);
$login = $post["login"];
if (!isset($login) || empty($login)) {
    $error = "Invalid login.";
    echo json_encode(array("error" => $error));
    die();
}
$passwd = $post["password"];
if (!isset($passwd) || empty($passwd)) {
    $error = "Invalid Password.";
    echo json_encode(array("error" => $error));
    die();
}

$conn = new mysqli($db_server, $db_user, $db_passwd, $db_name);

if ($conn->connect_error) {
    echo json_encode(array("error" => "Couldn't connect to database!"));
    die();
}

$reqwest = "SELECT login from users WHERE login = '$login' AND password = '$passwd'";
$result = $conn->query($reqwest);

$row = $result->fetch_assoc();
if ($row && $row["login"] == $login) {
    echo json_encode("Register Successful!");
} else {
    echo json_encode("Invalid credentials!");
}

$conn->close();
