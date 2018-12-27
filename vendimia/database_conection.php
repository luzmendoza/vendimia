<?php
$dsn = 'localhost';
$usuario = 'id8298531_eliuzi';
$contraseña = 'D4yan24s';
$bd = 'id8298531_vendimia';

try {
    $conn = mysqli_connect($dsn,$usuario,$contraseña,$bd);
} catch (PDOException $e) {
    echo 'Falló la conexión: ' . $e->getMessage();
}
?>