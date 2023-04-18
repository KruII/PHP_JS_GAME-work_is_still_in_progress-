var first_pole_wyboru = document.getElementById("first_pole_wyboru");
var second_pole_wyboru = document.getElementById("second_pole_wyboru");

var ściemnienie = document.getElementById("ściemnienie");
var pole_wszelkich_opcji = document.getElementById("pole-wszelkich-opcji");
ściemnienie.addEventListener("click", function(event){
  if (!pole_wszelkich_opcji.contains(event.target)){
  ściemnienie.style.visibility = "hidden";}
});

var settings_container = document.getElementById("settings-container");
settings_container.addEventListener("click", function(event){
  ściemnienie.style.visibility = "visible";
  second_pole_wyboru.innerHTML= "Ustawienia";
  first_pole_wyboru.innerHTML= '';
});

var information_container = document.getElementById("information-container");
information_container.addEventListener("click", function(event){
  ściemnienie.style.visibility = "visible";
  second_pole_wyboru.innerHTML= "Informacje";
  first_pole_wyboru.innerHTML= '<a href="https://github.com/kruii" class="button" target="_blank">GitHub</a><br><br><a href="" class="button">Portfolio</a>';
});