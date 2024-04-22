<?php
header('Content-Type: application/json');

include_once ($_SERVER["DOCUMENT_ROOT"] . "/projet-webdev/sql/config.php");

$conn = new mysqli(DB_SERVER, DB_USER, DB_PASSWD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode("Couldn't connect to database!");
    die();
}

//Reqwest
$reqwest = $conn->query("SELECT * from pistes");

if ($reqwest->num_rows > 0) {
    while ($row = $reqwest->fetch_assoc()) {

        $pistes[] = array(
            "id" => $row["id"],
            "name" => $row["name"],
            "color" => $row["color"],
            "state" => $row["state"]
        );
    }
}
echo json_encode($pistes);

$conn->close();
