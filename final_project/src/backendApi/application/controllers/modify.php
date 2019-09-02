<?php
	header('Access-Control-Allow-Origin: http://localhost:8080');
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, X-XSRF-TOKEN');
	header('Access-Control-Allow-Credentials: true');
	if ( "OPTIONS" === $_SERVER['REQUEST_METHOD'] ) {
		die();
	}
	
	class modify extends CI_Controller{
		
		public function __construct(){
			parent::__construct();
			$this->load->model('modify_model');
			$this->load->library('session');
			$this->load->helper('cookie');
		}
		
		public function modify(){
			$request_body = file_get_contents('php://input');
			$data = json_decode($request_body);
			$id_main = $data->id_main;
			$nickname = $data->nickname;
			$comment = $data->comment;				
			$result = $this->modify_model->set_modify_comment($id_main, $nickname, $comment);
			//確認CSRF Token（防止CSRF攻擊）
			$cookie = get_cookie("XSRF-TOKEN", false);
			$header = $this->input->get_request_header('X-XSRF-TOKEN', TRUE);
			
			if($cookie === $header){
				$arr = array('result' => 'success');
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			} else {
				$arr = array('result' => '錯誤，請重新登入！');	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
		}
	}