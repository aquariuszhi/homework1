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
		}
		
		public function login(){
			$request_body = file_get_contents('php://input');
			$data = json_decode($request_body);
			$account = $data->account;
			$password = $data->password;
			
			$result = $this->login_model->set_login($account, $password);
			
			$cookie = get_cookie("XSRF-TOKEN", false);
			$header = $this->input->get_request_header('X-XSRF-TOKEN', TRUE);
			
			if($cookie === $header){
				if($result === 'accountErr'){
					$arr = array('result' => '帳號錯誤', 'nickname' => null);	
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				} else if($result === 'passwordErr'){
					$arr = array('result' => '密碼錯誤', 'nickname' => null);	
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				} else {
					$arr = array('result' => 'success', 'nickname' => $result);	
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				}
			} else {
				$arr = array('result' => '錯誤，請重新登入！', 'nickname' => null);	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
			
		}
		
		public function login_check(){
			$this->load->library('session');
			$login_check = $this->session->userdata('account');
			if(!$login_check) {
				$arr = array('result' => 'error', 'nickname' => null);	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			} else {
				$nickname = $this->session->userdata('nickname');
				$arr = array('result' => 'success', 'nickname' => $nickname);	
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