<?php
	header('Access-Control-Allow-Origin: http://localhost:8080');
	header("Access-Control-Allow-Methods: GET, POST, OPTION, PUT, DELETE");
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, X-XSRF-TOKEN');
	header('Access-Control-Allow-Credentials: true');
	
	if ( "OPTIONS" === $_SERVER['REQUEST_METHOD'] ) {
		die();
	}
	
	class register extends CI_Controller{
		public function __construct(){
			parent::__construct();
			$this->load->model('register_model');
			$this->load->helper('cookie');
		}
		
		public function create(){			
			$request_body = file_get_contents('php://input');
			$data = json_decode($request_body);
			$account = $data->account;
			$password = $data->password;
			$nickname = $data->nickname;
			
			$accountCheck = $this->register_model->get_account_check($account);
			$nicknameCheck = $this->register_model->get_nickname_check($nickname);
			
			$cookie = get_cookie("XSRF-TOKEN", false);
			$header = $this->input->get_request_header('X-XSRF-TOKEN', TRUE);
			
			if($cookie === $header){
				if(strlen($account) > 10){
					$arr = array('result' => '帳號過長');	
					$this->output->set_content_type('application/json')->set_output(json_encode($arr)); //輸出json格式資料
				} else if(strlen($password) > 10){
					$arr = array('result' => '密碼過長');	
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				} else if(strlen($nickname) > 10){
					$arr = array('result' => '暱稱過長');	
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				} else if($accountCheck === 'repeat'){
					$arr = array('result' => '帳號重複');	
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				} else if($nicknameCheck === 'repeat'){
					$arr = array('result' => '暱稱重複');	
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
			} else {
				$arr = array('result' => '錯誤，請重新登入！');	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
		}
	}