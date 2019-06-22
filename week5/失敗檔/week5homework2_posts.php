<?php

	require_once('week5homework2_conn.php');
	
	//主留言板
	if(isset($_POST['nickname']) && isset($_POST['comment'])){
		$nickname = $_POST['nickname'];
		$comment = $_POST['comment'];
		
		//判斷主留言板 1.暱稱是否過長 2.是否暱稱和評論都有輸入文字
		if(mb_strlen($nickname,'utf8') > 10){
			echo 'nickname too long';
		} else if (mb_strlen($nickname,'utf8') == 0 || mb_strlen($comment, 'utf8') == 0){
			echo 'Please insert nickname or comment';
		} else {
			$sql_main_insert = "INSERT INTO maincomment(nickname,comment) VALUES('$nickname','$comment')";
			if ($conn->query($sql_main_insert)){
				echo "<script type = 'text/javascript'>alert ('留言成功') ;</script>";
			} else {
				echo 'Error:' . $sql_main_insert . '<br>' . $conn->error;
			}
		}
	}
	
	//子留言板
	if(isset($_POST['nickname_child']) && isset($_POST['comment_child'])){
		$nickname_child = $_POST['nickname_child'];
		$comment_child = $_POST['comment_child'];
		$id_main = $_POST['id_main'];
		
		//判斷子留言板 1.暱稱是否過長 2.是否暱稱和評論都有輸入文字
		if(mb_strlen($nickname_child,'utf8') > 10){
			echo 'nickname too long';
		} else if (mb_strlen($nickname_child,'utf8') == 0 || mb_strlen($comment_child, 'utf8') == 0){
			echo 'Please insert nickname or comment';
		} else {
			$sql_child_insert = "INSERT INTO childcomment(id_main,nickname_child,comment_child) VALUES('$id_main','$nickname_child','$comment_child')";
			if ($conn->query($sql_child_insert)){
				echo "<script type = 'text/javascript'>alert ('留言成功') ;</script>";
			} else {
				echo 'Error:' . $sql_child_insert . '<br>' . $conn->error;
			}
		}
	}
?>
