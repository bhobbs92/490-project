<?php

$customerId = 'drg23';

require 'database.php';

$dbc = new PDO($db, $dbUsername, $dbPassword);

$query = $dbc->prepare("SELECT max(invoiceId) FROM Invoice");

				//get the previous PK increment by 1 for new insert
		if ($query->execute()) {
			$lastPK = $query->fetch();
			$nextPK = $lastPK[0] + 1;

			$query2 = $dbc->prepare("INSERT INTO Invoice VALUES (:invoiceId,22,:customerId)");
			$query2->bindParam(":invoiceId", $nextPK);
			$query2->bindParam(":customerId", $customerId);
			if($query2->execute()){
				//to insert into the invoice table
			} else{

			}


			$arr = array('success' => true, 'items' => $lastPK);
			echo json_encode($arr);
		} else {
			$arr = array('success' => false, 'message' => 'Could not retrieve items from database');
			echo json_encode($arr);
		}
?>
