<!DOCTYPE html>
<html>
<head>
     <link rel="icon" href="pkm-games/img/item266.png" type="image/png">
	<title>SIGN UP</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
     <form action="signup-check.php" method="post">
     	<h2>Đăng ký</h2>
     	<?php if (isset($_GET['error'])) { ?>
     		<p class="error"><?php echo $_GET['error']; ?></p>
     	<?php } ?>

          <?php if (isset($_GET['success'])) { ?>
               <p class="success"><?php echo $_GET['success']; ?></p>
          <?php } ?>

          <label>Tên</label>
          <?php if (isset($_GET['name'])) { ?>
               <input type="text" 
                      name="name" 
                      placeholder="Name"
                      value="<?php echo $_GET['name']; ?>"><br>
          <?php }else{ ?>
               <input type="text" 
                      name="name" 
                      placeholder="Tên"><br>
          <?php }?>

          <label>Tài khoản</label>
          <?php if (isset($_GET['uname'])) { ?>
               <input type="text" 
                      name="uname" 
                      placeholder="User Name"
                      value="<?php echo $_GET['uname']; ?>"><br>
          <?php }else{ ?>
               <input type="text" 
                      name="uname" 
                      placeholder="Tài khoản"><br>
          <?php }?>


     	<label>Mật khẩu</label>
     	<input type="password" 
                 name="password" 
                 placeholder="Mật khẩu"><br>

          <label>Xác nhận mật khẩu</label>
          <input type="password" 
                 name="re_password" 
                 placeholder="Xác nhận mật khẩu"><br>

     	<button type="submit">Đăng ký</button>
          <a href="index.php" class="ca">Bạn đã có tài khoản?</a>
     </form>
</body>
</html>