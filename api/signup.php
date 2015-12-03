<?php
	$postData = file_get_contents("php://input");
	$req = json_decode($postData);

	$customerId = $req->customerId;
	$password = $req->password;
	$name = $req->fullName;
	$address = $req->address;

	if (!$customerId || !$password) {
		$res = array('message' => 'Please provide a username and password');
		echo json_encode($res);
	} else {
		try {
			require 'database.php';

			$dbc = new PDO($db, $dbUsername, $dbPassword);

			$query = $dbc->prepare("INSERT INTO Customer VALUES (:customerId, :name, :address)");

			$query->bindParam(":customerId", $customerId);
			$query->bindParam(":name", $name);
			$query->bindParam(":address", $address);

			if ($query->execute()) {
				$query2 = $dbc->prepare(
					"INSERT INTO Password VALUES (:customerId, :hash)"
				);

				$query2->bindParam(":customerId", $customerId);
				$query2->bindParam(":hash", $password);

				if ($query2->execute()) {
					$res = array('success' => true, 'message' => 'Thank you for signing up. You may now log in');
					echo json_encode($res);
				} else {
					$res = array('message' => 'Could not execute second query');
					echo json_encode($res);
				}
			} else {
				$res = array('message' => 'Could not execute first query');
				echo json_encode($res);
			}

		} catch (Exception $e) {
			echo 'Error: ' . $e->getMessage();
			die();
		}
	}
?>
