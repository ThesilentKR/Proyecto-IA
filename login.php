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
    $email = $_POST['logemail'];
    $password = $_POST['logpass'];

    $sql = "SELECT * FROM usuarios WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        header("Location: chessgame.html");
        exit; 
    } else {
        header("Location: index.html");
    }
}

$conn->close();
?>
