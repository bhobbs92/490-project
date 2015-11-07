<?php

//$customerId = 'drg23';
require 'database.php';
require 'jwt.php';

$postData = file_get_contents("php://input");
$request = json_decode($postData);
$jwt = getallheaders()['Authorization'];

$payload = JWT::decode($jwt, 'secret_server_key', array('HS256'));
$customerId = $payload->customerId;

$dbc = new PDO($db, $dbUsername, $dbPassword);


	//prepare query to determine new invoiceID for insert
$query = $dbc->prepare("SELECT max(invoiceId) FROM Invoice");
		if ($query->execute()) {
			$lastPK = $query->fetch();	//get the previous PK
			$nextPK = $lastPK[0] + 1;		//increment by 1 for new insert


				//prepare query for insert into INVOICE table
			$query2 = $dbc->prepare("INSERT INTO Invoice VALUES (:invoiceId,22,:customerId)");
			$query2->bindParam(":invoiceId", $nextPK);
			$query2->bindParam(":customerId", $customerId);
			if($query2->execute()){

						//prepare query for insert into INVOICE_ELEMENTS table
					foreach ($request as $item => $prop) {
						$query3 = $dbc->prepare("INSERT INTO Invoice_Elements VALUES (NULL,:invoiceId,:itemId,:quantityAmt)");

						$query3->bindParam(":invoiceId", $nextPK);
						$query3->bindParam(":itemId", $prop->itemId);
						$query3->bindParam(":quantityAmt", $prop->amount);

							//execute INVOICE_ELEMENTS insertion
						$query3->execute();
					}

			} else{
				//could not insert into INVOICE table
			}

			$arr = array('success' => true, 'items' => $lastPK);
			echo json_encode($arr);
		} else {
			$arr = array('success' => false, 'message' => 'Could not retrieve invoiceId max(int) from table [Invoice]');
		//	echo json_encode($arr);
		}
?>
