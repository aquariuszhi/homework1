<?php
	require_once('week6homework_conn.php');
	
	//主留言板
	if(isset($_POST['nickname']) && isset($_POST['account']) && isset($_POST['password'])){
		$nickname = $_POST['nickname'];
		$account = $_POST['account'];
		$password = $_POST['password'];
		$password_hash = password_hash($password, PASSWORD_DEFAULT);
		
		$sql_account = $conn->prepare("SELECT * FROM registered WHERE account = ?");
		$sql_account -> bind_param("s", $account);
		$sql_account ->execute();
		$result_account = $sql_account->get_result();
		$row_account = $result_account->fetch_assoc();
		
		$sql_nickname = $conn->prepare("SELECT * FROM registered WHERE nickname = ?");
		$sql_nickname -> bind_param("s", $nickname);
		$sql_nickname ->execute();
		$result_nickname = $sql_nickname->get_result();
		$row_nickname = $result_nickname->fetch_assoc();
		//判斷註冊資料
		//1.暱稱、帳號和密碼是否過長
		if(mb_strlen($nickname,'utf8') > 15){
			echo 'nickname too long';
		} else if (strlen($account)> 15){
			echo 'account too long';
		} else if (strlen($password)> 15){
			echo 'password too long';
		//2.是否暱稱、帳號和密碼都有輸入文字
		} else if (mb_strlen($nickname,'utf8') == 0 || strlen($account) == 0 || strlen($password) == 0){
			echo 'Please insert nickname or comment';
		//3.判斷帳號和暱稱是否重複
		} else if ($row_account['account'] == $account){
			echo 'Account is repeat';
		} else if ($row_nickname['nickname'] == $nickname){
			echo 'Nickname is repeat';
		} else {
			$sql_insert = "INSERT INTO registered(account,password,nickname) VALUES('$account','$password_hash','$nickname')";
			
			if ($conn->query($sql_insert)){
				$conn->close();
				echo ("<script>alert ('註冊成功'); location.href = '/PHP/week6homework_login.php';</script>");
			} else {
				$conn->close();
				echo ("<script>alert '註冊失敗'; location.href = 'PHP/week6homework_registered.php';</script>");
			}
		}
	}
?>
