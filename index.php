<!DOCTYPE html>
<html lang="en">
	<head>
		<?php

		$feeds = [
			"https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
			"https://rss.nytimes.com/services/xml/rss/nyt/US.xml",
			"https://rss.nytimes.com/services/xml/rss/nyt/Arts.xml"
		];

		$content = file_get_contents($feeds[rand(0, 3)]);
		
		// // Instantiate XML element
		$xml = new SimpleXMLElement($content); 
		$num = count($xml->channel->item);
		$link = $xml->channel->item[rand(0, $num)]->link;
		$html = file_get_contents($link);

		$doc = new DOMDocument();
		@$doc->loadHTML($html);
		
		$tags = $doc->getElementsByTagName('img');
		
		foreach ($tags as $tag) {
				echo $tag->getAttribute('src');
				echo '<br/>';
		}


		// A few settings
		// $image = 'landscape.jpg';
		// $image = 'https://static01.nyt.com/images/2022/03/30/business/00amazonlabor1/00amazonlabor1-threeByTwoMediumAt2X.jpg?format=pjpg&quality=75&auto=webp&disable=upscale';
		
		// Read image path, convert to base64 encoding
		// $imageData = base64_encode(file_get_contents($image));

		// Format the image SRC:  data:{mime};base64,{data};
		// $src = 'data: '.mime_content_type($image).';base64,'.$imageData;
		// $src = 'data: image/*;base64,'.$imageData;

		
		?>
		
		<title>"Newscape", 2022 - Anthony Warnick</title>
		<!--
			Title: Newscape 
			Artist: Anthony Warnick
			Date: April 1, 2022
		-->
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge"> 

		<!-- 
		<script language="javascript" type="text/javascript" src="libraries/p5.min.js"></script>
		<script language="javascript" type="text/javascript" src="libraries/p5.dom.js"></script>
		<script language="javascript" type="text/javascript" src="libraries/quicksettings.js"></script>
		<script language="javascript" type="text/javascript" src="libraries/p5.gui.js"></script>
		<script language="javascript" type="text/javascript" src="libraries/p5.sound.js"></script>
		<script language="javascript" type="text/javascript" src="sketch.js"></script>  
		-->

		<!-- <style> body {padding: 0; margin: 0; overflow: hidden;} img{max-width:100%;} </style> -->
	</head>
	<body>
		<?php
			
			
		?>


		<!-- <div>
			<?php echo '<img id="image" style="display:none;" src="', $src, '">'; ?>
		</div> -->
		
	</body>
</html>
