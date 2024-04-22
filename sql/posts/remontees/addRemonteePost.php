<?php
header('Content-Type: application/json');

$db_server = "localhost";
$db_user = "root";
$db_passwd = "";
$db_name = "station_kaka";


$post = json_decode(file_get_contents('php://input'), true);

$id_remontee = $post["id_remontee"];
$content = $post["content"];
$login = $post["login"];
$token = $post["token"];

$conn = new mysqli($db_server, $db_user, $db_passwd, $db_name);

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
$reqwest = $conn->prepare("INSERT INTO posts (id_remontee, content, id_user) VALUES (?, ?, (SELECT id FROM users WHERE login = ?))");
$reqwest->bind_param("iss", $id_remontee, $content, $login);
$reqwest->execute();

$conn->close();