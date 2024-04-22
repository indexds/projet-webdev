<?php
header('Content-Type: application/json');

include_once ($_SERVER["DOCUMENT_ROOT"] . "/projet-webdev/sql/config.php");

$post = json_decode(file_get_contents('php://input'), true);

$login = $post["login"];
$passwd = $post["password"];

$conn = new mysqli(DB_SERVER, DB_USER, DB_PASSWD, DB_NAME);

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
