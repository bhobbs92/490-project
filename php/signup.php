<?php

include "account.php";

$userName = $_GET["username"];
$fullName = $_GET["fullname"];
$address = $_GET["address"];
$pwd = $_GET["password"];

($dbh = mysql_connect($hostDB, $userDB, $passDB)) or die("Failed to connect to DB");
print "connected";
mysql_select_db($userDB);

$signupQuery = INSERT INTO `Customer`(`customerId`, `name`, `address`) VALUES ('$userName','$fullName', '$address')"


?>