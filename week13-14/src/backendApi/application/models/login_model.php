<?php

	class login_model extends CI_Model{
		public function __construct(){
			$this->load->database();
		}
		
		
		public function set_login($account, $password){
			$query = $this->db->get_where('register', array('account' => $account));
			
			if($query->row() === null){
				return 'accountErr' ;
			} else {
				$row = $query->row();
				if(!password_verify($password,$row->password)){
					return 'passwordErr';
				} else {
					$this->load->library('session');
					$nickname = $row->nickname;
					$session = $this->session->set_userdata('nickname', $nickname);
					return $nickname ;
				}
			};
		}
	}
	
