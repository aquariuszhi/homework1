<?php
	class modify_model extends CI_Model{
		public function __construct(){
			$this->load->database();
		}
		
		public function get_comment($id_main){
			$query = $this->db->get_where('maincomment', array('id_main' => $id_main));
			return $query->result_array();
		}		
		
		public function set_modify_comment(){
			$this->load->helper('url');
						
			$data = array(
				'nickname' => $this->session->userdata('nickname'),
				'comment' => $this->input->post('comment')
			);
			$id_main = $this->input->post('id_main');
			$this->db->where("id_main", $id_main);
			
			return $this->db->update('maincomment',$data);
		}
		
	}