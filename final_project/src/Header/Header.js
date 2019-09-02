import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Link, withRouter } from 'react-router-dom'

class Header extends React.Component{
	constructor(props){
		super(props)
		this.state={
			registerForm: 'hide',
			loginForm: 'hide',
			serchForm: 'hide',
			imageForm: 'hide',
			nicknameChangeForm: 'hide',
			account: '',
			password: '',
			nickname: '',
			formAlert: ''
		}
	}
	
	componentDidMount(){
		this.props.login_check()
	}

	componentDidUpdate(prevProps){
		//若註冊成功就顯示登入視窗，同時將輸入框和提醒清空
		if(!prevProps.registerData && this.props.registerData){
			alert ('註冊成功')
			this.setState({
				registerForm: 'hide',
				loginForm: 'show',
				account: '',
				password: '',
				nickname: '',
				formAlert: ''
			})
		} else if(!prevProps.loginMessage && this.props.loginMessage){  //登入成功就關閉表單
			alert ('登入成功')
			this.setState({
				loginForm: 'hide',
				account: '',
				password: '',
				formAlert: ''
			})
			this.props.login_check()
		} else if(!prevProps.updateNicknameMessage && this.props.updateNicknameMessage){  //暱稱更新成功就關閉表單
			alert ('暱稱更新成功')
			this.setState({
				nicknameChangeForm: 'hide',
				account: '',
				nickname: '',
				formAlert: ''
			})
			this.props.login_check()
		} else if(!prevProps.updateImgMessage && this.props.updateImgMessage){  //照片更新成功就關閉表單
			alert ('照片更新成功')
			this.setState({
				imageForm: 'hide',
				account: '',
				formAlert: ''
			})
			this.props.login_check()
		}
	}
	
	//顯示註冊表單
	handleRegisterForm = (e) => {
		e.preventDefault();
		this.setState({
			registerForm: 'show',
			loginForm: 'hide',
			serchForm: 'hide',
			imageForm: 'hide',
			nicknameChangeForm: 'hide',
			formAlert: '',
			account: '',
			password: '',
			nickname: ''
		})
	}
	
	//送出註冊表單
	handleRegisterSubmit = (e) => {
		e.preventDefault();
		const accountLen = e.target.form[1]
		const passwordLen = e.target.form[2]
		const nicknameLen = e.target.form[3]
		//確認欄位是否皆已輸入
		if(accountLen.value === '' || passwordLen.value === '' || nicknameLen.value === ''){
			this.setState({
				formAlert: '請輸入帳號/密碼/暱稱'
			})
		} else {
			this.setState({
				formAlert: ''
			})
			const {account, password, nickname} = this.state
			this.props.reg(account, password, nickname)
		}
	}
	
	//顯示登入表單
	handleLoginForm = (e) => {
		e.preventDefault();
		this.setState({
			registerForm: 'hide',
			loginForm: 'show',
			serchForm: 'hide',
			imageForm: 'hide',
			nicknameChangeForm: 'hide',
			formAlert: '',
			account: '',
			password: ''
		})
	}
	
	//登入
	handleLoginSubmit = (e) => {
		e.preventDefault();
		const accountLen = e.target.form[1]
		const passwordLen = e.target.form[2]
		//確認欄位是否皆已輸入
		if(accountLen.value === '' || passwordLen.value === ''){
			this.setState({
				formAlert: '請輸入帳號/密碼'
			})
		} else {
			this.setState({
				formAlert: ''
			})
			const {account, password} = this.state
			this.props.login(account, password)
		}
	}

	//登出
	handleLogout = (e) => {
		e.preventDefault();
		this.props.logout()
	}
	
	//顯示更換頭像表單
	handleImageForm = (e) => {
		e.preventDefault();
		this.setState({
			registerForm: 'hide',
			loginForm: 'hide',
			serchForm: 'hide',
			imageForm: 'show',
			nicknameChangeForm: 'hide',
			formAlert: ''
		})
	}
	
	//提交頭像
	handleImageSubmit = (e) => {
		e.preventDefault();
		this.props.login_check()
		e.persist();
		const imageLen = e.target[1]
		const imgFile = imageLen.files[0]
		const imageSize = imgFile.size
		//確認欄位是否皆已輸入，以及副檔名是否為圖片
		const secFileName = /\.(jpg|gif|jpeg|png)$/i
		if(imageLen.value === '' || !secFileName.test(imageLen.value)){
			this.setState({
				formAlert: '請選擇圖片'
			})
		//確認圖片大小是否超過2MB
		} else if(imageSize > 2097152){
			this.setState({
				formAlert: '圖片大小超過限制'
			})
		} else {
			this.setState({
				formAlert: ''
			})
			const {loginAccount} = this.props
			const account = loginAccount
			//將帳號和圖片append到FormData()
			const imageFile = new FormData()
			imageFile.append("account", account)
			imageFile.append("imageFile", imgFile)
			this.props.updateImage(imageFile)
		}
	}
	
