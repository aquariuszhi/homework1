<?php

	require_once('week6homework_conn.php');
	
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
		//判斷session和資料庫是否一致
		if ($row_session == $session){
			$sql_Nickname = $conn->prepare("SELECT registered.nickname FROM registered JOIN session WHERE id_registered = ?");
			$sql_Nickname -> bind_param("s", $row_id_reg["user_id"]);
			$sql_Nickname ->execute();
			$result_Nickname = $sql_Nickname->get_result();
			$row_Nickname = $result_Nickname->fetch_assoc();
			$id_main = $_GET["id_main"];
			
			//刪除留言
			$sql_del = "DELETE FROM maincomment WHERE id_main = ?";
			$sql_delete = $conn->prepare($sql_del);
			$sql_delete -> bind_param("i", $id_main);
			$sql_delete ->execute();
			$conn->close();
			header('Location:/PHP/week6homework_main.php');

		} else {
			echo 'Error! 煩請重新登出後再登入';
			$conn->close();
?>
			<script>
				signOut();
				function signOut(){
							
					document.cookie='session=; expires=Thu, 01 Jan 1970 00:00:00 GMT'  //清除session
					alert ('登出成功')
					location.href = '/PHP/week6homework_login.php'
				}	
			</script>
<?php
		}
	}
?>
