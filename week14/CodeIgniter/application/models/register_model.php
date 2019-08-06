<?php
	class register_model extends CI_Model{
		public function __construct(){
			$this->load->database();
		}
		
		
		public function set_register(){
			
			$password = password_hash($this->input->post('password'), PASSWORD_DEFAULT);
			
			$data = array(
				'account' => $this->input->post('account'),
				'password' => $password,
				'nickname' => $this->input->post('nickname')
			);
		return $this->db->insert('register',$data);
		}
	}