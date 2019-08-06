<!DOCTYPE html>
<html>
	<head>
		<meta charset = "UTF-8"/>
		<meta name = "viewport" content = "width = device-width, initial-scale = 1" />
		<meta name = "og:title" content = "留言板" />
		<meta name = "og:description" content = "week6homework" />
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
			
			.input_main_comment{
				box-sizing: border-box;
				width: 700px;
				border: 1px solid;
				border-color: #d5d5f5;
				padding: 10px;
				margin-bottom: 10px;
			}
			
			form div{
				margin: 5px 0px;
			}
			
			.main_coment_done{
				margin: 0px 10px;
			}
			
			.writecomment{
				width: 640px;
				height: 50px;
				max-width: 640px;
				max-height: 60px;
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
	</head>
	<body>