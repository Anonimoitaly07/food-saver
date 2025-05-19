<?php
header("Content-Type: application/json");
include_once 'config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    if($db) {
        echo json_encode([
            "status" => true,
            "message" => "Database connection successful"
        ]);
    } else {
        echo json_encode([
            "status" => false,
            "message" => "Failed to connect to database"
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        "status" => false,
        "message" => "Error: " . $e->getMessage()
    ]);
}
?>