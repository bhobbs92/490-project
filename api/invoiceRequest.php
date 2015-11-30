<?php

require 'database.php';
require 'jwt.php';

$postData = file_get_contents("php://input");
$request = json_decode($postData);
$jwt = getallheaders()['Authorization'];

$payload = JWT::decode($jwt, 'secret_server_key', array('HS256'));
$customerId = $payload->customerId;

$dbc = new PDO($db, $dbUsername, $dbPassword);

$query1 = $dbc->prepare("SELECT * FROM Customer WHERE customerId = :customerId");
$query1->bindParam(":customerId", $customerId );

if ($query1->execute()) {
  $customerData = $query1->fetchAll();
}


//get everything from the invoice table to build the object
$query2 = $dbc->prepare("SELECT * FROM Invoice WHERE customerId = :customerId");
$query2->bindParam(":customerId", $customerId );

if ($query2->execute()) {

  $invoices = $query2->fetchAll();
  $counter = 0;
  $invoiceData = array();

  foreach ($invoices as $key => $value) {

    $currentInvoiceId = $invoices[$counter]["invoiceId"];

    $query3 = $dbc->prepare("SELECT * FROM Invoice_Elements WHERE invoiceId=:invoiceId");
    $query3->bindParam(":invoiceId", $currentInvoiceId);

    if ($query3->execute()) {
      $invoiceElements = $query3->fetchAll();

      $invoiceCounter = 0;
      foreach($invoiceElements as $key => $value){
        $currentItemId = $invoiceElements[$invoiceCounter]["itemId"];

        $query4 = $dbc->prepare("SELECT name, price FROM Inventory WHERE itemId = :currentItemId");
        $query4->bindParam(":currentItemId", $currentItemId);
        if ($query4->execute()) {
          $ItemElements = $query4->fetchAll();
        }

        $tempItemArray[$invoiceCounter] = array(
          'invoiceId' => $invoiceElements[$invoiceCounter]["invoiceId"],
          'invoiceELementId' => $invoiceElements[$invoiceCounter]["invoiceELementId"],
          'itemId'=> $invoiceElements[$invoiceCounter]["itemId"],
          'name' => $ItemElements[0][0],
          'price' => $ItemElements[0][1],
          'quantityAmt' => $invoiceElements[$invoiceCounter]["quantityAmt"],
        );

        $invoiceCounter++;
      }

      $tempInvoiceArray = array(
        'invoiceId' => $invoices[$counter]['invoiceId'],
        'customerId' => $invoices[$counter]['customerId'],
        'amountBillable' => $invoices[$counter]['amountBillable'],
        'invoiceElement' => $tempItemArray
      );

      $invoiceData[] = $tempInvoiceArray;

    } else {
      echo 'Houston, we got a DB problem';
    }

    $counter++;
  }

  $res = array(
    'success' => true,
    'customerData' => $customerData,
    'invoices' => $invoiceData
  );

  echo json_encode($res);
}
?>
