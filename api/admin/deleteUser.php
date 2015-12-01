<?php
	require '../auth.php';

	$postData = file_get_contents("php://input");
	$req = json_decode($postData);

	$customerId = $req->customerId;
	$name = $req->name;
	$address = $req->address;
	
	try {
		require '../database.php';

		$dbc = new PDO($db, $dbUsername, $dbPassword);

		$query = $dbc->prepare("DELETE FROM Customer VALUES (:customerId, :name, :address)");

		$query->bindParam(":customerId", $customerId);
		$query->bindParam(":name", $name);
		$query->bindParam(":address", $address);

		if ($query->execute()) {
			$res = array('success' => true, 'message' => 'User successfully deleted');
		} else {
			$res = array('message' => 'Could not execute first query' 'success' => false);

			echo json_encode($res);
		}

	} catch (Exception $e) {
		echo 'Error: ' . $e->getMessage();
		die();
	}
?>