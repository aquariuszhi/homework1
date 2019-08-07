import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class Modify extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			newComment: ''
		}
	}
	//根據該留言id渲染該資料
	componentDidMount(){
		const id_main = this.props.match.params.id
		this.props.getOnePost(id_main)
		const {onePost} = this.props
		this.setState({
			newComment: onePost.comment
		})
	}
	//修改成功即導至該留言頁面
	componentDidUpdate(preProps){
		if(!preProps.commentMessage && this.props.commentMessage === 'success'){
			alert ('修改成功')
			const id_main = this.props.match.params.id
			this.props.history.push('/post/' + id_main)
		}
	}
	//確認欄位有輸入資料後，將新留言傳至資料庫
	handleComment = (e) => {
		e.preventDefault();
		const commentLen = e.target.form[0]
		const {newComment} = this.state
		const comment = newComment
		if(commentLen.textLength === 0){
			alert ('請輸入留言')
		} else {
			const {onePost} = this.props
			let id_main = onePost.id_main
			let nickname = onePost.nickname
			if(this.props.loginData == null){
				alert ('請重新登入')
				location.href = "http://localhost:8080/#/login";
			} else {
				this.props.modifyPost(id_main, nickname, comment)
			}
		}
	}
	
	onInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
		
	render(){
		const {newComment} = this.state
		const {loginData, onePost} = this.props
		return (
			<div>
				<h2 className = 'commentH2'>修改留言</h2>
				<form className = 'input_main_comment'>	
					<div>
						<p>{loginData}</p>
					</div>
					<div className = 'textareaDiv'>
						<textarea name = "newComment" value = {newComment} wrap = "physical" placeholder = {onePost.comment} className = "writecomment" onChange = {this.onInputChange} ></textarea>
					</div>
					<input type = "submit" name = "submit" value = "送出" className = "submit comment_btn" onClick = {this.handleComment} />
				</form>
			</div>
		)
	}
}

export default hot(Modify);