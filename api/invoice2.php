<?php
	require 'jwt.php';

	$postData = file_get_contents("php://input");
	$request = json_decode($postData);
	$jwt = getallheaders()['Authorization'];

	try {
		require 'database.php';

		$dbc = new PDO($db, $dbUsername, $dbPassword);

		foreach ($request as $item => $prop) {
			$query = $dbc->prepare('UPDATE Inventory SET stock=:stock WHERE itemId=:itemId');

			$query->bindParam(":stock", $prop->stock);
			$query->bindParam("itemId", $prop->itemId);
		}

		if ($query->execute()) {
			$res = array('success' => true, 'itemsPurchased' => $postData);
			echo json_encode($res);
		} else {
			echo 'server issue';
		}

	} catch (Exception $e) {
		echo 'Error: ' . $e->getMessage();
		die();
	}
?>