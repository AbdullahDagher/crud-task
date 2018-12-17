<?php
include 'connection.php';

$id = $_POST['id'];

$stmt = $con->prepare('SELECT * FROM library WHERE id = ?');
$stmt->execute(array($id));
$row = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($row);