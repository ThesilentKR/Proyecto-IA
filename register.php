<?php
// Conexión a la base de datos
$servername = "localhost"; // Cambia esto por tu servidor MySQL
$username = "id22014009_dbparatodo_1"; // Cambia esto por tu nombre de usuario de MySQL
$password = "Fate2020."; // Cambia esto por tu contraseña de MySQL
$dbname = "id22014009_dbparatodo_1"; // Cambia esto por el nombre de tu base de datos

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Procesar el formulario de registro
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['logname'];
    $email = $_POST['logemail'];
    $password = $_POST['logpass'];

    // Consulta para insertar el nuevo usuario en la base de datos
    $sql = "INSERT INTO usuarios (username, email, password) VALUES ('$username', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        header("Location: index.html");
    } else {
        header("Location: index.html");
    }
}

// Cerrar la conexión a la base de datos
$conn->close();
?>