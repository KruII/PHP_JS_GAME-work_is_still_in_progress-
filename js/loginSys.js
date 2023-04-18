export function LoginFunkcja() {
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
});}