<?php
header('Content-Type: application/json');

$db_server = "localhost";
$db_user = "root";
$db_passwd = "";
$db_name = "station_kaka";


$post = json_decode(file_get_contents('php://input'), true);

$id_piste = $post["id_piste"];

$conn = new mysqli($db_server, $db_user, $db_passwd, $db_name);

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
