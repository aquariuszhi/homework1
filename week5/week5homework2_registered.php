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
			<h1>註冊</h1>
			<form action = '/PHP/week5homework2_reg_posts.php' method = 'POST' class = 'registered'>
				<input type = 'text' name = 'account' placeholder = '請輸入帳號' />
				<input type = 'password' name = 'password' placeholder = '請輸入密碼' />
				<input type = 'text' name = 'nickname' placeholder = '請輸入暱稱' />
				<input type = 'submit' name = 'submit' value = '送出' class = 'submit'/>
			</form>
			<a href = '/PHP/week5homework2_login.php'>返回登入頁面</a>
		</div>
	</body>
</html>