<?php
	require_once('week6homework_conn.php');
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
			<form action = '/PHP/week6homework_login.php' method = 'GET' class = 'registered'>
				<input type = 'text' name = 'account' placeholder = '請輸入帳號' />
				<input type = 'password' name = 'password' placeholder = '請輸入密碼' />
				<input type = 'submit' value = '送出' class = 'submit'/>
			</form>
			<?php
				if (isset($_GET['account']) && isset($_GET['password'])){
					$account = $_GET['account'];
					$password = $_GET['password'];
					$sql = $conn->prepare("SELECT * FROM registered WHERE account = ?");
					$sql -> bind_param("s", $account);
					$sql ->execute();
					$result = $sql->get_result();
					$row = $result->fetch_assoc();
					
					//判斷資料庫是否有該帳號密碼
					if ($row['account'] != $account || !password_verify($password,$row['password'])){
						echo ("<script>alert ('錯誤的帳號密碼'); location.href = '/PHP/week6homework_login.php';</script>");
					} else {
						$id_registered = $row['id_registered'];
						$session = uniqid(mt_rand(), true);
						$sql_session = $conn->query("INSERT INTO session(session_id,user_id) VALUES('$session','$id_registered')");
						setcookie("session", "$session", time()+3600*24, '/; samesite = Lax');
						echo ("<script>alert ('登入成功'); location.href = '/PHP/week6homework_main.php';</script>");
					}
				}
				$conn->close();
			?>
			<div>
				<a href = '/PHP/week6homework_registered.php'>註冊帳號</a>
			</div>
		</div>
	</body>
</html>