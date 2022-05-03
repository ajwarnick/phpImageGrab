<?php
// header("Content-type: image/jpeg");


if($_GET["key"] == "TxqaJFtRyHvrV4388x!MI7A^5kjWnK"){
	// $url = $_GET["url"];
  // $html = file_get_contents($url);
  
	if( !false ){

		$content = file_get_contents("https://rss.nytimes.com/services/xml/rss/nyt/World.xml");
		
		// Instantiate XML element
		$xml = new SimpleXMLElement($content); 
		$num = count($xml->channel->item) - 1;
		$link = $xml->channel->item[rand(0, $num)]->link;
		$html = file_get_contents($link);

		$doc = new DOMDocument();
		@$doc->loadHTML($html);
		
		$tags = $doc->getElementsByTagName('img');
		
		do {
			$t = rand(0, count($tags)-1);
			$image = $tags[$t]->getAttribute('src');
			list($width, $height) = getimagesize($image);
		} while ($width < 599);

		// A few settings
		// $image = 'landscape.jpg';
		// $image = 'portraitNew.jpeg';
		// $image = 'https://static01.nyt.com/images/2022/03/30/business/00amazonlabor1/00amazonlabor1-threeByTwoMediumAt2X.jpg?format=pjpg&quality=75&auto=webp&disable=upscale';
		
		// Read image path, convert to base64 encoding
		$imageData = base64_encode(file_get_contents($image));

		// Format the image SRC:  data:{mime};base64,{data};
		// $src = 'data: '.mime_content_type($image).';base64,'.$imageData;
		$src = 'data: image/*;base64,'.$imageData;

    // $path = 'landscape.jpg';
    // $type = pathinfo($path, PATHINFO_EXTENSION);
    // $data = file_get_contents($path);
    // $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

    // echo $base64;
    response(200,"Yes Response", $src);

	} else {
    response(200,"Error",NULL);
	}
} else {
	response(401,"Invalid Auth",NULL);
}

function response($status,$status_message,$data)
{
	header("HTTP/1.1 ".$status);
	
	$response['status']=$status;
	$response['status_message']=$status_message;
	$response['data']=$data;
	
	$json_response = json_encode($response);
	echo $json_response;
}

?>