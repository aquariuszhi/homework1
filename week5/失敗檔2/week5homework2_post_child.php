<?php

	require_once('week5homework2_conn.php');
	
	//子留言板傳送資料到mysql
	if(isset($_POST['nickname_child']) && isset($_POST['comment_child'])){
		$nickname_child = $_POST['nickname_child'];
		$comment_child = $_POST['comment_child'];
		$id_main = $_POST['id_main'];
		$sql_child_insert = "INSERT INTO childcomment(id_main,nickname_child,comment_child) VALUES('$id_main','$nickname_child','$comment_child')";
		if ($conn->query($sql_child_insert)){
			echo '留言成功';
		} else {
			echo 'Error:' . $sql_child_insert . '<br>' . $conn->error;
		}
	}
?>