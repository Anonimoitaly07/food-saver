<?php
// Abilita CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Connessione al database
$servername = "localhost"; // Fixed typo from "locahost"
$username = "root"; // Sostituisci con il tuo username
$password = ""; // Sostituisci con la tua password
$dbname = "fivem"; // Sostituisci con il nome del tuo database

// Crea connessione
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica connessione
if ($conn->connect_error) {
    echo json_encode([
        "status" => false,
        "message" => "Errore di connessione al database: " . $conn->connect_error
    ]);
    exit();
}

// Query per ottenere tutti gli utenti
$sql = "SELECT id, username, email, role, created_at FROM users ORDER BY id DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    
    echo json_encode([
        "status" => true,
        "users" => $users
    ]);
} else {
    echo json_encode([
        "status" => true,
        "users" => []
    ]);
}

$conn->close();
?>