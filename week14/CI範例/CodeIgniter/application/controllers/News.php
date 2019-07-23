<?php
	class News extends CI_Controller{
		public function __construct(){
			parent::__construct();
			$this->load->model('news_model');
		}
		
		public function index(){
			$data['news'] = $this->news_model->get_news();
			$data['title'] = 'News archive';
			
			$this->load->view('templates/header', $data);
			$this->load->view('news/index', $data);
			$this->load->view('templates/footer');
		}
		
		public function view($slug = NULL){
			$data['news_item'] = $this->news_model->get_news($slug);
			
			if(empty($data['news_item'])){
				show_404();
			}
			
			$data['title'] = $data['news_item']['title'];
			
			$this->load->view('templates/header', $data);
			$this->load->view('news/view', $data);
			$this->load->view('templates/footer');

		}
		
		public function create(){
			$this->load->helper('form'); //載入 Form 輔助函式
			$this->load->library('form_validation'); //載入Form Validation 程式庫
			
			$data['title'] = 'Create a news item';
			
			$this->form_validation->set_rules('title', 'Title', 'required');
			$this->form_validation->set_rules('text', 'text', 'required');
			//set_rules() 方法需要三個參數，輸入欄位的名稱，用來顯示在錯誤訊息中的名稱，以及規則。 在這個例子中使用的規則，用來表示標題及內文都是必要的欄位。
			
			if($this->form_validation->run() === FALSE){
				$this->load->view('templates/header', $data);
				$this->load->view('news/create');
				$this->load->view('templates/footer');
			} else {
				$this->news_model->set_news();
				$this->load->view('news/success');
			}
		}
	}