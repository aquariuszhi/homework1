<?php
	header('Access-Control-Allow-Origin: http://localhost:8080');
	header("Access-Control-Allow-Methods: GET, POST, OPTION, PUT, DELETE");
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, X-XSRF-TOKEN');
	header('Access-Control-Allow-Credentials: true');
	
	if ( "OPTIONS" === $_SERVER['REQUEST_METHOD'] ) {
		die();
	}
	
	class Register extends CI_Controller{
		
		public function __construct(){
			parent::__construct();
			$this->load->model('register_model');
			$this->load->helper('cookie');  //引入cookie輔助函數
			$this->load->library('session');  //引入session函式庫
			$this->load->library('image_lib');  //引入圖片函式庫
		}
		
		public function create(){			
			$request_body = file_get_contents('php://input'); //從header content獲取表單資料
			$data = json_decode($request_body);
			$account = $data->account;
			$password = $data->password;
			$nickname = $data->nickname;
			
			$accountCheck = $this->register_model->get_account_check($account);
			
			//確認字串是否過長或帳號是否重複
			if(strlen($account) > 10){
				$arr = array('result' => '帳號過長');	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			} else if(strlen($password) > 10){
				$arr = array('result' => '密碼過長');	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			} else if(mb_strlen($nickname,'utf8') > 10){
				$arr = array('result' => '暱稱過長');	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			} else if($accountCheck){
				$arr = array('result' => '帳號重複');	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			} else {
				$result = $this->register_model->set_register($account, $password, $nickname);
				if($result === true){
					$arr = array('result' => 'success', 'account' => $account);	
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				} else {
					$arr = array('result' => 'Err');	
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				}
			}
		}
		
		public function image_update(){			
			$account = $_POST['account'];
			$imageFile = $_FILES['imageFile'];
			
			$fileType = $imageFile['type'];
			$fileData = $imageFile['tmp_name'];

			$accountSession = $this->session->userdata('account');  //從session獲取帳號
			
			$cookie = get_cookie("XSRF-TOKEN", false);  //從cookie獲取CSRF token
			$header = $this->input->get_request_header('X-XSRF-TOKEN', TRUE);  //從header獲取CSRF token
			
			//確認CSRF token相同後，再確認session是否為登入狀態，以及帳號和session是否一致
			if($cookie === $header && $account === $accountSession){
				
				$this->load->library('image_lib');
				
				$config['image_library'] = 'gd2';  //使用的圖像庫
				$config['source_image'] = $fileData;  //圖片來源
				$config['maintain_ratio'] = TRUE;  //保持比例
				$config['width']     = 300;  //圖片寬度
				$config['height']   = 300;  //圖片高度
				$config['new_image'] = 'C:/Users/dezhi/Desktop/UwAmp/www/backendApi/uploads/test.jpg';

				$this->image_lib->initialize($config);

				$this->image_lib->resize();
				
				$newImage = 'C:/Users/dezhi/Desktop/UwAmp/www/backendApi/uploads/test.jpg';
				
				$imageSize = filesize($newImage);  //圖片大小
				
				$sqlImage = base64_encode(addslashes(fread(fopen($newImage, "r"), $imageSize)));  //addslashes可以將特殊字符加上反斜線，避免mysql資料錯誤
				$result = $this->register_model->set_image($account, $fileType, $sqlImage);
				
				if($result === true){
					$arr = array('result' => 'success');	
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				} else {
					$arr = array('result' => 'Err');	
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				}
			} else {
				$arr = array('result' => '錯誤，請重新登入！');	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
		}
		
		public function nickname_update(){			
			$request_body = file_get_contents('php://input'); //從header content獲取表單資料
			$data = json_decode($request_body);
			$account = $data->account;
			$nickname = $data->nickname;
			
			$cookie = get_cookie("XSRF-TOKEN", false);  //從cookie獲取CSRF token
			$header = $this->input->get_request_header('X-XSRF-TOKEN', TRUE);  //從header獲取CSRF token
			
			$accountSession = $this->session->userdata('account');
				
			//確認CSRF token相同後，再確認session是否為登入狀態，以及帳號和session是否一致
			if($cookie === $header && $account === $accountSession){
				if(mb_strlen($nickname,'utf8') > 10){
					$arr = array('result' => '暱稱過長');	
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				} else {
					$result = $this->register_model->set_new_nickname($account, $nickname);
					if($result === true){
						$arr = array('result' => 'success');	
						$this->output->set_content_type('application/json')->set_output(json_encode($arr));
					} else {
						$arr = array('result' => 'Err');	
						$this->output->set_content_type('application/json')->set_output(json_encode($arr));
					}
				}
			} else {
				$arr = array('result' => '錯誤，請重新登入！');	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
		}
		
		public function search(){
			$request_body = file_get_contents('php://input'); //從header content獲取表單資料
			$data = json_decode($request_body);
			$nickname = $data->nickname;
			
			$result = $this->register_model->set_search($nickname);

			if($result){
				//將資料過濾反斜線後再送出
				$resultLen = count($result);
				for($i = 0 ; $i < $resultLen ; $i++){
					if($result[$i]['image'] !== null){
						$result[$i]['image'] = base64_encode(stripslashes(base64_decode($result[$i]['image'])));
					};
				};
				
				$arr = array('result' => 'success', 'user' => $result);	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			} else {
				$arr = array('result' => 'No result', 'user' => '');	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
		}
	}