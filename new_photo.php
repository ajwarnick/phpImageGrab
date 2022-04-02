<?php
$path = 'test.jpg';
$type = pathinfo($path, PATHINFO_EXTENSION);
$data = file_get_contents($path);
$base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

if ($base64 !== false){
  return $base64;

}


// header("Content-type: image/jpeg");

// if(!empty($_GET['url']) && $_GET["key"] == "TxqaJFtRyHvrV4388x!MI7A^5kjWnK"){
// 	// $url = $_GET["url"];
//   // $html = file_get_contents($url);
  
// 	if( !false ){
//     $path = 'test.jpg';
//     $type = pathinfo($path, PATHINFO_EXTENSION);
//     $data = file_get_contents($path);
//     $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

//     echo $base64;
//     // response(200,"Yes Response",$base64);


// 	} else {
//     response(200,"Error",NULL);
// 	}
	
// } else {
// 	response(401,"Invalid Auth",NULL);
// }

// function response($status,$status_message,$data)
// {
// 	header("HTTP/1.1 ".$status);
	
// 	$response['status']=$status;
// 	$response['status_message']=$status_message;
// 	$response['data']=$data;
	
// 	// $json_response = json_encode($response);
// 	// echo $json_response;
// }

?>