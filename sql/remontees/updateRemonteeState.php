<?php
header('Content-Type: application/json');

include_once ($_SERVER["DOCUMENT_ROOT"] . "/projet-webdev/sql/config.php");

$post = json_decode(file_get_contents('php://input'), true);

$conn = new mysqli(DB_SERVER, DB_USER, DB_PASSWD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode("Couldn't connect to database!");
    die();
}

$reqwest = $conn->prepare("UPDATE remontees SET state = ? WHERE id = ?");
$reqwest->bind_param("ss", $post["state"], $post["id"]);
$reqwest->execute();

$reqwest->close();
$conn->close();
