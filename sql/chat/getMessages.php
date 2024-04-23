<?php
header('Content-Type: application/json');

include_once ($_SERVER["DOCUMENT_ROOT"] . "/projet-webdev/sql/config.php");

$conn = new mysqli(DB_SERVER, DB_USER, DB_PASSWD, DB_NAME);

$post = json_decode(file_get_contents('php://input'), true);

$last_received_id = isset($post["last_received_id"]) ? (int) $post["last_received_id"] : 0;

if ($conn->connect_error) {
    echo json_encode("Couldn't connect to the database!");
    die();
}

$reqwest = $conn->prepare("SELECT messages.id AS id, messages.content AS content, messages.date AS date, users.login AS login FROM messages JOIN users ON messages.id_user = users.id WHERE messages.id > ? ORDER BY date ASC");
$reqwest->bind_param("i", $last_received_id);

$messages = [];

while (true) {
    $reqwest->execute();
    $result = $reqwest->get_result();

    while ($row = $result->fetch_assoc()) {
        $messages[] = array(
            "id" => $row['id'],
            "content" => $row['content'],
            "date" => $row['date'],
            "login" => $row['login']
        );
    }

    if (count($messages) > 0) {
        echo json_encode($messages);
        break;
    } else {
        sleep(1);
    }
}

$conn->close();
