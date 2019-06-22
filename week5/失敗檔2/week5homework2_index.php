<!DOCTYPE html>
<html>
	<head>
		<meta charset = "UTF-8"/>
		<meta name = "viewport" content = "width = device-width, initial-scale = 1" />
		<meta name = "og:title" content = "留言板" />
		<meta name = "og:description" content = "week5homework2" />
		<meta name = "og:type" content = "website" />
		<title>留言板</title>
		<link href = "/PHP/week5homework2_index.css" type = "text/css" rel = "stylesheet"/>
		<script src = "/PHP/week5homework2.js" type = 'text/javascript'></script>
	</head>
	<body>
		<div>
		<script type = "text/javascript">
		var len = "<?php echo '<div><h1>留言板</h1></div>' ; ?>"
		document.write(len)
		</script>
			<div>
				<form method = "POST" class = 'input_main_comment'>
					<div>
						<input type = "text" name = "nickname" placeholder = "在此輸入您的暱稱" id = 'nickname_main'>
					</div>
					<div>
						<textarea name = "comment" wrap = "physical" placeholder = "在此輸入您的評論" class = "writecomment" id = "writecomment_main"></textarea>
					</div>
					<input type = "button" name = "submit" value = "送出" class = "submit" onClick = "ajax_main();">
				</form>
			</div>
		</div>
	</body>
</html>