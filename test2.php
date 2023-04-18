<!DOCTYPE html>
<html>
<head>
</head>
<body>
   <?PHP
   session_start();
   session_destroy();
   ?>
<!--<form method="post" action="loginSystem.php">-->
<form id="login-form" method="post">
  <label for="login">Nazwa użytkownika:</label>
  <input type="text" id="login" name="login">
  <br>
  <label for="password">Hasło:</label>
  <input type="password" id="password" name="password">
  <br>
  <input type="submit" value="Zaloguj">
</form>
<div id="out"></div>
<script type="text/javascript" src="./js/loginSys.js"></script>	
</body>
</html>