<?php
$host = "localhost";
$userform = "root";
$password = "";
$database = "form";

$conn = new mysqli($host, $userform, $password, $database);

if ($conn->connect_error) {
    die("connection failed". $conn->connect_error)
}

?>