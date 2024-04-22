<?php
header('Content-Type: application/json');

include_once ($_SERVER["DOCUMENT_ROOT"] . "/projet-webdev/sql/config.php");

$conn = new mysqli(DB_SERVER, DB_USER, DB_PASSWD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode("Couldn't connect to database!");
    die();
}

//Reqwest
$reqwest = $conn->query("SELECT messages.content AS content, messages.date AS date, users.login AS login FROM messages JOIN users ON messages.id_user = users.id");

if ($reqwest->num_rows > 0) {
    while ($row = $reqwest->fetch_assoc()) {

        $messages[] = array(
            "content" => $row["content"],
            "date" => $row["date"],
            "login" => $row["login"]
        );
    }
}
echo json_encode($messages);

$conn->close();
