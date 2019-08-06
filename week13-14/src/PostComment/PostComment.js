import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class PostComment extends React.Component{
	constructor(props){
		super(props)
		this.state={
			comment: ''
		}
	}
	
	componentDidMount(){
		this.props.checkLogin()
	}
	
	componentDidUpdate(prevProps){
		if(this.props.loginData == null){
			alert ('請重新登入')
			location.href = "http://localhost:8080/#/login";
		} else if(!prevProps.commentMessage && this.props.commentMessage === 'success'){
			alert ('留言成功')
			this.props.history.push('/home/1')
		}
	}
	
	handleComment = (e) => {
		e.preventDefault();
		const {comment} = this.state
		const nickname = this.props.loginData
		this.props.post_main(nickname, comment)
	}
	
	onInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	
	
	render(){
		const {comment} = this.state
		const {loginData} = this.props
		return (
			<div>
				<h2 className = 'commentH2'>新增留言</h2>
				<form className = 'input_main_comment'>	
					<div>
						<p>{loginData}</p>
					</div>
					<div className = 'textareaDiv'>
						<textarea name = "comment" value = {comment} wrap = "physical" placeholder = "在此輸入您的評論" className = "writecomment" onChange = {this.onInputChange} ></textarea>
					</div>
					<input type = "submit" name = "submit" value = "送出" className = "submit comment_btn" onClick = {this.handleComment} />
				</form>
			</div>
		)
	}
}

export default hot(PostComment);