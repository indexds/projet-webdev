<?php
header('Content-Type: application/json');

include_once ($_SERVER["DOCUMENT_ROOT"] . "/projet-webdev/sql/config.php");

$post = json_decode(file_get_contents('php://input'), true);

$id_piste = $post["id_piste"];
$content = $post["content"];
$login = $post["login"];
$token = $post["token"];

$conn = new mysqli(DB_SERVER, DB_USER, DB_PASSWD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode("Couldn't connect to database!");
    die();
}

//Checking user identity
$reqwest = $conn->prepare("SELECT users.login FROM users WHERE users.token = ?");
$reqwest->bind_param("s", $token);
$reqwest->execute();
$reqwest->store_result();
$reqwest->bind_result($resulting_login);
$reqwest->fetch();

if ($resulting_login != $login) {
    echo json_encode("Invalid token!");
    die();
}

//Actual request
$reqwest = $conn->prepare("INSERT INTO posts (id_piste, content, id_user) VALUES (?, ?, (SELECT id FROM users WHERE login = ?))");
$reqwest->bind_param("iss", $id_piste, $content, $login);
$reqwest->execute();

$conn->close();