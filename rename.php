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
    <form action="action-rename.php" method="post">
        <h2>Đổi tên</h2>
        <?php if (isset($_GET['error'])) { ?>
            <p class="error"><?php echo $_GET['error']; ?></p>
        <?php } ?>

        <?php if (isset($_GET['success'])) { ?>
            <p class="success"><?php echo $_GET['success']; ?></p>
        <?php } ?>

        <label>Nhập tên mới</label>
        <input type="name" 
               name="op" 
               placeholder="Nhập tên mới">
               <br>

        <button type="submit" >Đổi tên</button>
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