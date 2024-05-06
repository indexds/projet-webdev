<?php
header('Content-Type: application/json');

include_once ($_SERVER["DOCUMENT_ROOT"] . "/projet-webdev/sql/config.php");

$post = json_decode(file_get_contents('php://input'), true);

$login = $post["login"];
$passwd = $post["password"];

$conn = new mysqli(DB_SERVER, DB_USER, DB_PASSWD, DB_NAME);

if ($conn->connect_error) {
    echo json_encode("Couldn't connect to database!");
    die();
}

$reqwest = $conn->prepare("SELECT id, password FROM users WHERE login = ?");
$reqwest->bind_param("s", $login);
$reqwest->execute();
$reqwest->store_result();
$reqwest->bind_result($id, $hash);
$reqwest->fetch();


if ($reqwest->num_rows() > 0 && password_verify($passwd, $hash)) {
    // Generate connection token
    $token = bin2hex(random_bytes(16));
    $token_expiration = 20 + time();

    // Update user token in db
    $updateToken = $conn->prepare("UPDATE users SET token = ?, token_expiration = ? WHERE id = ?");
    $updateToken->bind_param("sii", $token, $token_expiration, $id);
    $updateToken->execute();

    // Prepare the response
    $response = [
        "message" => "Login Successful!",
        "token" => $token
    ];

    echo json_encode($response);
} else {
    echo json_encode("Invalid credentials!");
}

$conn->close();
