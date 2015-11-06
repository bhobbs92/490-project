<?php
	$postData = file_get_contents("php://input");
	$request = json_decode($postData);

	echo $postData;
?>