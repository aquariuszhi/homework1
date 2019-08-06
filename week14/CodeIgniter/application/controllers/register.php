<?php
	class register extends CI_Controller{
		public function __construct(){
			parent::__construct();
			$this->load->model('register_model');
		}
		
		public function create(){
			$this->load->helper('form'); //顯示表單元素並增加一些額外功能，例如增加一個隱藏的 CSRF 預防欄位
			$this->load->library('form_validation'); //表單驗證錯誤時，用來顯示錯誤訊息
			
			$this->form_validation->set_rules('account', 'account', 'required');
			$this->form_validation->set_rules('password', 'password', 'required');
			$this->form_validation->set_rules('nickname', 'nickname', 'required');
			//set_rules() 方法需要三個參數，輸入欄位的名稱，用來顯示在錯誤訊息中的名稱，以及規則。 在這個例子中使用的規則，用來表示標題及內文都是必要的欄位。
			
			if($this->form_validation->run() === FALSE){
				$this->load->view('register/header');
				$this->load->view('register/create');
				$this->load->view('register/footer');
			} else {
				$this->register_model->set_register();
				$this->load->view('register/success');
			}
		}
	}