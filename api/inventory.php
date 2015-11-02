<?php
	$jwt = getallheaders()['Authorization'];
	if ($jwt) {
		echo 'got it';
	} else {
		echo 'nope';
	}
?>