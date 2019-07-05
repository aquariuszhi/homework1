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
			$nickname = $row_Nickname["nickname"];
			
			$sql_main = $conn->prepare("SELECT * FROM maincomment WHERE nickname = ?");
			$sql_main -> bind_param("s", $nickname);
			$sql_main ->execute();
			$result_main = $sql_main->get_result();
			$row_main = $result_main->fetch_assoc();
			$datetime = $row_main["datetime"];
			$id_main_ajax = $row_main["id_main"];
		
								
			//主留言板
			if(isset($_POST['comment'])){
				$comment = $_POST['comment'];
				
				//判斷主留言板是否評論有輸入文字
				if (mb_strlen($comment, 'utf8') == 0){
					echo 'Please insert comment';
				} else {
					$sql_main_insert = "INSERT INTO maincomment(nickname,comment) VALUES('$nickname','$comment')";
					if ($conn->query($sql_main_insert)){
						$arr = array('result' => 'success', 'nickname' => $nickname, 'datetime' => $datetime, 'id_main' => $id_main_ajax );
						echo json_encode($arr);
						//header('Location: week6homework_main.php');
					} else {
						header('Location: week6homework_main.php');
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
						header('Location: week6homework_main.php');
					} else {
						header('Location: week6homework_main.php');
						echo 'Error:' . $sql_child_insert . '<br>' . $conn->error;
					}
				}
			}
		} else {
			echo 'Error! 煩請重新登出後再登入';
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
	$conn->close();
?>
