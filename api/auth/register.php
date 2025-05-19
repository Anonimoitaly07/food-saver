<?php
// Headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Includi i file di connessione
include_once '../config/database.php';

// Ottieni connessione al database
$database = new Database();
$db = $database->getConnection();

// Ottieni i dati inviati
$data = json_decode(file_get_contents("php://input"));

// Verifica che i dati necessari siano presenti
if(!empty($data->username) && !empty($data->password) && !empty($data->email)) {
    
    // Verifica se l'utente esiste già
    $check_query = "SELECT id FROM users WHERE username = :username OR email = :email LIMIT 0,1";
    $check_stmt = $db->prepare($check_query);
    $check_stmt->bindParam(":username", $data->username);
    $check_stmt->bindParam(":email", $data->email);
    $check_stmt->execute();
    
    if($check_stmt->rowCount() > 0) {
        // Utente già esistente
        http_response_code(409);
        echo json_encode(array("status" => false, "message" => "Registrazione fallita. Username o email già in uso."));
    } else {
        // Query per inserire il nuovo utente
        $query = "INSERT INTO users SET username = :username, password = :password, email = :email, role = :role";
        $stmt = $db->prepare($query);
        
        // Sanitizza e prepara i dati
        $username = htmlspecialchars(strip_tags($data->username));
        $email = htmlspecialchars(strip_tags($data->email));
        $password = password_hash($data->password, PASSWORD_BCRYPT);
        $role = "user"; // Default role
        
        // Binding
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":password", $password);
        $stmt->bindParam(":role", $role);
        
        // Esegui query
        if($stmt->execute()) {
            // Registrazione riuscita
            http_response_code(201);
            echo json_encode(array("status" => true, "message" => "Registrazione completata con successo."));
        } else {
            // Errore nella registrazione
            http_response_code(503);
            echo json_encode(array("status" => false, "message" => "Impossibile completare la registrazione."));
        }
    }
} else {
    // Dati mancanti
    http_response_code(400);
    echo json_encode(array("status" => false, "message" => "Registrazione fallita. Dati mancanti."));
}
?>