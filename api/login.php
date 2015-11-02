<?php
	$postData = file_get_contents("php://input");
	$request = json_decode($postData);

	$customerId = $request->customerId;
	$password = $request->password;


	if (!$customerId || !$password) {
		$arr = array('success' => false, 'message' => 'Username/password combo not found');
		echo json_encode($arr);
	} else {
		require 'database.php';
		require 'jwt.php';

		try {
			$dbc = new PDO($db, $dbUsername, $dbPassword);

			$query = $dbc->prepare("SELECT * FROM Password WHERE customerId=:customerId AND hash=:hash");

			$query->bindParam(":customerId", $customerId);
			$query->bindParam(":hash", $password);

			if ($query->execute()) {
				$rows = $query->fetchAll();
				if (count($rows)) {
					$token = array();
					$token['customerId'] = $customerId;

					$res = array('success' => true, 'token' => JWT::encode($token, 'secret_server_key'));

					echo json_encode($res);

				} else {
					$arr = array('success' => false, 'message' => 'Username and password combo not found');
					echo json_encode($arr);
				}
			} else {
				echo 'server issue';
			}



		} catch (Exception $e) {
			echo 'Error: ' . $e->getMessage();
			die();
		}
	}
?>