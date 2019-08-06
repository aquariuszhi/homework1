<?php 
	if($comment !== null){
		foreach ($comment as $data_item): 
?>
		
		<div class = "main">
				<div class = 'information name_time main_coment_done modifydiv'>
					<p><?php echo $data_item['nickname'] ?></p>
					<?php //登入與否做不同反應
						if($this->session->userdata('nickname') === $data_item['nickname']) {
					?>
							<p><a href = '/CodeIgniter/index.php/modify/modify/?id_main=<?php echo $data_item['id_main'] ?>' class = 'modify'>編輯</a></p>
							<p><a href = '/CodeIgniter/index.php/comment/comment/?id_main=<?php echo $data_item['id_main'] ?>&action=del' class = 'delete'>刪除</a></p>
					<?php
						} 
					?>
					<p><?php echo $data_item['createdAt'] ?></p>
				</div>
				<div class = 'information main_coment_done'>
					<span>
						<p><?php echo $data_item['comment'] ?></p>
					</span>
				</div>
				<div class = "child_comment">
					<?php
						if($child_comment !== null){
							foreach ($child_comment as $child_item): 
								if($child_item['id_main'] === $data_item['id_main']){
					?>
									<div class = 'child_comment_done <?php if($this->session->userdata('nickname') === $child_item['nickname_child']) {
											echo "show_pink";
											}?>' >
										<div class = 'information name_time'>
											<p><?php echo $child_item['nickname_child'] ?></p>
											<p><?php echo $child_item['created_at'] ?></p>
										</div>
										<div class = 'information'>
											<span>
												<p><?php echo $child_item['comment_child'] ?></p>
											</span>
										</div>
									</div>
				<?php 
								};
					endforeach;
					};
						if($this->session->userdata('nickname') !== null) {
								$attributes = array('class' => 'input_child_comment');
								echo form_open('comment/comment', $attributes);
						?>
								<span class = "message_collapse" onclick = 'initialise(event)'>回應▲</span>
								<section class = "comment_insert_hide">
									<div>
										<?php //登入與否做不同反應
												$userdata = $this->session->all_userdata();
												echo "<p>".$userdata['nickname']."</p>";
										?>
									</div>
									<div>
										<textarea name = "comment_child" wrap = "physical" placeholder = "在此輸入您的評論" class = "writecomment"></textarea>
										<input type = "hidden" name = "id_main" value = "<?php echo $data_item['id_main'] ?>">
									</div>
									<input type = "submit" name = "submit" value = "送出" class = "submit">
								</section>
							</form>
					<?php
						}
					?>
				</div>
			</div>

<?php 
	endforeach;
	}
 ?>

		<div class = 'pagination'>
			 <p><?php echo $links; ?></p>
		</div>
	</div>
</div>

		