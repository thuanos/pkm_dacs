<?php 
session_start();

if (isset($_SESSION['id']) && isset($_SESSION['user_name'])) {

 ?>
<!DOCTYPE html>
<html>
<head>
	<title>Change Password</title>
    <link rel="icon" href="pkm-games/img/item266.png" type="image/png">
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <form action="change-p.php" method="post">
     	<h2>Đổi mật khẩu</h2>
     	<?php if (isset($_GET['error'])) { ?>
     		<p class="error"><?php echo $_GET['error']; ?></p>
     	<?php } ?>

     	<?php if (isset($_GET['success'])) { ?>
            <p class="success"><?php echo $_GET['success']; ?></p>
        <?php } ?>

     	<label>Mật khẩu cũ</label>
     	<input type="password" 
     	       name="op" 
     	       placeholder="Mật khẩu cũ">
     	       <br>

     	<label>Mật khẩu mới</label>
     	<input type="password" 
     	       name="np" 
     	       placeholder="Mật khẩu mới">
     	       <br>

     	<label>Xác nhận mật khẩu</label>
     	<input type="password" 
     	       name="c_np" 
     	       placeholder="Xác nhận mật khẩu">
     	       <br>

     	<button type="submit">Đổi mật khẩu</button>
          <a href="pkm-games/index.php" class="ca">Trang chủ</a>
     </form>
</body>
</html>

<?php 
}else{
     header("Location: index.php");
     exit();
}
 ?>