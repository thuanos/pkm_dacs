<?php
session_start();

if (isset($_SESSION['id']) && isset($_SESSION['user_name']) && isset($_SESSION['name'])) {
  $playerName = $_SESSION['name'];
} else {
  header("Location: index.php");
  exit();
}
?>

<script>
const playerName = "<?php echo $playerName; ?>";
</script>


<head>
	<title>Pokemon Game</title>
	<link rel="icon" href="./img/item266.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
    rel="stylesheet"
  />
  <style>
    * {
      font-family: 'Press Start 2P', cursive;
      box-sizing: border-box;
    }
    body {
      background-color: black;
      text-align: center;
    }
    h1 {
      margin: 0;
    }
    button {
      border: 0;
      cursor: pointer;
      font-size: 16px;
    }

    button:hover {
      background-color: #ddd;
    }
    .gradient {
 			 background: linear-gradient( #c6ffdd, #fbd786, #f7797d);
 			 -webkit-background-clip: text;
 			 -webkit-text-fill-color: transparent;
		}

		body {
			  background-image: url('./img/credits2.png');
			  background-size: cover;
			  background-position: center;
			}
	footer img {
   max-width: 5%;
   height: auto;
}

	    .menu {
	      	position: absolute;
	      	top: 60px;
	      	left: 10px;
	      	width: 300px;
	      	padding: 10px;
			text-align: left;
	      	
	      	display: none;
	    }
	    .menu a {
	      	display: block;
	      	margin-bottom: 5px;
	      	text-decoration: none;
	      	color: #000;
		
  </style>
  </head>
  <header>
  
	<button id="menuButton"  class="gradient" style="float: left; font-size: 50px;">≡</button>
	<h2 class="gradient">Pokemon Game</h2>

  </header>
  <div id="menuList" class="menu">
		<a class="gradient" href="/change-password.php">Change Password</a>
		<a class="gradient" href="/rename.php">Rename</a>
		<a class="gradient" href="/notifications.php">Event</a>
		<a class="gradient" href="/contact.php">Contact Us</a>
		<a class="gradient" href="/logout.php">Logout</a>
	</div>
	<script>
	document.getElementById('menuButton').addEventListener('click', function() {
		var menuList = document.getElementById('menuList');
	  if (menuList.style.display === 'block') {
	    menuList.style.display = 'none';
	  } else {
	    menuList.style.display = 'block';
	  }
	});
</script>
<div>
	<div 
	id="overlapping"
	style="background-color: black;position: absolute;
	top: 0; right: 0; bottom: 0; left: 0; opacity: 0; pointer-events: none; z-index: 10;"></div>
</div>
<div style="display: inline-block; position: relative;">
	<div 
	id="overlappingDiv"
	style="background-color: black;position: absolute;
	top: 0; right: 0; bottom: 0; left: 0; opacity: 0; pointer-events: none; z-index: 10;"></div>
<body>
	<canvas></canvas>
</body>
	<div id= "userInterface" style="display: none;">
	<div style="background-color: white; width: 250px; padding: 12px; text-align: left;
	position: absolute; top: 50px; left: 50px; border: 4px black solid;">
		<h1 style="font-size: 16px;">Yveltal</h1>
		<div style="position: relative;">
			<div style="height: 5px; background-color: #ccc; margin-top: 10px;"> </div>
			<div id="enemyHealthBar"
				style="height: 5px; background-color: green; position: absolute; top: 0; left: 0; right: 0;"> </div>
		</div>
	</div>
	<div style="background-color: white; width: 250px; padding: 12px; text-align: left;
	position: absolute; top: 330px; right: 50px; border: 4px black solid;">
		<h1 style="font-size: 16px;">Kusashi</h1>
		<div style="position: relative;">
			<div style="height: 5px; background-color: #ccc; margin-top: 10px;"> </div>
			<div id="playerHealthBar"
				style="height: 5px; background-color: green; position: absolute; top: 0; left: 0; right: 0;"> </div>
		</div>
	</div>

	<div 
	style="background-color: white; 
	height: 140px;
	position: absolute;
	bottom: 0; right: 0; left: 0;
	border: 4px	black solid;
	display: flex;">
		<div 
			id="dialogueBox"
			style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; background-color: white; padding: 12px; display: none; cursor: pointer;">
		abc</div>
		<div 
			id= "attacksBox"
			style="width: 66.66%; display: grid; grid-template-columns: repeat(2, 1fr);">
			
		</div>
		<div style="display: flex; align-items: center; justify-content: center; width: 33.33%; border-left: 4px black solid;">
			<h1 id="attackType" style="font-size: 16px;">Attack Type</h1>
		</div>
	</div>
	</div>
</div>
<footer>
   <h3 class="gradient"> W:Up / S:Down </h3>  <h3 class="gradient"> A:Left / D:Right / Q:Switch Map </h3>
</footer>
<script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js" integrity="sha512-6+YN/9o9BWrk6wSfGxQGpt3EUK6XeHi6yeHV+TYD2GR0Sj/cggRpXr1BrAQf0as6XslxomMUxXp2vIl+fv0QRA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js" integrity="sha512-H6cPm97FAsgIKmlBA4s774vqoN24V5gSQL4yBTDOY2su2DeXZVhQPxFK4P6GPdnZqM9fg1G3cMv5wD7e6cFLZQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="data/collisions.js"></script>  
<script src="data/battleZones.js"></script> 
<script src="data/attacks.js"></script>  
<script src="data/monsters.js"></script>  
<script src="data/chuyenmap.js"></script>
<script src="data/audio.js"></script> 
<script src="classes.js"></script>  
<script src="index.js"></script>  
<script src="battleScene.js"></script>  
<script src="battleSwitch.js"></script> 
<script src="switchMapScene.js"></script>  