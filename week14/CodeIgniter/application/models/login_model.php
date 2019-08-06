<?php
	class login_model extends CI_Model{
		public function __construct(){
			$this->load->database();
		}
		
		
		public function set_login(){
			$account = $this->input->post('account');
			$password = $this->input->post('password');
			$query = $this->db->get_where('register', array('account' => $account));
			
			if($query->row() === null){
				echo '帳號錯誤';
			} else {
				$row = $query->row();
				if(!password_verify($password,$row->password)){
					echo '密碼錯誤';
				} else {
					$this->load->library('session');
					$nickname = $row->nickname;
					$session = $this->session->set_userdata('nickname', $nickname);
				}
			};
		}
	}
	
