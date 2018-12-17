<?php

include 'connection.php';
$bookName = $_POST['bookName'];
$authorName = $_POST['authorName'];

$stmt = $con->prepare('INSERT INTO library (bookName, authorName) VALUES (?, ?)');
$stmt->execute(array($bookName, $authorName));

echo 'Done';