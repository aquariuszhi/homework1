import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom'

class PostChildComment extends React.Component{
	constructor(props){
		super(props)
		this.state={
			comment_child: '',
			collapse: '新增回應▲'
		}
	}
	//抓取該主留言和相關子留言
	componentDidMount(){
		this.props.checkLogin()
		const id_main = this.props.match.params.id
		this.props.getOnePost(id_main)
	}
	//若刪除成功就導回首頁，若成功送出子留言就重新渲染並將收納按鈕初始化
	componentDidUpdate(prevProps){
		if (!prevProps.deleteMessage && this.props.deleteMessage === 'success'){
			this.props.history.push('/')
		} else if (!prevProps.comment_child && this.props.comment_child === 'success'){
			const {onePost} = this.props
			const id_main = onePost.id_main
			this.props.getOnePost(id_main)
			this.setState({
				comment_child: '',
				collapse: '新增回應▲'
			})
		}
	}
	//將子留言傳至資料庫
	handleChildComment = (e) => {
		e.preventDefault();
		const {comment_child} = this.state
		const nickname = this.props.loginData
		const {onePost} = this.props
		const id_main = onePost.id_main
		this.props.post_child(id_main, nickname, comment_child)
	}
	//收納按鈕
	handleCollapse = (e) => {
		e.preventDefault();
		const {collapse} = this.state
		if(collapse === '新增回應▲'){
			this.setState({
				collapse: '新增回應▼'
			})
		} else {
			this.setState({
				collapse: '新增回應▲'
			})
		}
		
	}
	//刪除功能
	handleDelete = (e) => {
		e.preventDefault();
		if(confirm('確認是否刪除此留言')){
			const id = e.target.attributes[0]
			const id_main = id.value
			this.props.deletePost(id_main)
		} else {
			e.preventDefault();
		}
		
	}
	
	onInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render(){
		const {comment_child, collapse} = this.state
		const {loginData, onePost, postChild, currentPage} = this.props
		return (
			<div>
				<div className = 'titleDiv'>
					<Link className="write_comment btn btn-primary btn_back" role="button" to={`/home/${currentPage}`} >返回</Link>
				</div>
				<div className = "main">
					<div className = 'information name_time main_coment_done modifydiv'>
						<p>{onePost.nickname}</p>
						{loginData === onePost.nickname ? 
							<p><Link to={`/modify/${onePost.id_main}`} className = 'modify'>編輯</Link></p> : ''
						}
						{loginData === onePost.nickname ? 
							<p><Link to='/delete' id_mian = {onePost.id_main} onClick = {this.handleDelete} className = 'delete'>刪除</Link></p> : ''
						}
						<p>{onePost.createdAt}</p>
					</div>
					<div className = 'information main_coment_done'>
						<span className = 'comment_area'>
							<p>{onePost.comment}<br/></p>
						</span>
					</div>
					<div className = "child_comment" >	
					{postChild && postChild.map(child => {
						return(
							<div className = 'child_comment_done' key = {child.id_child}>
								<div className = 'information name_time'>
									<p>{child.nickname_child}</p>
									<p>{child.created_at}</p>
								</div>
								<div className = 'information'>
									<span className = 'comment_area'>
										<p>{child.comment_child}</p>
									</span>
								</div>
							</div>
						)
					})}	
						{
							loginData &&
							<form className = 'input_child_comment' id_main = {onePost.id_main}>
								<span className = "message_collapse" onClick = {this.handleCollapse}>{collapse}</span>
								{collapse === '新增回應▼' ? 
									<section>
										<div>
											<p>{loginData}</p>
										</div>
										<div>
											<textarea name = "comment_child" value = {comment_child} wrap = "physical" placeholder = "在此輸入您的回應" className = "writecomment" onChange = {this.onInputChange}></textarea>
										</div>
										<input type = "submit" name = "submit" value = "送出" className = "submit" onClick = {this.handleChildComment} />
									</section> : ''
								}	
							</form>
						}
					</div>
				</div>
			</div>
		)
	}
}

export default hot(PostChildComment);