<?php
	require '../auth.php';

	$postData = file_get_contents("php://input");
	$req = json_decode($postData);

	$customerId = $req->customerId;

	try {
		require '../database.php';

		$dbc = new PDO($db, $dbUsername, $dbPassword);

		$query = $dbc->prepare("DELETE FROM `Customer` WHERE customerId = :customerId");

		$query->bindParam(":customerId", $customerId);

		if ($query->execute()) {
			$res = array('success' => true, 'message' => 'User successfully deleted');
		} else {
			$res = array('success' => false, 'message' => 'Could not execute first query');

			echo json_encode($res);
		}

	} catch (Exception $e) {
		echo 'Error: ' . $e->getMessage();
		die();
	}
?>
