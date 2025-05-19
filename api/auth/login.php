<?php
// Abilita CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Connessione al database
$servername = "localhost";
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

// Ottieni i dati dalla richiesta
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode([
        "status" => false,
        "message" => "Username e password sono richiesti"
    ]);
    exit();
}

$username = $conn->real_escape_string($data['username']);
$password = $data['password'];

// Query per verificare le credenziali
$sql = "SELECT id, username, email, password, role, created_at FROM users WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // Verifica la password
    if (password_verify($password, $user['password'])) {
        // Rimuovi la password dall'oggetto utente
        unset($user['password']);
        
        echo json_encode([
            "status" => true,
            "message" => "Login effettuato con successo",
            "user" => $user
        ]);
    } else {
        echo json_encode([
            "status" => false,
            "message" => "Password non valida"
        ]);
    }
} else {
    echo json_encode([
        "status" => false,
        "message" => "Utente non trovato"
    ]);
}

$conn->close();
?>