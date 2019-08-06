<?php echo validation_errors(); ?>

<div class = 'registered'>
	<?php echo form_open('register/create') ?>
		
			
				<h1>註冊</h1>
					<input type = 'text' name = 'account' placeholder = '請輸入帳號(英數字10字內)' class = 'insert'/>
					<input type = 'password' name = 'password' placeholder = '請輸入密碼(英數字10字內)' class = 'insert'/>
					<input type = 'text' name = 'nickname' placeholder = '請輸入暱稱(中英數字10字內)' class = 'insert'/>
					<input type = 'submit' name = 'submit' value = '送出' class = 'submit'/>
				<a href = '../login/login'>返回登入頁面</a>
			

	</form>
</div>