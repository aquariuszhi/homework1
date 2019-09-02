<?php
	class Writing_model extends CI_Model{
		public function __construct(){
			$this->load->database();  //引入database設定檔
			$this->load->library('session');
		}
		
		public function get_writing($limit,$offset){
			$this->db->order_by('id', 'desc')->limit($limit, $offset);
			$this->db->select('main_comment.id, main_comment.account, writing, category, release, like_num, comment_num, main_comment.createdAt, nickname, type, image');
			$this->db->from('main_comment');
			$this->db->where('release', '公開');
			$this->db->join('user', 'user.account = main_comment.account', 'left');
			$this->db->join('user_image', 'user_image.account = main_comment.account', 'left');
			
			$query = $this->db->get();
			return $query->result_array();
		}
		
		public function get_loginUser_like($accountSession, $limit, $offset){
			$this->db->order_by('main_comment.id', 'desc')->limit($limit, $offset);
			$this->db->select('id_like');
			$this->db->from('main_comment');
			$this->db->join('like_list', 'like_list.id_like = main_comment.id', 'left');
			$this->db->where('account_like', $accountSession);
			
			$query = $this->db->get();
			return $query->result_array();
		}
		
		public function get_one_writing($id){
			$query = $this->db->get_where('main_comment', array('id' => $id));
			return $query->result_array();
		}
		
		public function get_comment_num($id){
			$this->db->select('comment_num');
			$query = $this->db->get_where('main_comment', array('id' => $id));
			return $query->result_array();
		}
		
		public function get_assign_comment($id){
			$this->db->order_by('id_child', 'esc');
			$this->db->select('child_comment.id_child, child_comment.account,child_comment.comment, child_comment.createdAt, nickname, image' );
			$this->db->from('child_comment');
			$this->db->join('user', 'user.account = child_comment.account', 'left');
			$this->db->join('user_image', 'user_image.account = child_comment.account', 'left');
			
			$query = $this->db->where("id", $id)->get();
			return $query->result_array();
		}
		
		public function set_main_writing($account, $writing, $category, $release, $comment_num){
			$data = array(
				'account' => $account,
				'writing' => $writing,
				'category' => $category,
				'release' => $release,
				'comment_num' => $comment_num
			);
			return $this->db->insert('main_comment', $data);
		}
		
		public function set_comment($id, $account, $comment){
			
			$data_child = array(
				'id' => $id,
				'account' => $account,
				'comment' => $comment
			);
			return $this->db->insert('child_comment', $data_child);
		}
		
		public function set_comment_num($id, $comment_num){
			
			$data = array(
				'comment_num' => $comment_num
			);
			
			return $this->db->where("id", $id)->update('main_comment',$data);
		}

		public function set_modify_writing($modifyId, $modifyWriting, $modifyCategory, $modifyRelease){
			$data = array(
				'writing' => $modifyWriting,
				'category' => $modifyCategory,
				'release' => $modifyRelease
			);
			$this->db->where('id', $modifyId);
			$this->db->update('main_comment', $data);
			return true;
		}

		public function set_del_writing($id){
			$tables = array('main_comment', 'child_comment');
			$this->db->where('id', $id);
			
			return $this->db->delete($tables);
		}
		
		public function get_like_num($id){
			$this->db->select('like_num');
			$query = $this->db->get_where('main_comment', array('id' => $id));
			return $query->result_array();
		}
		
		public function set_like_num($id, $like_num){
			
			$data = array(
				'like_num' => $like_num
			);
			
			return $this->db->where("id", $id)->update('main_comment',$data);
		}
		
		public function set_like_list($id, $account){
			
			$data = array(
				'id_like' => $id,
				'account_like' => $account
			);
			
			return $this->db->insert('like_list', $data);
		}
		
		public function checkFollow($account, $accountSession){
			$this->db->where('follow', $account);
			$this->db->where('follow_by', $accountSession);
			
			$query =$this->db->get('follow');
			return $query->row_array();
		}
		
		public function add_follow($account, $accountSession){
			
			$data = array(
				'follow' => $account,
				'follow_by' => $accountSession
			);
			
			return $this->db->insert('follow', $data);
		}
		
		public function cancel_follow($account, $accountSession){
			$this->db->where('follow', $account);
			$this->db->where('follow_by', $accountSession);
			
			return $this->db->delete('follow');
		}
		
		public function get_count() {
			$this->db->where('release', '公開');
			return $this->db->count_all_results('main_comment');
		}
		
		public function get_my_writing($account, $limit, $offset){
			$this->db->order_by('id', 'desc')->limit($limit, $offset);
			$this->db->select('main_comment.id, main_comment.account, writing, category, release, like_num, comment_num, main_comment.createdAt, nickname, type, image');
			$this->db->from('main_comment');
			$this->db->where('main_comment.account', $account);
			$this->db->join('user', 'user.account = main_comment.account', 'left');
			$this->db->join('user_image', 'user_image.account = main_comment.account', 'left');
			
			$query = $this->db->get();
			return $query->result_array();
		}
		
		public function get_mywriting_count($account) {
			$this->db->where('account', $account);
			return $this->db->count_all_results('main_comment');
		}
		
		public function get_other_writing($account, $limit, $offset){
			$this->db->order_by('id', 'desc')->limit($limit, $offset);
			$this->db->select('main_comment.id, main_comment.account, writing, category, release, like_num, comment_num, main_comment.createdAt, nickname, type, image');
			$this->db->from('main_comment');
			$this->db->where('main_comment.account', $account);
			$this->db->where('release!=', '私人');
			$this->db->join('user', 'user.account = main_comment.account', 'left');
			$this->db->join('user_image', 'user_image.account = main_comment.account', 'left');
			
			$query = $this->db->get();
			return $query->result_array();
		}
		
		public function get_otherwriting_count($account) {
			$this->db->where('account', $account);
			$this->db->where('release!=', '私人');
			return $this->db->count_all_results('main_comment');
		}
		
		public function get_otherpublic_writing($account, $limit, $offset){
			$this->db->order_by('id', 'desc')->limit($limit, $offset);
			$this->db->select('main_comment.id, main_comment.account, writing, category, release, like_num, comment_num, main_comment.createdAt, nickname, type, image');
			$this->db->from('main_comment');
			$this->db->where('main_comment.account', $account);
			$this->db->where('release', '公開');
			$this->db->join('user', 'user.account = main_comment.account', 'left');
			$this->db->join('user_image', 'user_image.account = main_comment.account', 'left');
			
			$query = $this->db->get();
			return $query->result_array();
		}
		
		public function get_otherpublic_count($account) {
			$this->db->where('account', $account);
			$this->db->where('release', '公開');
			return $this->db->count_all_results('main_comment');
		}
		
		public function get_category_writing($category, $limit, $offset){
			$this->db->order_by('id', 'desc')->limit($limit, $offset);
			$this->db->select('main_comment.id, main_comment.account, writing, category, release, like_num, comment_num, main_comment.createdAt, nickname, type, image');
			$this->db->from('main_comment');
			$this->db->where('main_comment.category', $category);
			$this->db->where('release', '公開');
			$this->db->join('user', 'user.account = main_comment.account', 'left');
			$this->db->join('user_image', 'user_image.account = main_comment.account', 'left');
			
			$query = $this->db->get();
			return $query->result_array();
		}
		
		public function get_category_count($category) {
			$this->db->where('category', $category);
			$this->db->where('release', '公開');
			return $this->db->count_all_results('main_comment');
		}
		
		public function get_follow_writing($accountSession, $limit, $offset){
			$this->db->order_by('main_comment.id', 'desc')->limit($limit, $offset);
			$this->db->select('main_comment.id, main_comment.account, writing, category, release, like_num, comment_num, main_comment.createdAt, nickname, type, image');
			$this->db->where('follow_by', $accountSession);
			$this->db->from('follow');
			$this->db->where('main_comment.release!=', '私人');
			$this->db->join('main_comment', 'main_comment.account = follow.follow', 'left');
			$this->db->join('user', 'user.account = follow.follow', 'left');
			$this->db->join('user_image', 'user_image.account = follow.follow', 'left');
			
			$query = $this->db->get();
			return $query->result_array();
		}
		
		public function get_follow_writing_count($accountSession) {
			$this->db->where('main_comment.release!=', '私人');
			$this->db->where('follow.follow_by', $accountSession);
			$this->db->join('follow', 'main_comment.account = follow.follow', 'right');
			return $this->db->count_all_results('main_comment');
		}
		
		public function getFollowUser($accountSession){
			$this->db->select('user.account, nickname, image');
			$this->db->from('follow');
			$this->db->where(array('follow_by' => $accountSession));
			$this->db->join('user', 'user.account = follow.follow', 'left');
			$this->db->join('user_image', 'user_image.account = user.account', 'left');
			
			$query_user = $this->db->get();
			return $query_user->result_array();
			
		}
	}