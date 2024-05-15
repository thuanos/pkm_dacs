<?php
session_start();

if (isset($_SESSION['id']) && isset($_SESSION['user_name'])) {
    // Thông tin đăng nhập MySQL
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "test_db";

   
    $conn = new mysqli($servername, $username, $password, $database);

   
    if ($conn->connect_error) {
        die("Kết nối thất bại: " . $conn->connect_error);
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $new_name = $_POST["op"];
        $user_id = $_SESSION['id'];

        // Cập nhật tên trong cơ sở dữ liệu
        $sql = "UPDATE users SET name='$new_name' WHERE id='$user_id'";

        if ($conn->query($sql) === TRUE) {
    echo '<script>
            setTimeout(function() {
                alert("Cập nhật tên thành công. Cần đăng nhập lại!");
                window.location.href = "login.php";
            }, 0);
          </script>';
    exit();
} else {
    header("Location: rename.php?error=Lỗi khi cập nhật tên: " . $conn->error);
    exit();
}
}

    // Đóng kết nối
    $conn->close();
} else {
    header("Location: index.php");
    exit();
}