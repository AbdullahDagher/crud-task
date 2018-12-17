<?php
include 'connection.php';

$id =$_POST['id'];

$stmt = $con->prepare('DELETE FROM library WHERE id = ?');
$stmt->execute(array($id));

echo 'Done';