<?php
	require_once('week6homework_conn.php');
	
	//判斷是否為登入狀態
	if(!isset($_COOKIE["session"])) {
		echo ("<script> alert ('尚未登入'); location.href = '/PHP/week6homework_login.php';</script>");
	} else {
		$session = $_COOKIE["session"];
		$sql_session = $conn->prepare("DELETE FROM session WHERE session_id = ?");
		$sql_session -> bind_param("s", $session);
		$sql_session ->execute();
		unset($_COOKIE['session']);
		setcookie('session', null, -1, '/');
		echo ("<script> alert ('登出成功'); location.href = '/PHP/week6homework_main.php';</script>");
	}
?>