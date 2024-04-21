<?php
header('Content-Type: application/json');

$db_server = "localhost";
$db_user = "root";
$db_passwd = "";
$db_name = "station_kaka";

$post = json_decode(file_get_contents('php://input'), true);

$login = $post["login"];
$passwd = $post["password"];

$conn = new mysqli($db_server, $db_user, $db_passwd, $db_name);

if ($conn->connect_error) {
    echo json_encode("Couldn't connect to database!");
    die();
}

$hash = password_hash($passwd, PASSWORD_DEFAULT);

$reqwest = $conn->prepare("INSERT INTO users (login, password) VALUES (?, ?)");
$reqwest->bind_param("ss", $login, $hash);


try {
    $reqwest->execute();
    echo json_encode("Registration Successful!");
}
catch (mysqli_sql_exception $e){
    echo json_encode("Login already exists!");
}

$reqwest->close();
$conn->close();
