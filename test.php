<!DOCTYPE html>
<html>
  <head>
    <style>
      p:hover ~ span {
        color: aqua;
      }
    </style>
  </head>
  <body>
  <header>
		
	</header>
  
  <p>Ścieżka pliku: <?php echo $_SERVER['SCRIPT_FILENAME']; ?></p>
  <span>color</span>
  

<script>
const cookies = document.cookie.split(';');
const usernameCookie = cookies.find(cookie => cookie.includes('username'));
if (usernameCookie) {
  const username = usernameCookie.split('=')[1];
  console.log(`Wczytano ciasteczko username: ${username}`);
} else {
  console.log('Nie znaleziono ciasteczka o nazwie username');
}
</script>
  </body>
</html>
