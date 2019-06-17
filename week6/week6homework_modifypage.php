<?php
	require_once('week6homework_conn.php');
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset = "UTF-8"/>
		<meta name = "viewport" content = "width = device-width, initial-scale = 1" />
		<meta name = "og:title" content = "留言板" />
		<meta name = "og:description" content = "week6homework" />
		<meta name = "og:type" content = "website" />
		<title>留言板</title>
		<style>
			body{
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			div{
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				box-sizing: border-box;
				width: 700px;
			}
			.input_main_comment{
				box-sizing: border-box;
				width: 700px;
				border: 1px solid;
				border-color: #d5d5f5;
				padding: 10px;
				margin-bottom: 10px;
			}
			form div{
				margin: 5px 0px;
			}
			.main_coment_done{
				margin: 0px 10px;
			}
			.writecomment{
				width: 640px;
				height: 50px;
				max-width: 640px;
				max-height: 60px;
			}
		</style>
	</head>
	<body>
		<div>
			<h1>編輯留言</h1>	
		</div>

<?php
	//判斷是否為登入狀態 
	if(!isset($_COOKIE["session"])) {
		echo ("<script> alert ('尚未登入'); location.href = '/PHP/week6homework_login.php';</script>");
	} else {
		$session = $_COOKIE["session"];
		$sql_session = $conn->prepare("SELECT * FROM session WHERE session_id = ?");
		$sql_session -> bind_param("s", $session);
		$sql_session ->execute();
		$result_session = $sql_session->get_result();
		$row_id_reg = $result_session->fetch_assoc();
		$row_session = $row_id_reg['session_id'];
		$id_main = $_GET["id_main"];
		//判斷session和資料庫是否一致
		if ($row_session == $session){
			$sql_Nickname = $conn->prepare("SELECT registered.nickname FROM registered JOIN session WHERE id_registered = ?");
			$sql_Nickname -> bind_param("s", $row_id_reg["user_id"]);
			$sql_Nickname ->execute();
			$result_Nickname = $sql_Nickname->get_result();
			$row_Nickname = $result_Nickname->fetch_assoc();
			
			$sql_comment = $conn->prepare("SELECT maincomment.comment FROM maincomment WHERE id_main = ?");
			$sql_comment -> bind_param("s", $id_main);
			$sql_comment ->execute();
			$result_comment = $sql_comment->get_result();
			$row_comment = $result_comment->fetch_assoc();
?>
		<div>
			<form action = "/PHP/week6homework_put.php" method = "POST" class = 'input_main_comment'>
				<div>
				<?php //顯示暱稱
					echo "<p>".htmlspecialchars($row_Nickname["nickname"], ENT_QUOTES, 'UTF-8')."</p>";
				?>
				</div>
				<div>
					<textarea name = "comment" wrap = "physical" placeholder = "在此輸入您的評論" class = "writecomment"><?php echo htmlspecialchars($row_comment["comment"], ENT_QUOTES, 'UTF-8'); ?>"</textarea>
					<input type = "hidden" name = "id_main" value = "<?php echo htmlspecialchars($id_main, ENT_QUOTES, 'UTF-8'); ?>">
				</div>
				<input type = "submit" name = "submit" value = "送出" class = "submit">
			</form>
		</div>
<?php
		} else {
			echo 'Error! 煩請重新登出後再登入';
			$conn->close();
?>
			<script>
				signOut();
				function signOut(){
							
					document.cookie='session=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
					alert ('登出成功')
					location.href = '/PHP/week6homework_login.php'
				}	
			</script>
<?php
		}
	}
?>
	</body>
</html>