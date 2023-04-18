<?php
if ((!isset($_POST['login'], $_POST['email'], $_POST['password'])))
{
    header('Location: index');
    exit();
}
require_once "phpconnect.php";
$database_name = "firstsystem";
$conn = mysqli_connect($hostname, $username, $passwordD, $database_name);

if (isset($_POST['login'], $_POST['email'], $_POST['password'])) {
  $login = mysqli_real_escape_string($conn, $_POST['login']);
  $email = mysqli_real_escape_string($conn, $_POST['email']);
  $password = $_POST['password'];

  $query = "SELECT * FROM login WHERE Login = '$login' OR Email = '$email'";
  $result = mysqli_query($conn, $query);
  
  if (mysqli_num_rows($result) > 0) {
    echo "Podana nazwa użytkownika lub adres e-mail jest już zarejestrowany.";
    exit;
  }
  
  if ($password === $email || $password === $login) {
    echo "Hasło nie może być takie same jak adres e-mail lub nazwa użytkownika.";
    exit;
  }

  $error = "";
  if (!ctype_alnum($login)) {
    $error .= "Nazwa użytkownika musi zawierać tylko litery i cyfry.";
  }
  if (!preg_match("/^[a-zA-Z0-9]+$/", $username)) {
    $error .= "Nazwa użytkownika musi zawierać tylko litery i cyfry.\n";
  }
  if (!empty($error)) {
    echo $error;
    exit;
  }
  
  $error = "";
  if (strlen($login) < 4) {
    $error .= "Nazwa urzytkownika musi zawierać co najmniej 4 znaki.\n";
  }
  if (strlen($password) < 8) {
    $error .= "Hasło musi zawierać co najmniej 8 znaków.\n";
  }
  if (!preg_match("#[0-9]+#", $password)) {
    $error .= "Hasło musi zawierać co najmniej jedną cyfrę.\n";
  }
  if (!preg_match("#[A-Z]+#", $password)) {
    $error .= "Hasło musi zawierać co najmniej jedną dużą literę.\n";
  }
  if (!preg_match("#[a-z]+#", $password)) {
    $error .= "Hasło musi zawierać co najmniej jedną małą literę.\n";
  }
  if (!preg_match("#\W+#", $password)) {
    $error .= "Hasło musi zawierać co najmniej jeden znak specjalny.\n";
  }
  
  if (!empty($error)) {
    echo $error;
    exit;
  }
  $password = password_hash($password, PASSWORD_DEFAULT);
  
  $sql = "INSERT INTO login (Login, Password, Email) VALUES ('$login', '$password', '$email')";
  if (mysqli_query($conn, $sql)) {
    //echo "Rejestracja zakończona pomyślnie!";
  } else {
    echo "Błąd podczas rejestracji: " . mysqli_error($conn);
  }
  $friendsusers = "friendsusers";
  $connS = mysqli_connect($hostname, $username, $passwordD, $friendsusers);
  if (!$connS) {
    die("Połączenie nie powiodło się: " . mysqli_connect_error());
  }
  $sqlSearch = "SELECT ID FROM login WHERE Login='$login' AND Password='$password' AND Email='$email'";
  $resultS = mysqli_query($conn, $sqlSearch);
  $user = mysqli_fetch_assoc($resultS);
  $user_id = $user['ID'];
  $table_name = "user_" . $user_id;

  $sqlSearch = "CREATE TABLE $table_name (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                ID_friend INT NOT NULL,
                username TEXT NOT NULL,
                note TEXT NOT NULL,
                friendsAddTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )";
  if (mysqli_query($connS, $sqlSearch)) {
    #echo "Rejestracja zakończona pomyślnie!";
  } else {
    echo "Błąd podczas rejestracji: " . mysqli_error($connS);
  }
}
$user_data = "dane_gracza";
$sqlSearchD = "INSERT INTO $user_data (ID) VALUES ($user_id)";
if (mysqli_query($conn, $sqlSearchD)) {
  echo "Rejestracja zakończona pomyślnie!";
} else {
  echo "Błąd podczas rejestracji: " . mysqli_error($conn);
}

mysqli_close($conn);
mysqli_close($connS);
?>