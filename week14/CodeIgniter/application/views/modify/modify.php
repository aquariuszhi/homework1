<?php
	//判斷是否為登入狀態 
	if($this->session->userdata('nickname') === null) {
		echo ("<script> alert ('尚未登入'); location.href = '../../login/login';</script>");
	} else {
		$userdata = $this->session->all_userdata();
				echo ('<p>&lt使用者&gt'.$userdata['nickname']."</p>") ;

		foreach ($comment as $data_item): 
?>
		<div>
			<h1>編輯留言</h1>	
		</div>
		<div>
			<?php echo validation_errors(); ?>
			<?php 
				$attributes = array('class' => 'input_main_comment');
				echo form_open('modify/modify/?id_main='.$data_item["id_main"], $attributes);
			?>
				<div>
				<?php //顯示暱稱
					echo "<p>".$userdata['nickname']."</p>";
				?>
				</div>
				<div>
					<textarea name = "comment" wrap = "physical" placeholder = "在此輸入您的評論" class = "writecomment"><?php echo $data_item["comment"]; ?></textarea>
					<input type = "hidden" name = "id_main" value = "<?php echo $data_item["id_main"] ; ?>" />
				</div>
				<input type = "submit" name = "submit" value = "送出" class = "submit" />
			</form>
		</div>
<?php
		endforeach;
	}
?>
	</body>
</html>