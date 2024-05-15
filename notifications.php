
<!DOCTYPE html>
<html>
<head>
    <title>Thông báo</title>
    <link rel="icon" href="pkm-games/img/item266.png" type="image/png">
    <style>
        body {
            background-image: url('pkm-games/img/credits2.png');
            background-size: cover;
            text-align: center;
        }
    </style>
</head>
<header>
<button style="float: left;" onclick="goBack()">Back</button>
    <script>
        function goBack() {
            window.history.back();
        }
    </script>
</header>
<body>
    <h1> THÔNG BÁO </h1>
    <br><br><br><br>
<?php

$servername = "localhost"; 
$username = "root";     
$password = "";     
$dbname = "test_db";       


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Kết nối đến cơ sở dữ liệu thất bại: " . $conn->connect_error);
}

$sql = "SELECT categories FROM thongbao";


$result = $conn->query($sql);


if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo $row["categories"] . "<br>";
    }
} else {
    echo "Không có dữ liệu.";
}


$conn->close();
?>
</body>
</html>