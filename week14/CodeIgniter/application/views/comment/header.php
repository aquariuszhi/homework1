<!DOCTYPE html>
<html>
	<head>
		<meta charset = 'UTF-8' />
		<meta name = 'viewport' content = 'width = device-width, initial-scale = 1' />
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
			.message_collapse, .message_collapse_ajax{
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
			.modify, .delete{
				text-decoration: none;
				font-size: 14px;
			}
			.modify{
				margin-left: 400px;
			}
			.show_pink{
				background: #ff00001f;
			}
		</style>
		<script src = 'https://code.jquery.com/jquery-3.4.1.min.js'></script>
		<script type = 'text/javascript'>
			document.addEventListener('DOMContentLoaded', function(){
				
				$('.input_main_comment').submit(function(e){
					e.preventDefault();
					const comment = $(e.target).find('textarea[name=comment]').val()
					$.ajax({
						type: 'POST',
						url: '/CodeIgniter/index.php/comment/comment',
						cache: 'false',
						data: {
							comment: comment,
						},
						success: function(resp){
							var res = JSON.parse(resp)
							if(res.result === 'success'){
								$('.writecomment').val('')
								$('.input_main_comment').after(`
									<div class = "main">
										<div class = 'information name_time main_coment_done modifydiv'>
											<p>${res.nickname}</p>
											<p><a href = '/CodeIgniter/index.php/modify/modify/?id_main=${res.id_main}' class = 'modify'>編輯</a></p>
											<p><a href = '/CodeIgniter/index.php/comment/comment/?id_main=${res.id_main}&action=del' class = 'delete'>刪除</a></p>
											<p>${res.createdAt}</p>
										</div>
										<div class = 'information main_coment_done'>
											<span>
												<p>${comment}</p>
											</span>
										</div>
										<div class = "child_comment">
											<?php
												$attributes = array('class' => 'input_child_comment');
												echo form_open('comment/comment', $attributes);
											?>
												<span class = "message_collapse_ajax " onclick = 'initialise(event)'>回應▲</span>
												<section class = "comment_insert_hide">
													<div>
													<?php
															$userdata = $this->session->all_userdata();
															echo "<p>".$userdata['nickname']."</p>";
													?>
													</div>
													<div>
														<textarea name = "comment_child" wrap = "physical" placeholder = "在此輸入您的評論" class = "writecomment"></textarea>
														<input type = "hidden" name = "id_main" value = "${res.createdAt}">
													</div>
													<input type = "submit" name = "submit" value = "送出" class = "submit">
												</section>
											</form>
										</div>
									</div>`	
								)
								$('.main:last').remove();
							}
						}
					})
				})
			})
			
			function initialise(event){
							var div = event.target
							var expand = div.classList.toggle('message_expand')
							var div_show = event.target.nextElementSibling
							var show = div_show.classList.toggle('comment_insert_show')
							
							if(expand && show){
								event.target.innerText = '回應▼' ;
							} else {
								event.target.innerText = '回應▲' ;
							}
			}
			
			


		</script>
	</head>
	<body>