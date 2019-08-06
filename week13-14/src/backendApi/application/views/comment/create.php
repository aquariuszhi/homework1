<div>
	<div class = 'login'>
		<?php  //登入與否做不同反應
			if($this->session->userdata('nickname') === null) {
				echo "<a href = 'http://localhost/CodeIgniter/index.php/login/login'>登入留言</a>";
			} else {
				$userdata = $this->session->all_userdata();
				echo ('<p>&lt使用者&gt'.$userdata['nickname']."<a href = '../comment/comment/?action=logout'> 登出</a></p>") ;
			}
		?>
	</div>
	<div>
		<h1>留言板</h1>	
	</div>
	<?php //有登入才顯示留言輸入表單
		if($this->session->userdata('nickname') !== null) {
	?>
			<div>
				<?php echo validation_errors(); ?>
					<?php 
						$attributes = array('class' => 'input_main_comment');
						echo form_open('', $attributes);
					?>
						<div>
						<?php 
								echo "<p>".$userdata['nickname']."</p>";
						?>
						</div>
						<div>
							<textarea name = "comment" wrap = "physical" placeholder = "在此輸入您的評論" class = "writecomment"></textarea>
						</div>
						<input type = "submit" name = "submit" value = "送出" class = "submit">
					</form>
	<?php
		}
	?>