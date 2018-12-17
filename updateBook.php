<?php
include 'connection.php';

$id = $_POST['id'];
$bookName = $_POST['bookName'];
$authorName = $_POST['authorName'];

$stmt = $con->prepare('UPDATE library SET bookName = ?, authorName = ?  WHERE id = ?;');
$stmt->execute(array($bookName, $authorName, $id));

echo 'Done';