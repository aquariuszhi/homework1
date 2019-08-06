<?php
	class register_model extends CI_Model{
		public function __construct(){
			$this->load->database();
		}
		
		public function get_account_check($account){
			$query = $this->db->get_where('register', array('account' => $account));
			if($query->result_array()){
				return 'repeat';
			} else {
				return 'no_repeat';
			}
		}
		
		public function get_nickname_check($nickname){
			$query = $this->db->get_where('register', array('nickname' => $nickname));
			if($query->result_array()){
				return 'repeat';
			} else {
				return 'no_repeat';
			}
		}
		
		public function set_register($account, $password, $nickname){
			
			$passwordHash = password_hash($password, PASSWORD_DEFAULT);
			
			$data = array(
				'account' => $account,
				'password' => $passwordHash,
				'nickname' => $nickname
			);
			return $this->db->insert('register',$data);
		}
	}