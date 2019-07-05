<?php

$severname = "localhost" ;
$username = "root" ;
$password = "root" ;
$dbname = "commentboard" ;
	
$conn = new mysqli($severname, $username, $password, $dbname);
$conn->query("SET NAMES 'UTF8'");


if($conn->connect_error){
	die("Connection failed: " . $conn->connent_error);
}
?>