<?php
header('Content-Type: application/json');

$db_server = "localhost";
$db_user = "root";
$db_passwd = "";
$db_name = "station_kaka";

$conn = new mysqli($db_server, $db_user, $db_passwd, $db_name);

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
