<?php
	class Comment extends CI_Controller{
		
		public function __construct(){
			parent::__construct();
			$this->load->model('comment_model');
			$this->load->library('session');
			
			$this->load->library('pagination'); //建立分頁
		}
		
		public function comment(){
			$data['child_comment'] = $this->comment_model->get_child_comment();
			
			$this->load->helper('form'); //顯示表單元素並增加一些額外功能，例如增加一個隱藏的 CSRF 預防欄位
			$this->load->library('form_validation'); //表單驗證錯誤時，用來顯示錯誤訊息
			
			$this->form_validation->set_rules('comment', 'comment', 'required');
			//set_rules() 方法需要三個參數，輸入欄位的名稱，用來顯示在錯誤訊息中的名稱，以及規則。 在這個例子中使用的規則，用來表示標題及內文都是必要的欄位。
			
			$nickname = $this->session->userdata('nickname');
			parse_str($_SERVER['QUERY_STRING'], $_GET);
			
			if($this->input->post('comment_child')){ //子留言送出後重新導回主頁
				$result = $this->comment_model->set_child_comment($id_main);
				if($result){
					header("Location: /CodeIgniter/index.php/comment/comment");
				}
			} else if($_GET !== []){
				$id_main = $_GET['id_main'];
				$del_comment = $this->comment_model->get_del_comment($id_main);
				if($_GET['action'] === 'del' && $del_comment['nickname'] === $nickname){ //留言刪除功能	
					$this->comment_model->set_delete_comment($id_main);
					header("Location: /CodeIgniter/index.php/comment/comment");
				} else if($_GET['action'] === 'logout'){ //登出功能
					$this->session->sess_destroy();
					header("Location: /CodeIgniter/index.php/comment/comment");
				}
			} else {
				if($this->form_validation->run() === FALSE){  //顯示主頁面
					
					$all_items = $this->comment_model->get_count();
					$pages = ceil($all_items/10);
					$page = ($this->uri->segment(3)) ? $this->uri->segment(3) : 1; //取得index.php後面第3個區段的uri
					$offset = ($page-1)*10;
					
					$config = array();
					$config['base_url'] = 'http://localhost/CodeIgniter/index.php/comment/comment/';
					$config['total_rows'] = $all_items; //總筆數
					$config['per_page'] = 10; //每頁顯示筆數
					$config['num_links'] = 1; //放在您目前所在頁數前面跟後面所顯示的分頁數量。
					$config['use_page_numbers'] = TRUE; //顯示頁數在URI
					$config['first_link'] = '第一頁'; //在分頁左邊顯示"第一頁"的名稱。
					$config['last_link'] = '最後一頁'; //在分頁右邊顯示"最後一頁"的名稱。
					$config['prev_link'] = '&lt;'; //在分頁中顯示"上一頁"的名稱。
					$config['next_link'] = '&gt;'; //在分頁中顯示"下一頁"的名稱。
					
					$data['links'] = $this->pagination->initialize($config)->create_links();
					
					$data['comment'] = $this->comment_model->get_comment($config['per_page'], $offset);
					
					$this->load->view('comment/header', $data);
					$this->load->view('comment/create', $data);
					$this->load->view('comment/index', $data);
					$this->load->view('templates/footer');
				} else { //送出主留言
					$result = $this->comment_model->set_main_comment();
					if($result){
						$data['id_main'] = $this->comment_model->get_last_comment();
						$arr = array('result' => 'success', 'nickname' => $data['id_main']['nickname'], 'createdAt' => $data['id_main']['createdAt'], 'id_main' => $data['id_main']['id_main'] );
						echo json_encode($arr);
					}
				}
			}
		}
		
	}