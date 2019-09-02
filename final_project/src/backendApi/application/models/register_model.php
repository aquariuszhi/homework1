<?php
	class Register_model extends CI_Model{
		public function __construct(){
			$this->load->database();  //引入database設定檔
			$this->load->library('session');
		}
		
		public function get_account_check($account){
			$sql = "SELECT * FROM user WHERE account = ?";
			$query = $this->db->query($sql, array($account));
			if($query->result_array()){
				return true;
			} else {
				return false;
			}
		}
		
		public function set_register($account, $password, $nickname){
			
			$passwordHash = password_hash($password, PASSWORD_DEFAULT);
			
			$data = array(
				'account' => $account,
				'password' => $passwordHash,
				'nickname' => $nickname
			);
			return $this->db->insert('user',$data);
		}
		
		public function set_image($account, $fileType, $sqlImage){
			
			$sql = "SELECT account FROM user_image WHERE account = ?";
			$query = $this->db->query($sql, array($account));
			
			$data = array(
				'type' => $fileType,
				'image' => $sqlImage
			);
			
			$newData =  array(
				'account' => $account,
				'type' => $fileType,
				'image' => $sqlImage
			);
			
			if($query->result_array()){
				return $this->db->update('user_image', $data, array('account' => $account));
			} else {
				$this->db->set($newData);
				return $this->db->insert('user_image');
			}
			
		}
		
		public function set_new_nickname($account, $nickname){
			
			$data = array(
				'nickname' => $nickname
			);

			return $this->db->update('user', $data, array('account' => $account));
		}
		
		public function set_search($nickname){
			$this->db->select('user.account, nickname, image');
			$this->db->from('user');
			$this->db->like(array('user.nickname' => $nickname));
			$this->db->join('user_image', 'user_image.account = user.account', 'left');
			
			$query_user = $this->db->get();
			return $query_user->result_array();
			
		}
	}