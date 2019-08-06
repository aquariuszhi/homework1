<?php
	class Comment_model extends CI_Model{
		public function __construct(){
			$this->load->database();
			$this->load->library('session');
		}
		
		public function get_comment($limit,$offset){
			$query = $this->db->order_by('id_main', 'desc')->limit($limit, $offset)->get('maincomment');
			return $query->result_array();
		}
		
		public function get_assign_comment($id_main){
			$query = $this->db->get_where('maincomment', array('id_main' => $id_main));
			return $query->result_array();
		}
		
		public function get_child_num($id_main){
			$this->db->select('child_num');
			$query = $this->db->get_where('maincomment', array('id_main' => $id_main));
			return $query->result_array();
		}

		public function get_child_comment($id_main){
			//$query = $this->db->get('childcomment');
			$query = $this->db->get_where('childcomment', array('id_main' => $id_main));
			return $query->result_array();
		}
		
		public function get_last_comment(){
			$query = $this->db->order_by('id_main', 'desc')->limit(1)->get('maincomment');
			return $query->row_array();
		}
		
		public function get_last_childcomment(){
			$query = $this->db->order_by('id_child', 'desc')->limit(1)->get('childcomment');
			return $query->row_array();
		}
		
		public function set_main_comment($nickname, $comment){
			$data = array(
				'nickname' => $nickname,
				'comment' => $comment
			);
		return $this->db->insert('maincomment',$data);
		}
		
		public function set_child_comment($id_main, $nickname, $comment_child){
			
			$data_child = array(
				'id_main' => $id_main,
				'nickname_child' => $nickname,
				'comment_child' => $comment_child
			);
		return $this->db->insert('childcomment',$data_child);
		}

		public function set_del_comment($id_main){
			$tables = array('maincomment', 'childcomment');
			$this->db->where('id_main', $id_main);
			
			return $this->db->delete($tables);
		}
		
		public function get_count() {
			return $this->db->count_all('maincomment');
		}
	}