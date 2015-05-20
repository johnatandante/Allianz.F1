<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<link href="/Css/style.css" rel="stylesheet" type="text/css">
		<title>Allianz.F1 Races</title>
	</head>
	<body>
		<h1>List of F1 Races (2015)</h1>
		<div class="raceContainer">
			
			<div class="backTo"><a href="./home">Back to Home</a></div>
		(: races ~
		<a stryle="alink" href="[:DestinationUrl:]">
			<div class="race" 
						style="background-image:url([:Img:])">
				<p>
					<span class="location">Location: [:Location:]</span>
					<span class="racename">[:RaceName:]</span>
					<span class="racedate">[:RaceDate:]</span>
					<span class="winner">Winner: [:Winner:]</span>
				</p>
			</div>
		</a>
		:)
		
			<div class="backTo"><a href="./home">Back to Home</a></div>
		</div>
	</body>
</html>