	//顯示更換暱稱表單
	handleNicknameForm = (e) => {
		e.preventDefault();
		this.setState({
			registerForm: 'hide',
			loginForm: 'hide',
			serchForm: 'hide',
			imageForm: 'hide',
			nicknameChangeForm: 'show',
			formAlert: ''
		})
	}
	
	//提交新暱稱
	handleNicknameSubmit = (e) => {
		e.preventDefault();
		this.props.login_check()
		const nicknameLen = e.target.form[1]
		//確認欄位是否皆已輸入
		if(nicknameLen.value === ''){
			this.setState({
				formAlert: '請輸入新暱稱'
			})
		} else {
			this.setState({
				formAlert: ''
			})
			const {loginAccount} = this.props
			const account = loginAccount
			const {nickname} = this.state
			this.props.updateNickname(account, nickname)
		}
	}

	//關閉表單
	handleCloseForm = (e) => {
		e.preventDefault();
		this.setState({
			registerForm: 'hide',
			loginForm: 'hide',
			serchForm: 'hide',
			imageForm: 'hide',
			nicknameChangeForm: 'hide',
			formAlert: ''
		})
		this.props.login_check()
	}
	
	//使表單可以輸入內容(限英文數字)
	onInputChangeLimit = (e) => {
		this.setState({
			[e.target.name]: e.target.value.replace(/[\W]/g,'')
		})
	}
	
	//轉址並更新個人頁面
	handleMypage = (e) => {
		const accountAttr = e.target.attributes[1]
		const account = accountAttr.value
		const page = 1
		this.props.getPersonWriting(page, account)
	}
	
	//轉址並更新分類頁面
	handleCategorypage = (e) => {
		const categoryAttr = e.target.attributes[1]
		const category = categoryAttr.value
		const page = 1
		this.props.getCategoryWriting(page, category)
	}
	
