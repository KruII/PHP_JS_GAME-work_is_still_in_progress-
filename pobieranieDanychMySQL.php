<?php
session_start();
require_once "phpconnect.php";
$database_name = "firstsystem";
$conn = mysqli_connect($hostname, $username, $passwordD, $database_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$idUser = $_SESSION['user_id'];
// zapytanie do bazy danych
$sql = "SELECT Nick FROM dane_gracza WHERE ID=$idUser";

$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);

// przesłanie wyników do skryptu JavaScript
echo $row['Nick'];
?>