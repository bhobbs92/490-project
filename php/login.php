<?php

include "account.php";

$userName = $_GET["username"];
$pwd = $_GET["password"];

($dbh = mysql_connect($hostDB, $userDB, $passDB)) or die("Failed to connect to DB");
//print "connected";
mysql_select_db($userDB);


//INSERT INTO `rr354`.`Password` (`customerId`, `hash`) VALUES ('yazeed', 'javascript');
//SELECT * FROM `Password` WHERE customerId = 'yazeed' AND hash = 'javascript'
$signupQuery = "SELECT * FROM `Password` WHERE customerId = '$userName' AND hash = '$pwd'";
$response = mysql_query($signupQuery);
($response) or die(mysql_error());

 $rows = array();
   while($r = mysql_fetch_assoc($response)) {
     $rows['rows'][] = $r;
   }
   if($rows){
	   print "logged in";
   }else{
	   print "doesn't exist";
   }

	print json_encode($rows);

?>