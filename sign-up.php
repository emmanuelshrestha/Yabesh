<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if(isset($_POST['name']) && isset($_POST['email'])){
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);

    $sql = "INSERT INTO users (name, email) VALUES ('$name', '$email')";

    if($conn->query($sql) === TRUE){
        echo "Thank you! You have been signed up successfully.";
    } else {
        echo "Error: " . $conn->error;
    }

} else {
    echo "Please fill all fields.";
}

$conn->close();
?>
