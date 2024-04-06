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

// Procesar el formulario de inicio de sesión
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['logemail'];
    $password = $_POST['logpass'];

    // Consulta para verificar las credenciales
    $sql = "SELECT * FROM usuarios WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        // Inicio de sesión exitoso
        // Redirigir a la página de inicio o hacer alguna otra acción
        header("Location: chessgame.html");
        exit; // Importante: asegúrate de salir del script después de la redirección
    } else {
        // Credenciales incorrectas
        header("Location: index.html");
    }
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