	//使表單可以輸入內容
	onInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	
	render(){
		const {registerForm, loginForm, serchForm, imageForm, nicknameChangeForm, account, password, nickname, formAlert} = this.state
		const {location, registerMessage, isLoading, loginMessage, loginAccount, loginNickname, loginImage, updateImg, updateImgMessage, updateNicknameMessage} = this.props
		const {pathname} = location
		return (
			<div>
				<nav className="navbar navbar-light">
					<Link className="navbar-brand" to="/">漂流島</Link>
					<div className="navbar_div">
						<ul className="navbar-nav">
							<div className = "page_item">
								<li className="nav-item dropdown">
									<Link className="nav_category dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">類別</Link>
									<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
										<Link className="dropdown-item" to="/category/工作/1" onClick = {this.handleCategorypage} text_category = '工作'>工作</Link>
										<Link className="dropdown-item" to="/category/戀愛/1" onClick = {this.handleCategorypage} text_category = '戀愛'>戀愛</Link>
										<Link className="dropdown-item" to="/category/遊戲/1" onClick = {this.handleCategorypage} text_category = '遊戲'>遊戲</Link>
										<Link className="dropdown-item" to="/category/動漫/1" onClick = {this.handleCategorypage} text_category = '動漫'>動漫</Link>
										<Link className="dropdown-item" to="/category/旅遊/1" onClick = {this.handleCategorypage} text_category = '旅遊'>旅遊</Link>
										<Link className="dropdown-item" to="/category/美食/1" onClick = {this.handleCategorypage} text_category = '美食'>美食</Link>
										<Link className="dropdown-item" to="/category/求助/1" onClick = {this.handleCategorypage} text_category = '求助'>求助</Link>
										<Link className="dropdown-item" to="/category/抱怨/1" onClick = {this.handleCategorypage} text_category = '抱怨'>抱怨</Link>
										<Link className="dropdown-item" to="/category/其他/1" onClick = {this.handleCategorypage} text_category = '其他'>其他</Link>
									</div>
								</li>
								<li className="nav-item dropdown nav_follow">
									<Link className="nav_category dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Follow</Link>
									<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
										<Link className="dropdown-item" to="/followWriting/1" >文章</Link>
										<Link className="dropdown-item" to="/followUser" >名單</Link>
									</div>
								</li>
								<Link className = "nav_follow" to="/search">搜尋</Link>
							</div>
							<li className="nav-item dropdown">
								{
									!loginImage ?
										<img src = "./src/頭像.png" className = "img_placeholder"></img>
										:
										<Link to={`/mypage/${loginAccount}/1`}>
											<img src = {`data:image/jpg;base64,${loginImage}`} onClick = {this.handleMypage} text_account = {loginAccount} className = "img_placeholder" ></img>
										</Link>
								}
								<Link className="nav_user dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{loginAccount ? loginNickname : '使用者'}</Link>
								{
									!loginAccount ?
									<div className="dropdown-menu dropdown-user" aria-labelledby="navbarDropdownMenuLink">
										<Link className="dropdown-item" to="#" onClick = {this.handleLoginForm}>登入</Link>
										<Link className="dropdown-item" to="#" onClick = {this.handleRegisterForm}>註冊</Link>
									</div>
									:
									<div className="dropdown-menu dropdown-user" aria-labelledby="navbarDropdownMenuLink">
										<Link className="dropdown-item" to="#" onClick = {this.handleImageForm}>更換頭像</Link>
										<Link className="dropdown-item" to="#" onClick = {this.handleNicknameForm}>更換暱稱</Link>
										<Link className="dropdown-item" to="#" onClick = {this.handleLogout}>登出</Link>
									</div>
								}
							</li>
						</ul>
					</div>
				</nav>
				{
					registerForm === 'show' ?
					<div className = 'form_open'>
						<form className = 'form_user'>
							<button className = 'form_close btn btn-secondary' onClick = {this.handleCloseForm}>x</button>
							<h1>註冊</h1>
								<input type = 'text' name = 'account' value = {account} placeholder = ' 請輸入帳號(英數字10字內)' className = 'insert' onChange = {this.onInputChangeLimit} />
								<input type = 'password' name = 'password' value = {password} placeholder = ' 請輸入密碼(英數字10字內)' className = 'insert' onChange = {this.onInputChangeLimit}/>
								<input type = 'text' name = 'nickname' value = {nickname} placeholder = ' 請輸入暱稱(中英數字10字內)' className = 'insert' onChange = {this.onInputChange}/>
								{formAlert && <p className = 'alert'>{formAlert}</p>}
								{isLoading && <p className = 'loading'>Loading...</p>}
								{!formAlert && registerMessage && <p className = 'alert'>{registerMessage}</p>}
								<input type = 'submit' name = 'submit' value = '送出' className = 'submit' onClick = {this.handleRegisterSubmit}/>
						</form>
					</div> : ''
				}
				{
					loginForm === 'show' ?
					<div className = 'form_open'>
						<form className = 'form_user'>
							<button className = 'form_close btn btn-secondary' onClick = {this.handleCloseForm}>x</button>
							<h1>登入</h1>
								<input type = 'text' name = 'account' value = {account} placeholder = ' 請輸入帳號' className = 'insert' onChange = {this.onInputChangeLimit} />
								<input type = 'password' name = 'password' value = {password} placeholder = ' 請輸入密碼' className = 'insert' onChange = {this.onInputChangeLimit}/>
								{formAlert && <p className = 'alert'>{formAlert}</p>}
								{isLoading && <p className = 'loading'>Loading...</p>}
								{!formAlert && loginMessage && <p className = 'alert'>{loginMessage}</p>}
								<input type = 'submit' name = 'submit' value = '送出' className = 'submit' onClick = {this.handleLoginSubmit}/>
						</form>
					</div> : ''
				}
				{
					imageForm === 'show' ?
					<div className = 'form_open'>
						<form className = 'form_user' onSubmit = {this.handleImageSubmit} >
							<button className = 'form_close btn btn-secondary' onClick = {this.handleCloseForm}>x</button>
							<h2>上傳頭像</h2>
								<input type = 'file' className = 'image_input' name = 'image' accept = "image/png, image/jpeg, image/jpg, image/gif" />
								{formAlert && <p className = 'alert'>{formAlert}</p>}
								{isLoading && <p className = 'loading'>Uploading...</p>}
								{!formAlert && updateImgMessage && <p className = 'alert'>{updateImgMessage}</p>}
								<input type = 'submit' name = 'submit' value = '送出' className = 'submit'/>
						</form>
					</div> : ''
				}
				{
					nicknameChangeForm === 'show' ?
					<div className = 'form_open'>
						<form className = 'form_user'>
							<button className = 'form_close btn btn-secondary' onClick = {this.handleCloseForm}>x</button>
							<h2>更改暱稱</h2>
								<input type = 'text' name = 'nickname' value = {nickname} placeholder = ' 請輸入暱稱(中英數字10字內)' className = 'insert' onChange = {this.onInputChange}/>
								{formAlert && <p className = 'alert'>{formAlert}</p>}
								{isLoading && <p className = 'loading'>Loading...</p>}
								{!formAlert && updateNicknameMessage && <p className = 'alert'>{updateNicknameMessage}</p>}
								<input type = 'submit' name = 'submit' value = '送出' onClick = {this.handleNicknameSubmit} className = 'submit'/>
						</form>
					</div> : ''
				}
			</div>
		)
	}
}

export default hot(withRouter(Header));