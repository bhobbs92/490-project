<?php
	require 'jwt.php';

	if (!getallheaders()['Authorization']) {
		$res = array('success' => false, 'status' => 403, 'message' => 'No credentials provided');

		echo json_encode($res);
		exit();
	} else {
		$jwt = getallheaders()['Authorization'];

		if (!JWT::decode($jwt, 'secret_server_key', array('HS256'))) {
			$res = array('success' => false, 'status' => 403, 'message' => 'Token not valid');

			echo json_encode($res);

			exit();
		}
	}
?>