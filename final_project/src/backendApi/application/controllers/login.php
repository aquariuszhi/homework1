<?php
	header('Access-Control-Allow-Origin: http://localhost:8080');
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, X-XSRF-TOKEN');
	header('Access-Control-Allow-Credentials: true');
	if ( "OPTIONS" === $_SERVER['REQUEST_METHOD'] ) {
		die();
	}
		
	class login extends CI_Controller{
		public function __construct(){
			parent::__construct();
			$this->load->model('login_model');
			$this->load->helper('cookie');
			$this->load->library('session');
		}
		
		public function login(){
			$request_body = file_get_contents('php://input'); //從header content獲取表單資料
			$data = json_decode($request_body);
			$account = $data->account;
			$password = $data->password;
			
			$result = $this->login_model->set_login($account, $password);

			if($result === 'accountErr'){
				$arr = array('result' => '帳號錯誤', 'nickname' => null);	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			} else if($result === 'passwordErr'){
				$arr = array('result' => '密碼錯誤', 'nickname' => null);	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			} else {
				$arr = array('result' => 'success');	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
		}
		
		public function login_check(){
			$login_account = $this->session->userdata('account');
			if($login_account === null) {
				$arr = array('result' => 'error');	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			} else {
				$result = $this->login_model->get_user($login_account);
				
				$account = $result['account'];
				$nickname = $result['nickname'];
				$imageSql = $result['image'];
				$imageDncode = stripslashes(base64_decode($imageSql));
				$imageEncode = base64_encode($imageDncode);
				
				$arr = array('result' => 'success', 'account' => $account, 'nickname' => $nickname, 'image' => $imageEncode);	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
		}
		
		public function logout(){
			$this->load->library('session');
			$this->session->sess_destroy();
			
			$arr = array('result' => 'success');	
			$this->output->set_content_type('application/json')->set_output(json_encode($arr));
		}
	}