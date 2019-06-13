<?php

	require_once('week5homework2_conn.php');
	
	//判斷是否為登入狀態
	if(!isset($_COOKIE["account"])) {
		echo ("<script> alert ('尚未登入'); location.href = '/PHP/week5homework2_login.php';</script>");
	} else {
		$account = $_COOKIE["account"];
		$sql_Nickname = "SELECT * FROM registered WHERE account = '$account'";
		$result_Nickname = $conn->query($sql_Nickname);
		$row_Nickname = $result_Nickname->fetch_assoc();
		$nickname = $row_Nickname["nickname"];
		
		//主留言板
		if(isset($_POST['comment'])){
			$comment = $_POST['comment'];
			
			//判斷主留言板是否評論有輸入文字
			if (mb_strlen($comment, 'utf8') == 0){
				echo 'Please insert comment';
			} else {
				$sql_main_insert = "INSERT INTO maincomment(nickname,comment) VALUES('$nickname','$comment')";
				if ($conn->query($sql_main_insert)){
					header('Location: week5homework2_main.php');
				} else {
					header('Location: week5homework2_main.php');
					echo 'Error:' . $sql_main_insert . '<br>' . $conn->error;
				}
			}
		}
		
		//子留言板
		if(isset($_POST['comment_child'])){
			$comment_child = $_POST['comment_child'];
			$id_main = $_POST['id_main'];
			
			//判斷子留言板是否評論有輸入文字
			if (mb_strlen($comment_child, 'utf8') == 0){
				echo 'Please insert comment';
			} else {
				$sql_child_insert = "INSERT INTO childcomment(id_main,nickname_child,comment_child) VALUES('$id_main','$nickname','$comment_child')";
				if ($conn->query($sql_child_insert)){
					header('Location: week5homework2_main.php');
				} else {
					header('Location: week5homework2_main.php');
					echo 'Error:' . $sql_child_insert . '<br>' . $conn->error;
				}
			}
		}
	}
?>
