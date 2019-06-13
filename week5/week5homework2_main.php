<?php
	require_once('week5homework2_conn.php');
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset = "UTF-8"/>
		<meta name = "viewport" content = "width = device-width, initial-scale = 1" />
		<meta name = "og:title" content = "留言板" />
		<meta name = "og:description" content = "week5homework2" />
		<meta name = "og:type" content = "website" />
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
			.login{
				align-items: flex-end;
			}
			.login a{
				text-decoration: none;
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
			.pagination{
				display: flex;
				flex-direction: row;
				justify-content: center;
				margin: 10px 0px;
			}
			.pagination span, .pagination a{
				margin: 0px 10px;
				cursor: pointer;
				text-decoration: none;
			}
			.page_current{
				color: red;
			}
			.unclickable{
				pointer-events: none ;
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

		</script>
	</head>
	<body>
		<div>
			<div class = 'login'>
				<?php
					if(!isset($_COOKIE["account"])) {
						echo "<a href = '/PHP/week5homework2_login.php'>登入</a>";
					} else {
						$account = $_COOKIE["account"];
						$sql_Nickname = "SELECT * FROM registered WHERE account = '$account'";
						$result_Nickname = $conn->query($sql_Nickname);
						$row_Nickname = $result_Nickname->fetch_assoc();
						echo '<span>使用者：&lt'.$row_Nickname["nickname"]."&gt"
				?>
						<a href = 'javascript:signOut()'> 登出</a>
					</span>
					<script>
						function signOut(){
							document.cookie='account=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
							alert ('登出成功')
							location.href = '/PHP/week5homework2_login.php'
						}	
					</script>
				<?php
					}
				?>
			</div>
			<div>
				<h1>留言板</h1>	
			</div>
			<div>
				<form action = "/PHP/week5homework2_posts.php" method = "POST" class = 'input_main_comment'>
					<div>
					<?php
						if(!isset($_COOKIE["account"])) {
						echo "<p>暱稱</p>";
						} else {
						echo "<p>".$row_Nickname["nickname"]."</p>";
						}
					?>
					</div>
					<div>
						<textarea name = "comment" wrap = "physical" placeholder = "在此輸入您的評論" class = "writecomment"></textarea>
					</div>
					<input type = "submit" name = "submit" value = "送出" class = "submit">
				</form>
				<?php
					//如果資料庫沒有資料就隱藏，否則依序將主留言顯示出來
					$sql_main = "SELECT * FROM maincomment ORDER BY id_main DESC";
					$result_main = $conn->query($sql_main);
					$sql_main_num = ($result_main->num_rows);
					$pages = ceil($sql_main_num/10) ;
					if (!isset($_GET["page"])){ //假如$_GET["page"]未設置
						$page=1; //則在此設定起始頁數
					} else {
						$page = intval($_GET["page"]); //確認頁數只能夠是數值資料
					}
					$start = ($page-1)*10 ;
					$sql_page = "SELECT * FROM maincomment ORDER BY id_main DESC LIMIT $start, 10";
					$result_main_page = $conn->query($sql_page);
					
					if ($result_main_page->num_rows > 0){
						while($row_main = $result_main_page->fetch_assoc()){
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
						<form action = "/PHP/week5homework2_posts.php" method = "POST" class = 'input_child_comment'>
							<span class = "message_collapse">回應▲</span>
							<section class = "comment_insert_hide">
								<div>
								<?php
									if(!isset($_COOKIE["account"])) {
										echo "<p>暱稱</p>";
									} else {
										echo "<p>".$row_Nickname["nickname"]."</p>";
									}
								?>
								</div>
								<div>
									<textarea name = "comment_child" wrap = "physical" placeholder = "在此輸入您的評論" class = "writecomment"></textarea>
									<input type = "hidden" name = "id_main" value = "<?php echo $row_main["id_main"]; ?>">
								</div>
								<input type = "submit" name = "submit" value = "送出" class = "submit">
							</section>
						</form>
					</div>
				</div>
				<?php
						}
					}
				?>
				<div class = 'pagination'>
				<?php
					//分頁頁碼
					echo '共 '.$sql_main_num.' 筆留言-在第 '.$page.' 頁-共 '.$pages.' 頁';
					echo "<br /><a href=?page=1>首頁</a> ";
					echo "第 ";
					$previewPage = $page-1 ;
					echo "<a href =?page=".$previewPage." class = 'preview_page'>&lt</a>"; //上一頁按鈕
					for( $i=1 ; $i<=$pages ; $i++ ) {
							echo "<a href=?page=".$i." class = 'page'>".$i."</a> ";
					} 
					$nextPage = $page+1;
					echo "<a href =?page=".$nextPage." value =".$page." class = 'next_page'>&gt</a>"; //下一頁按鈕
					echo " 頁 <a href=?page=".$pages.">末頁</a><br /><br />";
					echo "<script type = 'text/javascript'>";
						//新增當前頁的class name，使得可以指定當前頁碼變紅色
						echo "let page = document.querySelectorAll('.page'); ";
						echo "let page_current = page[".$previewPage."] ;" ;
						echo "page_current.setAttribute('class', 'page_current');" ;
						//如果現在在最前頁，則無法點擊上一頁
						echo "if (".$page." === 1){ ";
							echo "let preview_none = document.querySelector('.preview_page') ;";
							echo "preview_none.setAttribute('class', 'unclickable') ;";
						echo "} ;";
						//如果現在在最末頁，則無法點擊下一頁
						echo "if (".$page." === ".$pages."){ ";
							echo "let next_none = document.querySelector('.next_page') ;";
							echo "next_none.setAttribute('class', 'unclickable') ;";
						echo "} ;";
					echo "</script>" ;
				?>
				</div>
			</div>
		</div>
	</body>
</html>