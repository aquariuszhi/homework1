<?php
	header('Access-Control-Allow-Origin: http://localhost:8080');
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, X-XSRF-TOKEN');
	header('Access-Control-Allow-Credentials: true');
	if ( "OPTIONS" === $_SERVER['REQUEST_METHOD'] ) {
		die();
	}
	
	class Comment extends CI_Controller{
		
		public function __construct(){
			parent::__construct();
			$this->load->model('comment_model');
			$this->load->library('session');
			$this->load->helper('cookie');
			
			$this->load->library('pagination'); //建立分頁
		}
		
		public function comment(){
			
			$nickname = $this->session->userdata('nickname');
			parse_str($_SERVER['QUERY_STRING'], $_GET);
			
			//顯示主頁面
			$all_items = $this->comment_model->get_count();
			$pages = ceil($all_items/10);
			$page = ($this->uri->segment(3)) ? $this->uri->segment(3) : 1; //取得index.php後面第3個區段的uri
			$offset = ($page-1)*10;
			
			$config = array();
			$config['per_page'] = 10; //每頁顯示筆數

			$data['comment'] = $this->comment_model->get_comment($config['per_page'], $offset);
			$arr = array('result' => 'success', 'maincomment' => $data['comment'], 'pages' => $pages, 'page' => $page);
			
			$this->output->set_content_type('application/json')->set_output(json_encode($arr)); //輸出json格式資料
			
		}
		
		public function get_one_comment(){
			$id_main = $_GET['id_main'];
			
			$assign_comment['comment'] = $this->comment_model->get_assign_comment($id_main);
			$assign_comment['childcomment'] = $this->comment_model->get_child_comment($id_main);
			$arr = array('result' => 'success', 'maincomment' => $assign_comment['comment'], 'childcomment' => $assign_comment['childcomment']);
			$this->output->set_content_type('application/json')->set_output(json_encode($arr));				
		}
		
		public function create(){
			$request_body = file_get_contents('php://input');
			$data = json_decode($request_body);
			$nickname = $data->nickname;
			$comment = $data->comment;
			$child_num = 0;
			
			$cookie = get_cookie("XSRF-TOKEN", false);
			$header = $this->input->get_request_header('X-XSRF-TOKEN', TRUE);
			if($cookie === $header){
				//送出主留言
				$result = $this->comment_model->set_main_comment($nickname, $comment, $child_num);
				if($result){
					$arr = array('result' => 'success');
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				} else {
					$arr = array('result' => 'fail');
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				}
			} else {
				$arr = array('result' => 'fail');
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
		}
		
		public function create_child(){
			$request_body = file_get_contents('php://input');
			$data = json_decode($request_body);
			$nickname = $data->nickname;
			$comment_child = $data->comment_child;
			$id_main = $data->id_main;
			
			//送出子留言
			$result = $this->comment_model->set_child_comment($id_main, $nickname, $comment_child);
			
			//在maincomment table更新子留言數目
			$child_old = $this->comment_model->get_child_num($id_main);
			$child_old_num = $child_old[0] ;
			$child_num = $child_old_num['child_num']+1;

			$data = array(
				'child_num' => $child_num
			);
			$this->db->where("id_main", $id_main);
			$this->db->update('maincomment',$data);
			
			$cookie = get_cookie("XSRF-TOKEN", false);
			$header = $this->input->get_request_header('X-XSRF-TOKEN', TRUE);
			
			if($cookie === $header){
				if($result){
					$childcomment['childcomment'] = $this->comment_model->get_last_childcomment();
					$arr = array('result' => 'success', 'childcomment' => $childcomment['childcomment']);
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				} else {
					$arr = array('result' => 'fail');
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				}
			} else {
				$arr = array('result' => 'fail');
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
		}
		
		public function delete_comment(){
			$request_body = file_get_contents('php://input');
			$data = json_decode($request_body);
			$id_main = $data->id_main;
			
			//刪除主留言
			$result = $this->comment_model->set_del_comment($id_main);
			
			$cookie = get_cookie("XSRF-TOKEN", false);
			$header = $this->input->get_request_header('X-XSRF-TOKEN', TRUE);
			
			if($cookie === $header){
				if($result){
					$arr = array('result' => 'success');
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				} else {
					$arr = array('result' => 'fail');
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				}
			} else {
				$arr = array('result' => 'fail');
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
		}
		
	}