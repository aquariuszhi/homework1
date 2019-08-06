<?php
	class modify_model extends CI_Model{
		public function __construct(){
			$this->load->database();
		}

		public function set_modify_comment($id_main, $nickname, $comment){
			$data = array(
				'nickname' => $nickname,
				'comment' => $comment
			);
			$this->db->where("id_main", $id_main);
			
			return $this->db->update('maincomment',$data);
	
		}
		
	}