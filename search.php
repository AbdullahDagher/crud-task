<?php
include 'connection.php';

$bookName = $_POST['bookName'];

$stmt = $con->prepare('SELECT * FROM library WHERE bookName LIKE ? ');
$stmt->execute(array('%'.$bookName.'%'));

$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

$data = '<tr><td><input placeholder="Enter book name" id="book-name" type="text"></td><td><input placeholder="Enter author name" id="author-name" type="text"></td><td><button id="add" class="btn btn-success">Add</button></td></tr>';
foreach ($rows as $row){
    $data .= '<tr>';
    $data .= '<td>'. $row['bookName'] .'</td>';
    $data .= '<td>'. $row['authorName'] .'</td>';
    $data .= '<td><button data-id="'. $row['id'] .'" style="margin-right: 5px;" class="btn btn-primary edit">Edit</button><button data-id="'. $row['id'] .'" class="btn btn-danger delete">Delete</button></td>';
    $data .= '</tr>';
}

echo $data;
