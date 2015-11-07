<?php
	require 'jwt.php';
	$jwt = getallheaders()['Authorization'];

	if (!$jwt) {
		$res = array('success' => false, 'status' => 403, 'message' => 'No token provided');

		$json = json_encode($res);

		echo $json;
		exit();
	}

	if (!JWT::decode($jwt, 'secret_server_key', array('HS256'))) {
		$res = array('success' => false, 'status' => 403, 'message' => 'Token not valid');

		echo json_encode($res);

		exit();
	}
?>