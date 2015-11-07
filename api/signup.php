<?php
	$postData = file_get_contents("php://input");
	$req = json_decode($postData);

	$customerId = $req->customerId;
	$password = $req->password;
	$name = $req->fullName;
	$address = $req->address;

	if (!$customerId || !$password) {
		$res = array('success' => false, 'message' => 'Please provide a username and password');
		echo json_encode($res);
	} else {
		try {
			require 'database.php';

			$dbc = new PDO($db, $dbUsername, $dbPassword);

			$query = $dbc->prepare("INSERT INTO 'rr354' . 'Customer' ('customerId', 'name', 'address') VALUES (:customerId, :name, :address)");

			$query->bindParam(":customerId", $customerId);
			$query->bindParam(":name", $name);
			$query->bindParam(":address", $address);

			if ($query->execute()) {
				$query2 = $dbc->prepare("INSERT INTO 'rr354' . 'Password' ('customerId', 'hash') VALUES (:customerId, :password)");

				$query2->bindParam(":customerId", $customerId);
				$query2->bindParam(":password", $password);

				if ($query2->execute()) {
					$res = array('success' => true, 'message' => 'Thank you siging up. You may now log in');
					echo json_encode($res);
				} else {
					$res = array('success' => false, 'message' => 'Could not execute second query');
					echo json_encode($res);
				}
			} else {
				$res = array('success' => false, 'message' => 'Could not execute second query');
				echo json_encode($res);
			}

		} catch (Exception $e) {
			echo 'Error: ' . $e->getMessage();
			die();
		}
	}
?>