document.getElementById("nickname-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var formData = new FormData(this);
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "changeNick.php", true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        alert(xhr.responseText)
        window.setInterval(location.reload(true));
    }
    };
    xhr.send(formData);
});