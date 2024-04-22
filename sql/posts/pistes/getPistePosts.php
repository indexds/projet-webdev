<?php
header('Content-Type: application/json');

include_once ($_SERVER["DOCUMENT_ROOT"] . "/projet-webdev/sql/config.php");

$post = json_decode(file_get_contents('php://input'), true);

$id_piste = $post["id_piste"];

$conn = new mysqli(DB_SERVER, DB_USER, DB_PASSWD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode("Couldn't connect to database!");
    die();
}

//Reqwest
$reqwest = $conn->prepare("SELECT posts.content, posts.date, users.login FROM posts JOIN users ON posts.id_user = users.id WHERE posts.id_piste = ?;");
$reqwest->bind_param("s", $id_piste);
$reqwest->execute();
$reqwest->store_result();
$reqwest->bind_result($content, $date, $user);

$comments = [];

if ($reqwest->num_rows > 0) {
    while ($reqwest->fetch()) {
        $comments[] = array(
            "content" => $content,
            "date" => $date,
            "login" => $user
        );
    }
}

echo json_encode($comments);

$conn->close();
