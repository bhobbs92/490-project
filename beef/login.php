<?php
	if ((empty($_POST['customerId']) || empty($_POST['password']))) {
		$arr = array('success' => false, 'message' => 'Username and password combo not found');
		echo json_encode($arr);
	} else {
		require 'database.php';
		$customerId = $_POST['customerId'];
		$password = $_POST['password'];

		try {
			$dbc = new PDO($db, $dbUsername, $dbPassword);

			$query = $dbc->prepare("SELECT * FROM Password WHERE customerId=:customerId AND hash=:hash");

			$query->bindParam(":customerId", $customerId);
			$query->bindParam(":hash", $password);

			if ($query->execute()) {
				$rows = $query->fetchAll();
				if (count($rows)) {
					$arr = array('success' => true, 'user' => $rows[0]);
					echo json_encode($arr);
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