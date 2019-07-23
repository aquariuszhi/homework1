<?php
	class News_model extends CI_Model{
		public function __construct(){
			$this->load->database();
		}
		
		public function get_news($slug = FALSE){
			if($slug === FALSE){
				$query = $this->db->get('news');
				return $query->result_array();
			}
			$query = $this->db->get_where('news', array('slug' => $slug));
			return $query->row_array();
		}
		
		public function set_news(){
			$this->load->helper('url');
			
			$slug = url_title($this->input->post('title'), 'dash', TRUE);
			//url_title()會讀取你傳入的字串，使用破折號(-)來替換掉空白，並將所有字串轉為小寫，最後會產生一個slug 
			
			$data = array(
				'title' => $this->input->post('title'),
				'slug' => $slug,
				'text' => $this->input->post('text')
			);
		return $this->db->insert('news',$data);
		}
	}