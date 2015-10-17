<?php

include "account.php";

$userName = $_GET["username"];
$fullName = $_GET["fullname"];
$address = $_GET["address"];
$pwd = $_GET["password"];

print"<h1>" . $_GET . "</h1>";
//connect to db
($dbh = mysql_connect($hostDB, $userDB, $passDB)) or die("Failed to connect to DB");
print "connected";
mysql_select_db($userDB);

//create insert queries
$insertCustomer = "INSERT INTO `rr354`.`Customer`(`customerId`, `name`, `address`) VALUES ('$userName','$fullName', '$address')";
$insertPassword = "INSERT INTO `rr354`.`Password` (`customerId`, `hash`) VALUES ('$userName', '$pwd');"

//populate customer table
$response = mysql_query($insertCustomer);
($response) or die("error inserting customer");
print "insert customer successful";

//populate password table
$response2 = mysql_query($insertPassword);
($response2) or die("error inserting password");
print "insert password successful";


?>