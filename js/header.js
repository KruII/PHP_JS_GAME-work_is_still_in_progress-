var header = document.getElementById("header");

var first_pole_wyboru = document.getElementById("first_pole_wyboru");
var second_pole_wyboru = document.getElementById("second_pole_wyboru");

var clickniete = false;

var ściemnienie = document.getElementById("ściemnienie");
var pole_wszelkich_opcji = document.getElementById("pole-wszelkich-opcji");
ściemnienie.addEventListener("click", function(event){
  if (!pole_wszelkich_opcji.contains(event.target)){
  clickniete = false;
  ściemnienie.style.visibility = "hidden";
  clearInterval(dzialnie);
  textheader("Strona Główna");}
});

var settings_container = document.getElementById("settings-container");
settings_container.addEventListener("click", function(event){
  clickniete = true;
  ściemnienie.style.visibility = "visible";
  second_pole_wyboru.innerHTML= "Ustawienia";
  first_pole_wyboru.innerHTML= '';
  clearInterval(dzialnie);
  textheader("Ustawienia");
});
settings_container.addEventListener("mouseover", function(event) {
  clearInterval(dzialnie);
  textheader("Ustawienia");
});

settings_container.addEventListener("mouseout", function(event) {
  if(clickniete != true){
  clearInterval(dzialnie);
  textheader("Strona Główna");}
});

var information_container = document.getElementById("information-container");
information_container.addEventListener("click", function(event){
  clickniete = true;
  ściemnienie.style.visibility = "visible";
  second_pole_wyboru.innerHTML= "Informacje";
  first_pole_wyboru.innerHTML= '<a href="https://github.com/kruii" class="button" target="_blank">GitHub</a><br><br><a href="" class="button">Portfolio</a>';
  clearInterval(dzialnie);
  textheader("Informacje");
});
information_container.addEventListener("mouseover", function(event) {
  clearInterval(dzialnie);
  textheader("Informacje");
});

information_container.addEventListener("mouseout", function(event) {
  if(clickniete != true){
  clearInterval(dzialnie);
  textheader("Strona Główna");}
});


textheader("Witaj Na Stronie")

function textheader(words) {
  var colors = "white";
  var letterCount;
  var x = 1;
  var waiting = false;
  var target = document.getElementById('text-generator-start')
  var usuwamie = false;
  var idx = words.indexOf(target.innerHTML);
  if (target.innerHTML != "") {usuwamie = true;letterCount=target.innerHTML.length;}else{letterCount=1;}
  if(idx == 0){letterCount = idx + target.innerHTML.length+1;usuwamie = false}
  target.setAttribute('style', 'color:' + colors)
  dzialnie = window.setInterval(function() {
    if (usuwamie==true) {
      if (letterCount > 1){
        target.innerHTML = target.innerHTML.substring(0, letterCount);
        letterCount -= x;
      }else{
      usuwamie = false;}
    }
    else if (letterCount === 0){
      clearInterval(dzialnie);
      textheader("Strona Główna");      
    }
    else if (letterCount === words.length + 1 && waiting === false && words!="Witaj Na Stronie") {
      clearInterval(dzialnie);
    }
    else if (letterCount === words.length + 1 && waiting === false && words=="Witaj Na Stronie") {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 500)
    } else if (waiting === false) {
      target.innerHTML = words.substring(0, letterCount)
      letterCount += x;
      
    }

  }, 100)
};

const canvas = document.getElementById("loading-circle");
const ctx = canvas.getContext("2d");
const loadingCircle = document.querySelector(".loading-circle");
const element = document.querySelector('.outer');
const element2 = document.querySelector('.bt');
let degrees =135;
let loading = 100;
let loadingb =10;

canvas.width = 410;
canvas.height = 410;

ctx.lineWidth = 200;
ctx.strokeStyle = "black";


function drawLoadingCircle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2 * loading/100);
  degrees -= Math.PI * 2 * loading/100;
  loadingCircle.style.transform = `rotate(${degrees}deg)`; 
  ctx.stroke();

  if (loading === 100) {
    clearInterval(nowy2);
    element.classList.remove('gradientspin');
  } else {
    if (loadingb === 10) {
      element.classList.remove('active');
      element2.classList.remove('btactive');
      element2.classList.add('debtactive');
      
      loading += 1;
    }else{
      loadingb +=1;
    }
  }
}

function drawdeLoadingCircle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2 * loading/100);
  degrees -= Math.PI * 2 * loading/100;
  loadingCircle.style.transform = `rotate(${degrees}deg)`; 
  ctx.stroke();

  if (loading === 0) {
    if(loadingb === 0){
      element2.classList.remove('debtactive');
      element.classList.add('active')
      element2.classList.add('btactive');
      clearInterval(nowy);
      }else{
        loadingb -= 1;
      }
      loadingb -= 1;
  } else {
    loading -= 1;
    
  }
}

