<?php
header('Content-Type: application/json');

include_once ($_SERVER["DOCUMENT_ROOT"] . "/projet-webdev/sql/config.php");

$conn = new mysqli(DB_SERVER, DB_USER, DB_PASSWD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode("Couldn't connect to database!");
    die();
}

$reqwest = $conn->query("SELECT remontees.id, remontees.name AS remontee_name, remontees.state AS remontee_state, pistes.name AS piste_name, pistes.state AS piste_state FROM remontees LEFT JOIN join_table AS jt ON remontees.id = jt.id_remontee LEFT JOIN pistes ON jt.id_piste = pistes.id;");

if ($reqwest->num_rows > 0) {
    while ($row = $reqwest->fetch_assoc()) {

        $pistes[] = array(
            "id" => $row["id"],
            "remontee_name" => $row["remontee_name"],
            "remontee_state" => $row["remontee_state"],
            "piste_name" => $row["piste_name"],
            "piste_state" => $row["piste_state"]

        );
    }
}
echo json_encode($pistes);

$conn->close();
