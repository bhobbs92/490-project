<?php
require '../auth.php';

require '../database.php';

$dbc = new PDO($db, $dbUsername, $dbPassword);

$query = $dbc->prepare("SELECT * FROM Customer");

if ($query->execute()) {
  $rows = $query->fetchAll();
  $arr = array('success' => true, 'items' => $rows);
  echo json_encode($arr);
} else {
  $arr = array('success' => false, 'message' => 'Could not retrieve items from database');
  echo json_encode($arr);
}









 ?>
