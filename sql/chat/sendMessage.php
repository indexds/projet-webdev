<?php
header('Content-Type: application/json');

include_once ($_SERVER["DOCUMENT_ROOT"] . "/projet-webdev/sql/config.php");

$post = json_decode(file_get_contents('php://input'), true);

$content = $post["content"];
$login = $post["login"];
$token = $post["token"];

$conn = new mysqli(DB_SERVER, DB_USER, DB_PASSWD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode("Couldn't connect to database!");
    die();
}

$time = time();
//Checking user identity
$reqwest = $conn->prepare("SELECT users.login FROM users WHERE users.token = ? AND ? < users.token_expiration");
$reqwest->bind_param("si", $token, $time);
$reqwest->execute();
$reqwest->store_result();
$reqwest->bind_result($resulting_login);
$reqwest->fetch();

if ($resulting_login != $login) {
    echo json_encode("INVALID_TOKEN");
    die();
}

//Actual request
$reqwest = $conn->prepare("INSERT INTO messages (content, id_user) VALUES (?, (SELECT id FROM users WHERE login = ?))");
$reqwest->bind_param("ss", $content, $login);
$reqwest->execute();

$conn->close();