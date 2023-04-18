var first_pole_wyboru = document.getElementById("first_pole_wyboru");
const element2 = document.querySelector('.bt');
element2.addEventListener("click", function(event){
  ściemnienie.style.visibility = "visible";
  first_pole_wyboru.innerHTML= '<form id="login-form" method="post"><label for="login">Nazwa użytkownika:</label><br><input type="text" id="login" name="login"><br><label for="password">Hasło:</label><br><input type="password" id="password" name="password"><br><input type="submit" value="Zaloguj"></form>';
});