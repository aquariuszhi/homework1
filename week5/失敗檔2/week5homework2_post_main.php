<?php

	require_once('week5homework2_conn.php');
	
	//主留言板傳送資料到mysql
	if(isset($_POST['nickname']) && isset($_POST['comment'])){
		$nickname = $_POST['nickname'];
		$comment = $_POST['comment'];
		$sql_main_insert = "INSERT INTO maincomment(nickname,comment) VALUES('$nickname','$comment')";
		mysql_query($sql_main_insert);
		//傳回最後一次使用 INSERT 指令的 ID
		$responseId=mysql_insert_id();
		echo $responseId;
	}
?>