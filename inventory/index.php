<?php
	require 'database.php';

	$username = $_POST['username'];
	$password = $_POST['password'];

	try {
		$dbConnect = new PDO($db, $dbUsername, $dbPassword);
		echo 'connected';

	} catch (Exception $e) {
		echo 'Error: ' . $e->getMessage();
		die();
	}
?>