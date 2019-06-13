<?php
	require_once('week5homework2_conn.php');
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset = 'UTF-8' />
		<meta name = 'viewport' content = 'width = device-width, initial-scale = 1' />
		<title>登入</title>
		<style>
			div, form{
				display: flex;
				flex-direction: column;
				align-items: center;
				margin: 20px;
			}
			form{
				border: 2px solid;
				border-color: #80808057;
				padding: 20px;
			}
			form input{
				margin: 10px 0px;
			}
			.submit{
				width: 60px;
				height: 30px;
				background: #6eafff;
				color: white;
				border-radius: 5px;
				font-size: 14px;
				font-weight: bold;
				letter-spacing: 4px;
			}
			div a{
				text-decoration: none;
			}
		</style>
	</head>
	<body>
		<div>
			<h1>登入</h1>
			<form action = '/PHP/week5homework2_login.php' method = 'GET' class = 'registered'>
				<input type = 'text' name = 'account' placeholder = '請輸入帳號' />
				<input type = 'password' name = 'password' placeholder = '請輸入密碼' />
				<input type = 'submit' value = '送出' class = 'submit'/>
			</form>
			<?php
				if (isset($_GET['account']) && isset($_GET['password'])){
					$account = $_GET['account'];
					$password = $_GET['password'];
					$sql = "SELECT * FROM registered WHERE account = '$account' AND password = '$password'";
					$result = $conn->query($sql);
					$row = $result->fetch_assoc();
					
					//判斷資料庫是否有該帳號密碼
					if ($row['account'] != $account || $row['password'] != $password){
						echo ("<script>alert ('錯誤的帳號密碼')</script>");
					} else {
						setcookie("account", "$account", time()+3600*24);
						echo ("<script>alert ('登入成功'); location.href = '/PHP/week5homework2_main.php';</script>");
					}
				}
			?>
			<div>
				<a href = '/PHP/week5homework2_registered.php'>註冊帳號</a>
			</div>
		</div>
	</body>
</html>