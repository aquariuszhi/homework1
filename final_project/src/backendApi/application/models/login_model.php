<?php

	class login_model extends CI_Model{
		public function __construct(){
			$this->load->database();
		}
		
		
		public function set_login($account, $password){
			$sql = "SELECT * FROM user WHERE account = ?";
			$query = $this->db->query($sql, array($account));
			
			if($query->row() === null){  //驗證帳號
				return 'accountErr' ;
			} else {
				$row = $query->row();
				if(!password_verify($password,$row->password)){  //驗證密碼
					return 'passwordErr';
				} else {
					$this->load->library('session');
					$userData = array(
						'account' => $account
					);
					$session = $this->session->set_userdata($userData);  //設定session為帳號
					$nickname = $row->nickname;
					return $nickname ;
				}
			};
		}
		
		public function get_user($login_account){
			$this->db->select('user.account, nickname, image');
			$this->db->from('user');
			$this->db->where(array('user.account' => $login_account));
			$this->db->join('user_image', 'user_image.account = user.account', 'left');
			
			$query_user = $this->db->get();
			return $query_user->row_array();
			
		}
	}
	
