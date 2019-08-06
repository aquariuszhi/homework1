import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';

class Login extends React.Component {
	constructor(props){
		super(props)
		this.state={
			account: '',
			password: ''
		}
	}
	
	handleLogin = (e) => {
		e.preventDefault();
		const {account, password} = this.state
		this.props.login(account, password)
	}
	
	onInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	
	componentDidUpdate(preProps){
		if(!preProps.loginData && this.props.loginData){
			this.props.history.push('/');
		}
	}

	render(){
		const {account, password} = this.state
		const {userLoginError, loginData} = this.props
		return(
			<div className = 'loginDiv'>
				<form className = 'registered'>
					<h1>登入</h1>
						<input type = 'text' name = 'account' value = {account} placeholder = '請輸入帳號' className = 'insert' onChange = {this.onInputChange}/>
						<input type = 'password' name = 'password' value = {password} placeholder = '請輸入密碼' className = 'insert' onChange = {this.onInputChange}/>
						{userLoginError && <p className = 'alert'>{userLoginError}</p>}
						<input type = 'submit' name = 'submit' value = '登入' className = 'submit' onClick = {this.handleLogin}/>
				</form>
			</div>
		)
	}
}

export default hot(Login);