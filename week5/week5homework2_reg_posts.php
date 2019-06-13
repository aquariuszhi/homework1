<?php

	require_once('week5homework2_conn.php');
	
	//主留言板
	if(isset($_POST['nickname']) && isset($_POST['account']) && isset($_POST['password'])){
		$nickname = $_POST['nickname'];
		$account = $_POST['account'];
		$password = $_POST['password'];
		$sql_account = "SELECT * FROM registered WHERE account = '$account'";
		$result_account = $conn->query($sql_account);
		$row_account = $result_account->fetch_assoc();
		$sql_nickname = "SELECT * FROM registered WHERE nickname = '$nickname'";
		$result_nickname = $conn->query($sql_nickname);
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
			$sql_insert = "INSERT INTO registered(account,password,nickname) VALUES('$account','$password','$nickname')";
			if ($conn->query($sql_insert)){
				echo ("<script>alert ('註冊成功'); location.href = '/PHP/week5homework2_login.php';</script>");
			} else {
				echo "<script>alert '註冊失敗'</script>";
				header('Location: week5homework2_registered.php');
				echo 'Error:' . $sql_insert . '<br>' . $conn->error;
			}
		}
	}
?>
