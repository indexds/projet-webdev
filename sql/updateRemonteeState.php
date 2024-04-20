<?php
header('Content-Type: application/json');

$db_server = "localhost";
$db_user = "root";
$db_passwd = "";
$db_name = "station_kaka";

$post = json_decode(file_get_contents('php://input'), true);
$conn = new mysqli($db_server, $db_user, $db_passwd, $db_name);

if ($conn->connect_error) {
    echo json_encode("Couldn't connect to database!");
    die();
}

$reqwest = $conn->prepare("UPDATE remontees SET state = ? WHERE id = ?");
$reqwest->bind_param("ss", $post["state"], $post["id"]);
$reqwest->execute();

$reqwest->close();
$conn->close();
