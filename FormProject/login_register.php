<?php

session_start();
require_once 'config.php';
if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $phone = $_POST['phone'];


    $checkEmail = $conn->query("SELECT email FROM userform WHERE email = '$email'");
    if ($checkEmail->num_rows > 0) {
        $_SESSION['register_error'] = 'Email is already registered!';
        $_SESSION['active_form'] = 'register successfully';
    }else{
        $conn->query("INSERT INTO users (name, email, password, phone) VALUES ('$name', '$email', '$password', '$phone')");
    }
    header("Location: index.php");
    exit();

}

?>