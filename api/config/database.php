<?php
class Database {
    private $host = "localhost";
    private $dbname = "fivem";
    private $username = "root"; // Cambia con il tuo username
    private $password = ""; // Cambia con la tua password
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->dbname, $this->username, $this->password);
            $this->conn->exec("set names utf8");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            // Return JSON error instead of echoing HTML
            header('Content-Type: application/json');
            echo json_encode([
                "status" => false,
                "message" => "Database connection error: " . $exception->getMessage()
            ]);
            exit();
        }

        return $this->conn;
    }
}
?>