nowy2 = setInterval(drawLoadingCircle, 15);


element2.addEventListener("mouseover", function(event) {
  clearInterval(nowy2);
  nowy = setInterval(drawdeLoadingCircle, 15);
  element.classList.add('gradientspin');
  clearInterval(dzialnie);
  textheader("Login");
});

element2.addEventListener("mouseout", function(event) {
  clearInterval(nowy);
  nowy2 = setInterval(drawLoadingCircle, 15)
  if(clickniete != true){
    clearInterval(dzialnie);
    textheader("Strona Główna");}
});

element2.addEventListener("click", function(event){
  clickniete = true;
  ściemnienie.style.visibility = "visible";
  second_pole_wyboru.innerHTML= "Login";
  first_pole_wyboru.innerHTML= '<form id="login-form" method="post"><label for="login">Nazwa użytkownika:</label><br><input type="text" id="login" name="login"><br><label for="password">Hasło:</label><br><input type="password" id="password" name="password"><br><input type="submit" value="Zaloguj"></form>';
  document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var formData = new FormData(this);
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "loginSystem.php", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        if (xhr.responseText === "Nieprawidłowy Login lub Hasło.") {
        alert(xhr.responseText);
      }else{
        window.setInterval(location.reload(true));
        }
      }
    };
    xhr.send(formData);
});
  clearInterval(dzialnie);
  textheader("Login");

});
const canvas2 = document.getElementById("loading-circle2");
const ctx2 = canvas2.getContext("2d");
const loadingCircle2 = document.querySelector(".loading-circle2");
const elementv2 = document.querySelector('.outer2');
const element2v2 = document.querySelector('.bt2');
let degrees2 =135;
let loading2 = 100;
let loadingb2 =10;

canvas2.width = 410;
canvas2.height = 410;

ctx2.lineWidth = 200;
ctx2.strokeStyle = "black";


function drawLoadingCircle2() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx2.beginPath();
  ctx2.arc(canvas2.width / 2, canvas2.height / 2, 100, 0, Math.PI * 2 * loading2/100);
  degrees2 -= Math.PI * 2 * loading2/100;
  loadingCircle2.style.transform = `rotate(${degrees2}deg)`; 
  ctx2.stroke();

  if (loading2 === 100) {
    clearInterval(nowy2v2);
    elementv2.classList.remove('gradientspin2');
  } else {
    if (loadingb2 === 10) {
      elementv2.classList.remove('active');
      element2v2.classList.remove('btactive2');
      element2v2.classList.add('debtactive');
      
      loading2 += 1;
    }else{
      loadingb2 +=1;
    }
  }
}

function drawdeLoadingCircle2() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx2.beginPath();
  ctx2.arc(canvas2.width / 2, canvas2.height / 2, 100, 0, Math.PI * 2 * loading2/100);
  degrees2 -= Math.PI * 2 * loading2/100;
  loadingCircle2.style.transform = `rotate(${degrees2}deg)`; 
  ctx2.stroke();

  if (loading2 === 0) {
    if(loadingb2 === 0){
      element2v2.classList.remove('debtactive');
      elementv2.classList.add('active')
      element2v2.classList.add('btactive2');
      clearInterval(nowyv2);
      }else{
        loadingb2 -= 1;
      }
      loadingb2 -= 1;
  } else {
    loading2 -= 1;
    
  }
}

nowy2v2 = setInterval(drawLoadingCircle2, 15);


element2v2.addEventListener("mouseover", function(event) {
  clearInterval(nowy2v2);
  nowyv2 = setInterval(drawdeLoadingCircle2, 15);
  elementv2.classList.add('gradientspin2');
  clearInterval(dzialnie);
  textheader("Rejestracja");
});

element2v2.addEventListener("mouseout", function(event) {
  clearInterval(nowyv2);
  nowy2v2 = setInterval(drawLoadingCircle2, 15)
  if(clickniete != true){
    clearInterval(dzialnie);
    textheader("Strona Główna");}
});

element2v2.addEventListener("click", function(event){
  clickniete = true;
  ściemnienie.style.visibility = "visible";
  second_pole_wyboru.innerHTML= "Rejestracja";
  first_pole_wyboru.innerHTML= '<form id="register-form" method="post"><label for="login">Nazwa użytkownika</label><br><input type="text" id="login" name="login" required><br><label for="email">Adres e-mail</label><br><input type="email" id="email" name="email" required><br><label for="password">Hasło</label><br><input type="password" id="password" name="password" required><br><input type="submit" value="Zarejestruj się"></form>';
  document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var formData = new FormData(this);
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "registerSystem.php", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        alert(xhr.responseText);
      }
    };
    xhr.send(formData);
});
  clearInterval(dzialnie);
  textheader("Rejestracja");
});
