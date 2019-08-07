import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom'
//serialize-javascript 套件可取代JSON.stringify來避免XSS攻擊

class Home extends React.Component{
	constructor(props){
		super(props)
	}
	
	componentDidMount(){
		const paramObj = this.props.match.params
		if(Object.getOwnPropertyNames(paramObj).length === 0){
			//設定預設頁碼為1
			const page = 1
			this.props.getPost(page)
		} else {
			//根據頁碼渲染資料
			const page = this.props.match.params.page
			this.props.getPost(page)
		}
	}
	//根據頁碼導致該頁面
	handleChangePage = (e) => {
		e.preventDefault();
		const page = e.target.innerText
		this.props.history.push('/home/' + page)
		this.props.getPost(page)
	}
	//前一頁功能
	handlePrevPage = (e) => {
		e.preventDefault();
		const {currentPage} = this.props
		const page = Number(currentPage)-1
		this.props.history.push('/home/' + page)
		this.props.getPost(page)
	}
	//後一頁功能
	handleNextPage = (e) => {
		e.preventDefault();
		const {currentPage} = this.props
		const page = Number(currentPage)+1
		this.props.history.push('/home/' + page)
		this.props.getPost(page)
	}
	//第一頁功能
	handleFirstPage = (e) => {
		e.preventDefault();
		const page = 1
		this.props.history.push('/home/' + page)
		this.props.getPost(page)
	}
	//最後一頁功能
	handleLastPage = (e) => {
		e.preventDefault();
		const {pagination} = this.props
		const page = pagination
		this.props.history.push('/home/' + page)
		this.props.getPost(page)
	}
	//進入該留言
	handleEnterComment = (e) => {
		e.preventDefault();
		e.persist()
		const id_main = e._targetInst.memoizedProps.id_main
		this.props.history.push('/post/' + id_main)
	}
	
	render(){
		const {posts, pagination, currentPage, loginData} = this.props
		const currentPageNum = Number(currentPage)
		return (
			<div id = 'mainDiv' style = {{
				marginTop: '20px'
			}}>
				<div className = 'titleDiv'>
					<h1>留言板</h1>	
					{loginData && <Link className="write_comment btn btn-primary" role="button" to='/post_comment'>新增留言</Link> }
				</div>
					{posts.map(post => {
						return (
							<div className = "main" key = {post.id_main} id_main = {post.id_main} onClick = {this.handleEnterComment}>
								<div className = 'information name_time main_coment_done modifydiv' id_main = {post.id_main}>
									<p id_main = {post.id_main}>{post.nickname}</p>
									<p id_main = {post.id_main}>{post.createdAt}</p>
								</div>
								<div className = 'information main_coment_done' id_main = {post.id_main}>
									<span id_main = {post.id_main} className = 'comment_area'>
										<p id_main = {post.id_main}>{post.comment}<br/></p>
									</span>
										<p id_main = {post.id_main} className = 'child_num'>{post.child_num}則回應<br/></p>
								</div>
							</div>
						)
					})}
					<div className = 'pagination' aria-label="...">
						<Link to='/1' onClick = {this.handleFirstPage} className={"page-link" + (currentPageNum == 1 ? ' unclickable' : '')} page_num = '1'>首頁</Link>
						<Link to='/pagefront' onClick = {this.handlePrevPage} className={"page-link" + (currentPageNum == 1 ? ' unclickable' : '')}>&lt;</Link>
						{ //根據當前頁讓頁碼鈕產生不同表現
							currentPageNum < 3 ? '' : <Link to='/' onClick = {this.handleChangePage} className="page-link ">{currentPageNum-2}</Link>
						}
						{
							currentPageNum < 2 ? '' : <Link to='/' onClick = {this.handleChangePage} className="page-link ">{currentPageNum-1}</Link>
						}
						<Link to='/' onClick = {this.handleChangePage} className="page-link unclickable">{currentPageNum}</Link>
						{
							currentPageNum < pagination ? <Link to='/' onClick = {this.handleChangePage} className="page-link ">{currentPageNum+1}</Link> : ''
						}
						{
							currentPageNum < pagination-1 ? <Link to='/' onClick = {this.handleChangePage} className="page-link ">{currentPageNum+2}</Link> : ''
						}
						<Link to='/' onClick = {this.handleNextPage} className={"page-link" + (currentPageNum == pagination ? ' unclickable' : '')}>&gt;</Link>
						<Link to='/' onClick = {this.handleLastPage} className={"page-link" + (currentPageNum == pagination ? ' unclickable' : '')} page_num = {pagination}>末頁</Link>
					</div>
			</div>
		)
	}
}

export default hot(Home);