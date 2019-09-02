<?php
	header('Access-Control-Allow-Origin: http://localhost:8080');
	header("Access-Control-Allow-Methods: GET, POST, OPTION, PUT, DELETE");
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, X-XSRF-TOKEN');
	header('Access-Control-Allow-Credentials: true');
	
	if ( "OPTIONS" === $_SERVER['REQUEST_METHOD'] ) {
		die();
	}

	class Writing extends CI_Controller{
		
		public function __construct(){
			parent::__construct();
			$this->load->model('writing_model');
			$this->load->library('session');
			$this->load->helper('cookie');
			
			$this->load->library('pagination'); //建立分頁
		}
		
		//取得該頁文章資料
		public function writing(){
			
			parse_str($_SERVER['QUERY_STRING'], $_GET);
			
			//顯示主頁面
			$all_items = $this->writing_model->get_count();
			$pages = ceil($all_items/10);
			$page = ($this->uri->segment(3)) ? $this->uri->segment(3) : 1; //取得index.php後面第3個區段的uri
			$offset = ($page-1)*10;
			
			$config = array();
			$config['per_page'] = 10; //每頁顯示筆數
	
			$accountSession = $this->session->userdata('account');

			$data = $this->writing_model->get_writing($config['per_page'], $offset);
			
			//將資料過濾反斜線後再送出
			$dataLen = count($data);
			for($i = 0 ; $i < $dataLen ; $i++){
				if($data[$i]['image'] !== null){
					$data[$i]['image'] = base64_encode(stripslashes(base64_decode($data[$i]['image'])));
				};
			};
			
			//將文章和登入者按讚的文章ID進行合併，若無登入則不取按讚清單資料
			if($accountSession !== null){
				$data_like = $this->writing_model->get_loginUser_like($accountSession, $config['per_page'], $offset);
				$dataLikeLen = count($data_like);
				for($j = 0 ; $j < $dataLikeLen ; $j++){
					for($k = 0 ; $k < $dataLen; $k++){
						if($data_like[$j]['id_like'] === $data[$k]['id']){
							$array_insert = $data_like[$j]['id_like'];
							$input = $data[$k];
							$data[$k] = (array)$data[$k];
							$data[$k]['id_like'] = $array_insert;
						}
					}
				}
				
				$arr = array('result' => 'success', 'writing' => $data, 'pages' => $pages, 'page' => $page);
				$this->output->set_content_type('application/json')->set_output(json_encode($arr)); //輸出json格式資料
			} else {
				$arr = array('result' => 'success', 'writing' => $data, 'pages' => $pages, 'page' => $page);
				$this->output->set_content_type('application/json')->set_output(json_encode($arr)); //輸出json格式資料
			}
		}
		
		//新增文章
		public function create(){
			$request_body = file_get_contents('php://input');
			$data = json_decode($request_body);
			$account = $data->account;
			$writing = $data->writing;
			$category = $data->category;
			$release = $data->release;
			$comment_num = 0;  //子留言預設數量為0
			
			$cookie = get_cookie("XSRF-TOKEN", false);
			$header = $this->input->get_request_header('X-XSRF-TOKEN', TRUE);
			
			$accountSession = $this->session->userdata('account');
			
			//確認csrf token，帳號和session是否一致，以及內容是否皆有值
			if($cookie === $header && $account === $accountSession && $writing !== '' && $category !== '' && $release !== ''){
				//送出主留言
				$result = $this->writing_model->set_main_writing($account, $writing, $category, $release, $comment_num);
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
		
		//新增留言
		public function comment(){
			$request_body = file_get_contents('php://input');
			$data = json_decode($request_body);
			$id = $data->id;
			$account = $data->account;
			$comment = $data->comment;
			
			$accountSession = $this->session->userdata('account');

			$cookie = get_cookie("XSRF-TOKEN", false);
			$header = $this->input->get_request_header('X-XSRF-TOKEN', TRUE);
			
			//確認csrf token，帳號和session是否一致，以及內容是否皆有值
			if($cookie === $header && $account === $accountSession && $comment !== ''){
				//送出留言
				$result = $this->writing_model->set_comment($id, $account, $comment);
				
				//在maincomment table更新子留言數目
				$comment_old = $this->writing_model->get_comment_num($id);
				$comment_old_num = $comment_old[0] ;
				$comment_num = $comment_old_num['comment_num']+1;

				$result_num = $this->writing_model->set_comment_num($id, $comment_num);
				
				if($result && $result_num){
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
		
		//取得指定文章資料以供編輯
		public function get_assign_writing(){
			
			$request_body = file_get_contents('php://input');
			$data = json_decode($request_body);
			$id = $data->id;
			
			$cookie = get_cookie("XSRF-TOKEN", false);
			$header = $this->input->get_request_header('X-XSRF-TOKEN', TRUE);
			
			$accountSession = $this->session->userdata('account');
			
			if($cookie === $header && $accountSession){  //驗證csrf token和帳號
				//取得特定主留言
				$result = $this->writing_model->get_one_writing($id);
				$arr = array('result' => 'success', 'writing' => $result);
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			} else {
				$arr = array('result' => 'fail');
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
			
		}
		
		//取得評論
		public function get_comment(){
			
			$request_body = file_get_contents('php://input');
			$data = json_decode($request_body);
			$id = $data->id;
			
			//取得特定子留言
			$comment = $this->writing_model->get_assign_comment($id);
			
			//將資料過濾反斜線後再送出
			$dataLen = count($comment);
			for($i = 0 ; $i < $dataLen ; $i++){
				if($comment[$i]['image'] !== null){
					$comment[$i]['image'] = base64_encode(stripslashes(base64_decode($comment[$i]['image'])));
				};
			};
			
			$arr = array('result' => 'success', 'comment' => $comment);
			$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			
		}
		
		//編輯文章
		public function modify(){
			$request_body = file_get_contents('php://input');
			$data = json_decode($request_body);
			$modifyId = $data->modifyId;
			$account = $data->account;
			$modifyWriting = $data->modifyWriting;				
			$modifyCategory = $data->modifyCategory;				
			$modifyRelease = $data->modifyRelease;		
		
			//確認CSRF Token（防止CSRF攻擊）
			$cookie = get_cookie("XSRF-TOKEN", false);
			$header = $this->input->get_request_header('X-XSRF-TOKEN', TRUE);
			
			$accountSession = $this->session->userdata('account');
			
			if($cookie === $header && $accountSession === $account){
				$result = $this->writing_model->set_modify_writing($modifyId, $modifyWriting, $modifyCategory, $modifyRelease);
				$arr = array('result' => 'success');
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			} else {
				$arr = array('result' => '錯誤，請重新登入！');	
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
		}
		
		//刪除文章
		public function delete_writing(){
			$request_body = file_get_contents('php://input');
			$data = json_decode($request_body);
			$id = $data->id;
			$account = $data->account;			
			
			$cookie = get_cookie("XSRF-TOKEN", false);
			$header = $this->input->get_request_header('X-XSRF-TOKEN', TRUE);
			
			$accountSession = $this->session->userdata('account');
			
			if($cookie === $header && $accountSession === $account){  //驗證csrf token和帳號
				//刪除主留言
				$result = $this->writing_model->set_del_writing($id);
				$arr = array('result' => 'success');
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			} else {
				$arr = array('result' => 'fail');
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
		}
		
		//按喜歡
		public function like(){
			$request_body = file_get_contents('php://input');
			$data = json_decode($request_body);
			$id = $data->id;
			$account = $data->account;			
			
			$accountSession = $this->session->userdata('account');
			
			if($accountSession === $account){  //驗證帳號
				
				//在maincomment table更新Like數目
				$like_old = $this->writing_model->get_like_num($id);
				$like_old_num = $like_old[0] ;
				$like_num = $like_old_num['like_num']+1;
				$result_num = $this->writing_model->set_like_num($id, $like_num);
				
				//送出Like
				$result_like = $this->writing_model->set_like_list($id, $account);
			
				$arr = array('result' => 'success');
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			} else {
				$arr = array('result' => 'fail');
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
		}
		
		//取得個人文章
		public function person(){
			$accountSession = $this->session->userdata('account');
			
			$request_body = file_get_contents('php://input');
			$data = json_decode($request_body);
			$account = $data->account;
			
			parse_str($_SERVER['QUERY_STRING'], $_GET);
			
			$config = array();
			$config['per_page'] = 10; //每頁顯示筆數

			//若帳號和登入者一致，則取自身所有文章；若帳號和登入者不一致，則根據是否follow取得文章
			if($account === $accountSession){
				//根據條件回傳筆數以產生頁碼
				$all_items = $this->writing_model->get_mywriting_count($account);
				$pages = ceil($all_items/10);
				$page = ($this->uri->segment(3)) ? $this->uri->segment(3) : 1; //取得index.php後面第3個區段的uri
				$offset = ($page-1)*10;
				$writing = $this->writing_model->get_my_writing($account, $config['per_page'], $offset);
			
				//將資料過濾反斜線後再送出
				$writingLen = count($writing);
				for($i = 0 ; $i < $writingLen ; $i++){
					if($writing[$i]['image'] !== null){
						$writing[$i]['image'] = base64_encode(stripslashes(base64_decode($writing[$i]['image'])));
					};
				};
				
				//將文章和按讚資料合併
				$data_like = $this->writing_model->get_loginUser_like($account, $config['per_page'], $offset);
				$dataLikeLen = count($data_like);
				for($j = 0 ; $j < $dataLikeLen ; $j++){
					for($k = 0 ; $k < $writingLen; $k++){
						if($data_like[$j]['id_like'] === $writing[$k]['id']){
							$array_insert = $data_like[$j]['id_like'];
							$input = $writing[$k];
							$writing[$k] = (array)$writing[$k];
							$writing[$k]['id_like'] = $array_insert;
						}
					}
				}
				
				$arr = array('result' => 'success', 'writing' => $writing, 'pages' => $pages, 'page' => $page);
				$this->output->set_content_type('application/json')->set_output(json_encode($arr)); //輸出json格式資料
			} else if($accountSession && $accountSession !== $account){
				//確認follow關係
				$check_follow = $this->writing_model->checkFollow($account, $accountSession);
				
				if($check_follow){
					//根據條件回傳筆數以產生頁碼
					$all_items = $this->writing_model->get_otherwriting_count($account);
					$pages = ceil($all_items/10);
					$page = ($this->uri->segment(3)) ? $this->uri->segment(3) : 1; //取得index.php後面第3個區段的uri
					$offset = ($page-1)*10;
					$writing = $this->writing_model->get_other_writing($account, $config['per_page'], $offset);
				} else {
					//根據條件回傳筆數以產生頁碼
					$all_items = $this->writing_model->get_otherpublic_count($account);
					$pages = ceil($all_items/10);
					$page = ($this->uri->segment(3)) ? $this->uri->segment(3) : 1; //取得index.php後面第3個區段的uri
					$offset = ($page-1)*10;
					$writing = $this->writing_model->get_otherpublic_writing($account, $config['per_page'], $offset);
				}
			
				//將資料過濾反斜線後再送出
				$writingLen = count($writing);
				for($i = 0 ; $i < $writingLen ; $i++){
					if($writing[$i]['image'] !== null){
						$writing[$i]['image'] = base64_encode(stripslashes(base64_decode($writing[$i]['image'])));
					};
				};
				
				//將文章和按讚資料合併
				$data_like = $this->writing_model->get_loginUser_like($accountSession, $config['per_page'], $offset);
				$dataLikeLen = count($data_like);
				for($j = 0 ; $j < $dataLikeLen ; $j++){
					for($k = 0 ; $k < $writingLen; $k++){
						if($data_like[$j]['id_like'] === $writing[$k]['id']){
							$array_insert = $data_like[$j]['id_like'];
							$input = $writing[$k];
							$writing[$k] = (array)$writing[$k];
							$writing[$k]['id_like'] = $array_insert;
						}
					}
				}
				
				$arr = array('result' => 'success', 'writing' => $writing, 'pages' => $pages, 'page' => $page);
				$this->output->set_content_type('application/json')->set_output(json_encode($arr)); //輸出json格式資料
			} else if(!$accountSession){
				//根據條件回傳筆數以產生頁碼
				$all_items = $this->writing_model->get_otherpublic_count($account);
				$pages = ceil($all_items/10);
				$page = ($this->uri->segment(3)) ? $this->uri->segment(3) : 1; //取得index.php後面第3個區段的uri
				$offset = ($page-1)*10;
				$writing = $this->writing_model->get_otherpublic_writing($account, $config['per_page'], $offset);
			
				//將資料過濾反斜線後再送出
				$writingLen = count($writing);
				for($i = 0 ; $i < $writingLen ; $i++){
					if($writing[$i]['image'] !== null){
						$writing[$i]['image'] = base64_encode(stripslashes(base64_decode($writing[$i]['image'])));
					};
				};
				
				$arr = array('result' => 'success', 'writing' => $writing, 'pages' => $pages, 'page' => $page);
				$this->output->set_content_type('application/json')->set_output(json_encode($arr)); //輸出json格式資料
			} else {
				$arr = array('result' => 'error', 'pages' => $pages, 'page' => $page);
				$this->output->set_content_type('application/json')->set_output(json_encode($arr)); //輸出json格式資料
			}
		}
			
		//確認登入者是否follow
		public function check_follow(){
			$request_body = file_get_contents('php://input');
			$data = json_decode($request_body);
			$account = $data->account;			
			
			$accountSession = $this->session->userdata('account');
			
			if($accountSession){  //驗證帳號
				
				//確認follow
				$result = $this->writing_model->checkFollow($account, $accountSession);
			
				$arr = array('result' => $result);
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			} else {
				$arr = array('result' => false);
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
		}
		
		//確認登入者是否follow
		public function set_follow(){
			$request_body = file_get_contents('php://input');
			$data = json_decode($request_body);
			$account = $data->account;			
			
			$accountSession = $this->session->userdata('account');
			
			if($accountSession){  //驗證帳號
				
				//確認follow
				$result = $this->writing_model->checkFollow($account, $accountSession);
				
				//若有follow則刪除follow，反之新增follow
				if($result){
					$result_del = $this->writing_model->cancel_follow($account, $accountSession);
					$arr = array('result' => $result_del);
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				} else {
					$result_add = $this->writing_model->add_follow($account, $accountSession);
					$arr = array('result' => $result_add);
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				}
			} else {
				$arr = array('result' => false);
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
		}
		
		//取得follow對象清單
		public function get_follow_user(){
			
			$accountSession = $this->session->userdata('account');
			
			if($accountSession){  //驗證session
			
				//取得follow名單
				$result = $this->writing_model->getFollowUser($accountSession);
				
				if($result){
					//將資料過濾反斜線後再送出
					$resultLen = count($result);
					for($i = 0 ; $i < $resultLen ; $i++){
						if($result[$i]['image'] !== null){
							$result[$i]['image'] = base64_encode(stripslashes(base64_decode($result[$i]['image'])));
						};
					};
					
					$arr = array('result' => 'success', 'user' => $result);	
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				} else {
					$arr = array('result' => 'No result', 'user' => '');	
					$this->output->set_content_type('application/json')->set_output(json_encode($arr));
				}
			} else {
				$arr = array('result' => 'No login');
				$this->output->set_content_type('application/json')->set_output(json_encode($arr));
			}
		}
		
		//取得該分類該頁文章資料
		public function get_category(){
			$request_body = file_get_contents('php://input');
			$data = json_decode($request_body);
			$category = $data->category;
			
			parse_str($_SERVER['QUERY_STRING'], $_GET);
			
			//顯示主頁面
			$all_items = $this->writing_model->get_category_count($category);
			$pages = ceil($all_items/10);
			$page = ($this->uri->segment(3)) ? $this->uri->segment(3) : 1; //取得index.php後面第3個區段的uri
			$offset = ($page-1)*10;
			
			$config = array();
			$config['per_page'] = 10; //每頁顯示筆數
	
			$accountSession = $this->session->userdata('account');

			$data = $this->writing_model->get_category_writing($category, $config['per_page'], $offset);
			
			//將資料過濾反斜線後再送出
			$dataLen = count($data);
			for($i = 0 ; $i < $dataLen ; $i++){
				if($data[$i]['image'] !== null){
					$data[$i]['image'] = base64_encode(stripslashes(base64_decode($data[$i]['image'])));
				};
			};
			
			//將文章和登入者按讚的文章ID進行合併，若無登入則不取按讚清單資料
			if($accountSession !== null){
				$data_like = $this->writing_model->get_loginUser_like($accountSession, $config['per_page'], $offset);
				$dataLikeLen = count($data_like);
				for($j = 0 ; $j < $dataLikeLen ; $j++){
					for($k = 0 ; $k < $dataLen; $k++){
						if($data_like[$j]['id_like'] === $data[$k]['id']){
							$array_insert = $data_like[$j]['id_like'];
							$input = $data[$k];
							$data[$k] = (array)$data[$k];
							$data[$k]['id_like'] = $array_insert;
						}
					}
				}
				
				$arr = array('result' => 'success', 'writing' => $data, 'pages' => $pages, 'page' => $page);
				$this->output->set_content_type('application/json')->set_output(json_encode($arr)); //輸出json格式資料
			} else {
				$arr = array('result' => 'success', 'writing' => $data, 'pages' => $pages, 'page' => $page);
				$this->output->set_content_type('application/json')->set_output(json_encode($arr)); //輸出json格式資料
			}
		}
		
		//取得該分類該頁文章資料
		public function get_follow_writing(){
			$accountSession = $this->session->userdata('account');
			
			if($accountSession){

				parse_str($_SERVER['QUERY_STRING'], $_GET);

				//顯示主頁面
				$all_items = $this->writing_model->get_follow_writing_count($accountSession);
				$pages = ceil($all_items/10);
				$page = ($this->uri->segment(3)) ? $this->uri->segment(3) : 1; //取得index.php後面第3個區段的uri
				$offset = ($page-1)*10;
				
				$config = array();
				$config['per_page'] = 10; //每頁顯示筆數
		
				$accountSession = $this->session->userdata('account');

				$data = $this->writing_model->get_follow_writing($accountSession, $config['per_page'], $offset);
				
				//將資料過濾反斜線後再送出
				$dataLen = count($data);
				for($i = 0 ; $i < $dataLen ; $i++){
					if($data[$i]['image'] !== null){
						$data[$i]['image'] = base64_encode(stripslashes(base64_decode($data[$i]['image'])));
					};
				};
			
				//將文章和登入者按讚的文章ID進行合併
				$data_like = $this->writing_model->get_loginUser_like($accountSession, $config['per_page'], $offset);
				$dataLikeLen = count($data_like);
				for($j = 0 ; $j < $dataLikeLen ; $j++){
					for($k = 0 ; $k < $dataLen; $k++){
						if($data_like[$j]['id_like'] === $data[$k]['id']){
							$array_insert = $data_like[$j]['id_like'];
							$input = $data[$k];
							$data[$k] = (array)$data[$k];
							$data[$k]['id_like'] = $array_insert;
						}
					}
				}
				
				$arr = array('result' => 'success', 'writing' => $data, 'pages' => $pages, 'page' => $page);
				$this->output->set_content_type('application/json')->set_output(json_encode($arr)); //輸出json格式資料
			} else {
				$arr = array('result' => 'No login', 'writing' => '', 'pages' => '0', 'page' => '0');
				$this->output->set_content_type('application/json')->set_output(json_encode($arr)); //輸出json格式資料
			}
		}
	}