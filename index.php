<!DOCTYPE HTML>
<html lang="pl">
<head>
	<title>KruII</title>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" href="index.ico" type="image/x-icon">
	<link rel="shortcut icon" href="index.ico" type="image/x-icon">
	<link rel="stylesheet" href="css.css">
	<link rel="stylesheet" href="./css/header.css">
</head>
<body>
<?PHP
  session_start();
	if(isset($_SESSION['user_id'])) {
		require_once "phpconnect.php";
		$database_name = "firstsystem";
		$conn = mysqli_connect($hostname, $username, $passwordD, $database_name);
		$sqlSearch = "SELECT Nick FROM dane_gracza WHERE ID=$_SESSION[user_id]";
		$result = mysqli_query($conn, $sqlSearch);
		$user = mysqli_fetch_assoc($result);
		if($user['Nick']==null) {
			echo<<<PHP
				<div class="Select_nickname"><form id="nickname-form" method="post"><label for="nick">Wpisz Swój Nick</label><input type="text" id="nick" name="nick"><input type="submit" value="Ustaw"></form></div>
				<script type="text/javascript" src="./js/changeNick.js"></script>	
			PHP;
		}else{
		echo<<<PHP
			<!DOCTYPE HTML>
			<html lang="pl">
				<head>
					<title>KruII</title>
					<meta charset="utf-8" />
					<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<link rel="icon" href="index.ico" type="image/x-icon">
					<link rel="shortcut icon" href="index.ico" type="image/x-icon">
					<link rel="stylesheet" href="./css/game.css">
				</head>
				<body>
					<div id="ogolny-gry">
						<div id="overlay"></div>
						<div id="background">
							<canvas class="game"></canvas>
						</div>
					</div>
					<script src="./js/game.js"></script>
					<script src="./js/nowymapgen.js"></script>
					<script src="data/kolizja.js"></script>
					<script src="./js/index.js"></script>
				</body>
			</html>
		PHP;}

		exit();
	}
	
?>
	<header>
		<div class="bg"></div>
		<div id="text-generator-start" class="text-generator-start"></div>
		<div class="ściemnienie" id="ściemnienie">
			<div class="pole-wszelkich-opcji" id="pole-wszelkich-opcji">
				<span id="first_pole_wyboru"></span>
				<span id="second_pole_wyboru"></span>
			</div>
		</div>
		<div id="header">
		<div class="main-panel-container">
		<div class="settings-container" id="settings-container">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" class="animowanie_kolka">
				<path
					d="M 83.720703 16.009766 A 25 20 0 0 1 60 30 A 25 20 0 0 1 36.308594 16.087891 A 50 50 0 0 0 16.130859 36.21875 A 20 25 0 0 1 30 60 A 20 25 0 0 1 16.087891 83.691406 A 50 50 0 0 0 36.308594 103.91211 A 25 20 0 0 1 60 90 A 25 20 0 0 1 83.78125 103.86914 A 50 50 0 0 0 103.91211 83.691406 A 20 25 0 0 1 90 60 A 20 25 0 0 1 103.99023 36.279297 A 50 50 0 0 0 83.720703 16.009766 z M 60 40 A 20 20 0 0 1 80 60 A 20 20 0 0 1 60 80 A 20 20 0 0 1 40 60 A 20 20 0 0 1 60 40 z " />
				<path
					d="m 104.71686,46.571047 a 23.355869,18.684695 45 0 1 -24.911988,-6.427984 23.355869,18.684695 45 0 1 -6.460235,-24.84102 46.711738,46.711738 0 0 0 -26.628011,-0.03097 18.684695,23.355869 45 0 1 -6.547976,24.871989 18.684695,23.355869 45 0 1 -24.841022,6.460239 46.711738,46.711738 0 0 0 4e-6,26.715744 23.355869,18.684695 45 0 1 24.841016,6.460238 23.355869,18.684695 45 0 1 6.547977,24.871987 46.711738,46.711738 0 0 0 26.628004,-0.0309 18.684695,23.355869 45 0 1 6.46024,-24.841023 18.684695,23.355869 45 0 1 24.911981,-6.427987 46.711738,46.711738 0 0 0 1e-5,-26.780249 z M 73.198835,46.7491 a 18.684695,18.684695 0 0 1 -4e-6,26.424146 18.684695,18.684695 0 0 1 -26.424146,4e-6 18.684695,18.684695 0 0 1 0,-26.42415 18.684695,18.684695 0 0 1 26.42415,0 z" />
			</svg>
			<span></span>
		</div>
		<div class="information-container" id="information-container"><span><div>ℹ</div></span></div>
		</div>
		<div class="zBackgroundButtonLogin">
         <button class="bt" id="BTL">Zaloguj</button>
         <div class="outer circle">
            <canvas id="loading-circle" class="loading-circle"></canvas>
            <span class="span"></span>
         </div>
    	</div>
		<div class="zBackgroundButtonRegister">
         <button class="bt2" id="BTR">Zarejestruj</button>
         <div class="outer2 circle">
            <canvas id="loading-circle2" class="loading-circle2"></canvas>
            <span class="span"></span>
         </div>
    	</div>
		</div>
	</header>
	<!--<script type="text/javascript" src="navbar.js"></script>-->
	<script type="text/javascript" src="./js/header.js"></script>	
 </body>

</html>