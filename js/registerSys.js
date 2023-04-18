export function RejestracjaFunkcja() {
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
});}