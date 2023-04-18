<?php
if ((!isset($_POST['login'], $_POST['password'])))
{
    header('Location: index');
    exit();
}
session_start();
require_once "phpconnect.php";
$database_name = "firstsystem";
$conn = mysqli_connect($hostname, $username, $passwordD, $database_name);

if(isset($_POST['login'], $_POST['password'])) {
  $login = mysqli_real_escape_string($conn, $_POST['login']);
  $password = $_POST['password'];
  
  $query = "SELECT * FROM login WHERE Login = '$login'";
  $result = mysqli_query($conn, $query);

  if (mysqli_num_rows($result) == 1) {
    $user = mysqli_fetch_assoc($result);
    if (password_verify($password, $user['Password'])) {
      $_SESSION['user_id'] = $user['ID'];
      header('Location: index.php');
      exit;
    } else {
      echo "Nieprawidłowy Login lub Hasło.";
      exit;
    }
  } else {
    echo "Nieprawidłowy Login lub Hasło.";
    exit;
  }
}
?>