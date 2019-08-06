import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';

class Register extends React.Component{
	constructor(props){
		super(props)
		this.state={
			account: '',
			nickname: '',
			password: ''
		}
	}
	
	handleRegister = (e) => {
		e.preventDefault();
		e.persist();
		const accountLen = e.target.form[0]
		const passwordLen = e.target.form[1]
		const nicknameLen = e.target.form[2]
		if(accountLen.value === '' || passwordLen.value === '' || nicknameLen.value === ''){
			alert ('請輸入帳號/密碼/暱稱')
		} else {
			const {account, nickname, password} = this.state
			this.props.register(account, nickname, password)
		}
	}
	
	onInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	
	componentDidUpdate(preProps){
		if(!preProps.userData && this.props.userData){
			alert ('註冊成功')
			location.href = "http://localhost:8080/#/login";
		}
	}

	render(){
		const {account, nickname, password} = this.state
		const {registerMessage} = this.props
		return (
			<form className = 'registered create'>
				<h1>註冊</h1>
					<input type = 'text' name = 'account' value = {account} placeholder = '請輸入帳號(英數字10字內)' className = 'insert' onChange = {this.onInputChange}/>
					<input type = 'password' name = 'password' value = {password} placeholder = '請輸入密碼(英數字10字內)' className = 'insert' onChange = {this.onInputChange}/>
					<input type = 'text' name = 'nickname' value = {nickname} placeholder = '請輸入暱稱(中英數字10字內)' className = 'insert' onChange = {this.onInputChange}/>
					{registerMessage && <p className = 'alert'>{registerMessage}</p>}
					<input type = 'submit' name = 'submit' value = '送出' className = 'submit' onClick = {this.handleRegister}/>
			</form>
		)
	}
}

export default hot(Register);