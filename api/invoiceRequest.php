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
  $CustomerData = $query1->fetchAll();
}


//get everything from the invoice table to build the object
$query2 = $dbc->prepare("SELECT * FROM Invoice WHERE customerId = :customerId");
$query2->bindParam(":customerId", $customerId );

if ($query2->execute()) {

  $invoices = $query2->fetchAll();

  foreach($invoices as $key => $value){
    $counter = 0;
      $query3 = $dbc->prepare("SELECT * FROM Invoice_Elements WHERE invoiceId='1000956'");
      //$query3->bindParam(":invoiceId", $value->invoiceId);
      if($query3->execute()){
        $invoiceElements = $query3->fetchAll();
      // $invoiceData= array('invoice'=> $invoices, 'invoiceData' => $invoiceElements);
      $invoiceData= array('invoice'=> $invoices[$counter], 'data' => array('invoiceData' => $invoiceElements));
    //  $invoiceData[$value->invoiceId] = array('invoiceData' => $invoiceElements);
      }
      $counter = $counter +1;
 }

  $arr = array('success' => true,'customerData' =>$CustomerData, 'items' => $invoiceData);
  echo json_encode($arr);

}


//echo "$"






?>
