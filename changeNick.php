<?php
if ((!isset($_POST['nick'])))
{
    header('Location: index');
    exit();
}
session_start();
require_once "phpconnect.php";
$database_name = "firstsystem";
$conn = mysqli_connect($hostname, $username, $passwordD, $database_name);

if(isset($_POST['nick'])) {
    $nick = $_POST['nick'];
    $idUser = $_SESSION['user_id'];
    $error = "";
    if (!ctype_alnum($nick)) {
      $error .= "Nazwa użytkownika musi zawierać tylko litery i cyfry.";
    }
    if (!preg_match("/^[a-zA-Z0-9]+$/", $username)) {
      $error .= "Nazwa użytkownika musi zawierać tylko litery i cyfry.\n";
    }
    if (!empty($error)) {
      echo $error;
      exit;
    }
    $sql = "UPDATE dane_gracza SET Nick = '$nick' WHERE ID = $idUser";
    if (mysqli_query($conn, $sql)) {
        echo "Nick ustawiony pomyślnie";
    } else {
        echo "Błąd podczas aktualizacji rekordu: " . mysqli_error($conn);
    }
    
    // zamknięcie połączenia
    mysqli_close($conn);
}
?>