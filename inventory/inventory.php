<?php
	if (!getallheaders()['JWT']) {
		echo 'You\'re not authenticated';
	} else {
		require 'database.php';

		try {
			$dbc = new PDO($db, $dbUsername, $dbPassword);

			$query = $dbc->prepare("SELECT * FROM Inventory");

			if ($query->execute()) {
				$rows = $query->fetchAll();
				$arr = array('success' => true, 'items' => $rows);
				echo json_encode($arr);
			} else {
				$arr = array('success' => false, 'message' => 'Could not retrieve items from database');
				echo json_encode($arr);
			}



		} catch (Exception $e) {
			echo 'Error: ' . $e->getMessage();
			die();
		}
	}
?>