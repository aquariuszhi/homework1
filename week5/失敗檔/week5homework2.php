<?php
	require_once('week5homework2_conn.php');
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset = "UTF-8"/>
		<meta name = "viewport" content = "width = device-width, initial-scale = 1">
		<meta name = "og:title" content = "留言板">
		<meta name = "og:description" content = "week5homework2">
		<meta name = "og:type" content = "website">
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
			.input_child_comment{
				box-sizing: border-box;
				border: 1px solid;
				border-color: #d5d5f5;
				width: 670px;
				padding: 10px;
				margin: 5px 0px;
				background: #d4e9f8;
			}
			form div{
				margin: 5px 0px;
			}
			.main{
				margin-bottom: 10px;
				border: 1px solid;
				border-color: #d5d5f5;
				justify-content: space-around;
			}
			.information{
				margin: 0px 0px;
				width: 670px;
				padding: 0px 10px;
			}
			.main_coment_done{
				margin: 0px 10px;
			}
			.name_time{
				position: relative;
				flex-direction: row;
				justify-content: space-between;
				box-sizing: border-box;
				width: 668px;
				
			}
			.name_time:before{
				content: '';
				position: absolute;
				left: 10px;
				bottom: 0;
				width: 650px;
				border-bottom: 1px solid;
				border-color: gray;
			}
				
				
			.child_comment{
				margin-left: 20px;
				margin-bottom: 5px;
				width: 675px;
			}
			.child_comment_done{
				background: #d4e9f8;
				margin: 5px 0px;
				box-sizing: border-box;
				border: 1px solid;
				border-color: #d5d5f5;
				width: 670px;
			}
			.writecomment{
				width: 640px;
				height: 50px;
				max-width: 640px;
				max-height: 60px;
			}
			.comment_insert_hide{
				display: none;
			}
			.comment_insert_show{
				display: block;
			}
			.message_collapse{
				color: blue;
				cursor: pointer;
			}
			.message_expand{
				color: blue;
				cursor: pointer;
			}
			.submit{
				width: 60px;
				height: 30px;
				background: #6eafff;
				color: white;
				border-radius: 5px;
				font-size: 14px;
				font-weight: bold;
				letter-spacing: 4px;
			}

		</style>
		<script type = 'text/javascript'>
			document.addEventListener('DOMContentLoaded', function(){
				
				//子留言區輸入區塊的收合
				var message_section = document.querySelectorAll('.message_collapse')
				for (let i = 0 ; i < message_section.length ; i++){
					message_section[i].addEventListener('click', e =>{
						var div = message_section[i]
						var expand = div.classList.toggle('message_expand')
						var div_show = document.querySelectorAll('.comment_insert_hide')[i]
						var show = div_show.classList.toggle('comment_insert_show')
						
						if(expand && show){
							e.target.innerText = '回應▼' ;
						} else {
							e.target.innerText = '回應▲' ;
						}
					})
				}
			})
			//主留言輸入區ajax
			function ajax_main(){
				var nickname = document.querySelector('#nickname_main_id').value
				var comment = document.querySelector('#comment_main_id').value
				var request = new XMLHttpRequest();
				request.open('POST', '/PHP/week5homework2_posts.php', true);
				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
				request.onload = function() {
				  if (request.status >= 200 && request.status < 400) {
					document.querySelector('#nickname_main_id').value = "";
					document.querySelector('#comment_main_id').value = "";	
					var resp = request.responseText;
				  } else {
					alert ("error");
				  }
				};
				request.onerror = function() {
				  alert ("error");
				};
				request.send("&nickname="+nickname+"&comment="+comment);
			}
			//子留言輸入區ajax
			function ajax_child(){
				var nickname_child = document.querySelector('#nickname_child').value
				var comment_child = document.querySelector('#comment_child').value
				var id_main = document.querySelector('#id_main').value
				console.log(nickname_child, comment_child, id_main)
				var request_child = new XMLHttpRequest();
				request_child.open('POST', '/PHP/week5homework2_posts.php', true);
				request_child.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
				request_child.send("&nickname_child="+nickname_child+"&comment_child="+comment_child+"&id_main="+id_main);
			}
			

		</script>
	</head>
	<body>
		<div>
			<div>
				<h1>留言板</h1>	
			</div>
			<div>
				<form method = "POST" class = 'input_main_comment' >
					<div>
						<input type = "text" name = "nickname" id = "nickname_main_id" placeholder = "在此輸入您的暱稱">
					</div>
					<div>
						<textarea name = "comment" wrap = "physical" id = "comment_main_id" placeholder = "在此輸入您的評論" class = "writecomment"></textarea>
					</div>
					<input type = "button" name = "submit" value = "送出" id = "submit_main" class = "submit" onClick = "ajax_main();">
				</form>
<?php
	//如果資料庫沒有資料就隱藏，否則依序將主留言顯示出來
	$sql_main = "SELECT * FROM maincomment";
	$result_main = $conn->query($sql_main);
	
	if ($result_main->num_rows > 0){
		while($row_main = $result_main->fetch_assoc()){
?>
				<div class = "main">
					<div class = 'information name_time main_coment_done'>
						<p><?php echo $row_main["nickname"]; ?></p>
						<p><?php echo $row_main["datetime"]; ?></p>
					</div>
					<div class = 'information main_coment_done'>
						<span>
							<p><?php echo $row_main["comment"]; ?></p>
						</span>
					</div>
					<div class = "child_comment">
<?php
	//如果資料庫沒有資料就隱藏，否則依序將子留言顯示出來
	$id_article = $row_main["id_main"];
	$sql_child = "SELECT * FROM childcomment WHERE id_main = '$id_article'";
	$result_child = $conn->query($sql_child);
	
	if ($result_child->num_rows > 0){
		while($row_child = $result_child->fetch_assoc()){
?>
						<div class = 'child_comment_done'>
							<div class = 'information name_time'>
								<p><?php echo $row_child["nickname_child"]; ?></p>
								<p><?php echo $row_child["datetime_child"]; ?></p>
							</div>
							<div class = 'information'>
								<span>
									<p><?php echo $row_child["comment_child"]; ?></p>
								</span>
							</div>
						</div>
<?php
		}
	}
?>
						<form method = "POST" class = 'input_child_comment'>
							<span class = "message_collapse">回應▲</span>
							<section class = "comment_insert_hide">
								<div>
									<input type = "text" name = "nickname_child" id = "nickname_child" placeholder = "在此輸入您的暱稱">
								</div>
								<div>
									<textarea name = "comment_child" wrap = "physical" placeholder = "在此輸入您的評論" class = "writecomment" id = "comment_child"></textarea>
									<input type = "hidden" name = "id_main" value = "<?php echo $row_main["id_main"]; ?>" id = "id_main">
								</div>
								<input type = "button" name = "submit" value = "送出" class = "submit" id = "submit_child" onClick = "ajax_child();">
							</section>
						</form>
					</div>
				</div>
<?php
		}
	}
?>
			</div>
		</div>
	</body>
</html>