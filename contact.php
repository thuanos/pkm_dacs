<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $mobile = $_POST["mobile"];
    $comment = $_POST["comment"];
    $date = date("Y-m-d"); // Lấy ngày hiện tại

    // Kết nối đến cơ sở dữ liệu (sử dụng thông tin của bạn)
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "test_db";

    // Tạo kết nối
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Kiểm tra kết nối
    if ($conn->connect_error) {
        die("Kết nối đến cơ sở dữ liệu thất bại: " . $conn->connect_error);
    }

    // Chuẩn bị truy vấn SQL
    $sql = "INSERT INTO contact_us (name, email, mobile, comment, added_on)
            VALUES ('$name', '$email', '$mobile', '$comment', '$date')";

    if ($conn->query($sql) === true) {
        echo "Đã lưu thông tin liên hệ thành công!";
    } else {
        echo "Lỗi: " . $sql . "<br>" . $conn->error;
    }

    // Đóng kết nối
    $conn->close();
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Contact Us</title>
    <link rel="icon" href="pkm-games/img/item266.png" type="image/png">
    <link rel="stylesheet" type="text/css" href="style.css">
    <style>
  #myTextarea {
    width: 440px;
    height: 80px;
  }
  #topLeftButton {
    position: absolute;
    top: 10px;
    left: 10px;
  }
</style>
</head>
<header>
    <a id="topLeftButton" href="/pkm-games/index.php" class="ca">Back</a>
</header>
<body>
    <h1>Contact Us</h1>
    <form method="post" action="<?php echo $_SERVER["PHP_SELF"]; ?>">
        <label for="name">Name:</label>
        <input type="text" name="name" required><br><br>

        <label for="email">Email:</label>
        <input type="email" name="email" required><br><br>

        <label for="mobile">Mobile:</label>
        <input type="text" name="mobile" required><br><br>

        <label for="comment">Comment:</label>
        <textarea id="myTextarea" name="comment" required></textarea><br><br>
        <div style="display: flex; justify-content: center;">
            <input  type="submit" value="Submit">
        </div>
         
    </form>
    
</body>
</html>
