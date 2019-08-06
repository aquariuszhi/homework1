<?php echo validation_errors(); ?>

<div class = 'registered'>
	<?php echo form_open('login/login') ?>
		
			
				<h1>登入</h1>
					<input type = 'text' name = 'account' placeholder = '請輸入帳號' class = 'insert'/>
					<input type = 'password' name = 'password' placeholder = '請輸入密碼' class = 'insert'/>
					<input type = 'submit' name = 'submit' value = '送出' class = 'submit'/>
				<a href = '../register/create'>註冊新帳號</a>
			

	</form>
</div>