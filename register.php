<?php
$servername = "localhost"; 
$username = "id22014009_dbparatodo_1"; 
$password = "Fate2020."; 
$dbname = "id22014009_dbparatodo_1"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['logname'];
    $email = $_POST['logemail'];
    $password = $_POST['logpass'];

    $sql = "INSERT INTO usuarios (username, email, password) VALUES ('$username', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        header("Location: index.html");
    } else {
        header("Location: index.html");
    }
}

$conn->close();
?>