<?php
require '../auth.php';

$postData = file_get_contents("php://input");

try {
  require '../database.php';

  $dbc = new PDO($db, $dbUsername, $dbPassword);

  $query = $dbc->prepare($postData);

  if ($query->execute()) {
    $res = array('success' => true, 'message' => 'User successfully deleted');

    $rows = $query->fetchAll();

    if ($rows) {
      $res[] = $rows;
    }
  } else {
    $res = array('success' => false, 'message' => 'Could not execute first query');
  }

  echo json_encode($res);

} catch (Exception $e) {
  echo 'Error: ' . $e->getMessage();
  die();
}








 ?>
