import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom'

class FollowWriting extends React.Component{
	constructor(props){
		super(props)
		const paramObj = this.props.match.params
		const category = paramObj.category
		this.state={
			formAlert: '',
			comment: '',
			commentDiv: '',
			middleState: ''
		}
	}
	
	componentDidMount(){
		const paramObj = this.props.match.params
		if(Object.getOwnPropertyNames(paramObj).length === 0){  //取得param頁碼參數
			//若無參數則預設頁碼為1
			const page = 1
			this.props.getFollowWriting(page)
		} else {
			//根據頁碼渲染資料
			const page = paramObj.page
			this.props.getFollowWriting(page)
		}
		
		
	}
	
	componentDidUpdate(prevProps){
		const {nowLoading} = this.props
		const paramObj = this.props.match.params
		if(!prevProps.getWritingMessage && this.props.getWritingMessage){
			this.setState({
				categoryState: '',
				release: ''
			})
		} else if(!prevProps.commentMessage && this.props.commentMessage === 'success'){  //留言成功後清空輸入欄
			this.setState({
				comment: '',
				formAlert: ''
			})
			const {commentDiv} = this.state
			const id = commentDiv
			this.props.getComment(id)
			if(Object.getOwnPropertyNames(paramObj).length === 0){  //取得param頁碼參數
				//若無參數則預設頁碼為1
				const page = 1
				this.props.getFollowWriting(page)
			} else {
				//根據頁碼渲染資料
				const page = paramObj.page
				this.props.getFollowWriting(page)
			}
		} else if(!prevProps.likeMessage && this.props.likeMessage){  //Like更新成功就重新渲染文章
			if(Object.getOwnPropertyNames(paramObj).length === 0){  //取得param頁碼參數
				//若無參數則預設頁碼為1
				const page = 1
				this.props.getFollowWriting(page)
			} else {
				//根據頁碼渲染資料
				const page = paramObj.page
				this.props.getFollowWriting(page)
			}
		} else if(!prevProps.loginAccount && this.props.loginAccount){  //登入就重新渲染文章
			if(Object.getOwnPropertyNames(paramObj).length === 0){  //取得param頁碼參數
				//若無參數則預設頁碼為1
				const page = 1
				this.props.getFollowWriting(page)
			} else {
				//根據頁碼渲染資料
				const page = paramObj.page
				this.props.getFollowWriting(page)
			}
		} else if(!prevProps.logoutState && this.props.logoutState){  //登出就重新渲染文章
			if(Object.getOwnPropertyNames(paramObj).length === 0){  //取得param頁碼參數
				//若無參數則預設頁碼為1
				const page = 1
				this.props.getFollowWriting(page)
			} else {
				//根據頁碼渲染資料
				const page = paramObj.page
				this.props.getFollowWriting(page)
			}
		}
		
		//將過長的文章隱藏
		setTimeout(() => {
			const {writingData} = this.props
			for(let i = 0 ; i < writingData.length ; i++){
				const writingsText = $('.writingText')[i]
				if(writingsText.scrollHeight > 100){
					const writings = $('.writing')[i]
					writings.setAttribute('class', 'writing hide_Over_Content')
				} else {
					const seeMore = $('.see_more')[i]
					seeMore.style.display = 'none'
				}
			}
		}, 0)
	}
	
	//將隱藏的過長內文顯示出來
	handleSeeMore = (e) => {
		const seeMore = e.target
		const writings = seeMore.parentNode
		writings.setAttribute('class', 'writing')
		seeMore.style.display = 'none'
	}

	//留言收合
	handleShowComment = (e) => {
		const writingAttr = e.target.attributes[1]
		const id = writingAttr.value
		const {commentDiv, middleState} = this.state	
		if(commentDiv === 'hide' || middleState !== id){
			this.setState({
				commentDiv: id,
				middleState: id,
				comment: '',
			})
			this.props.getComment(id)
		} else {
			this.setState({
				commentDiv: 'hide',
				middleState: '',
				comment: ''
			})
		}
	}
	
	//送出留言
	handleCommentSubmit = (e) => {
		e.preventDefault()
		const idForm = e.target.form[1]
		const id = idForm.value
		const numAttr = e.target.attributes[4]
		const {comment} = this.state
		const {loginAccount} = this.props
		const account = loginAccount
		if(comment === ''){  //確認是否輸入內容
			this.setState({
				formAlert: 'No comment'
			})
		}  else {
			this.setState({
				formAlert: ''
			})
			this.props.commentSubmit(id, account, comment)
		}
	}
	
	//喜歡功能
	handleLike = (e) => {
		e.preventDefault()
		const {loginAccount} = this.props
		if(!loginAccount){
			alert('請登入會員')
		} else {
			const id = e.target.attributes.text_like_id.value
			const account = loginAccount
			this.props.like(id, account)
		}
	}
	
	//根據頁碼導至該頁面
	handleChangePage = (e) => {
		const paramObj = this.props.match.params
		const page = e.target.innerText
		this.props.history.push('/followWriting/' + page)
		this.props.getFollowWriting(page)
	}
	//前一頁功能
	handlePrevPage = (e) => {
		e.preventDefault()
		const paramObj = this.props.match.params
		const {currentPage} = this.props
		const page = Number(currentPage)-1
		this.props.history.push('/followWriting/' + page)
		this.props.getFollowWriting(page)
	}
	//後一頁功能
	handleNextPage = (e) => {
		e.preventDefault()
		const paramObj = this.props.match.params
		const {currentPage} = this.props
		const page = Number(currentPage)+1
		this.props.history.push('/followWriting/' + page)
		this.props.getFollowWriting(page)
	}
	//第一頁功能
	handleFirstPage = (e) => {
		e.preventDefault()
		const paramObj = this.props.match.params
		const page = 1
		this.props.history.push('/followWriting/' + page)
		this.props.getFollowWriting(page)
	}
	//最後一頁功能
	handleLastPage = (e) => {
		e.preventDefault()
		const paramObj = this.props.match.params
		const {pagination} = this.props
		const page = pagination
		this.props.history.push('/followWriting/' + page)
		this.props.getFollowWriting(page)
	}
	
	//顯示輸入的文字
	onInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	
	render(){
		const { nowLoading, loginAccount, loginNickname, loginImage, getWritingMessage, writingData, writingLike, commentData, newComment, newComment_num, isLoading, pagination, currentPage} = this.props
		const { formAlert, comment, commentDiv } = this.state
		const currentPageNum = Number(currentPage)
		return (
			<div id = 'mainDiv' style = {{
				marginTop: '20px'
			}}>
				{ getWritingMessage === 'No login' ? <p className = 'search_zero'>---請登入會員---</p> : ''}
				{ writingData && writingData.length === 0 ? <p className = 'search_zero'>---無任何文章---</p> : ''}
				{ nowLoading ? <p>Loading...</p> : ''}
				{ writingData && writingData.map(Data => {
					return (
						<div className = 'writing_output' key = {Data.id} id = {Data.id}>
							<div className = 'writing_div'>
								<Link to={`/mypage/${Data.account}/1`} className = 'writing_user'>
									{
										!Data.image ?
											<img src = "./src/頭像.png" className = "img_placeholder_writing"></img>
											:
											<img src = {`data:image/jpg;base64,${Data.image}`} className = "img_placeholder_writing" ></img>
									}
									<p className = "writing_username">{Data.nickname}</p>
								</Link>
								<div className = 'writing_content'>
									<div className = 'writing'>
										<div className = 'writingText'>
											{Data.writing}
										</div>
										<p className = 'see_more' onClick = {this.handleSeeMore} >...看更多</p>
									</div>
									<span className = 'writing_information'>
										<p className = 'writing_setup_p'>{Data.createdAt}</p>
										<p className = 'writing_setup_p'>{Data.category}</p>
										<p hidden>{Data.release}</p>
										<Link to="#" className = {"writing_setup_p" + (Data.id_like ? ' liked' : '')} text_like_id = {Data.id} onClick = {this.handleLike}>♥ {Data.like_num}</Link>
										<p className = {'child_writing writing_setup_p' + (Data.release === 'Follow/禁止留言' ? '' : ' comment_collapse')} onClick = {this.handleShowComment} text_collapse_id = {Data.id} >{Data.release === 'Follow/禁止留言' ? '禁止' : `${Data.comment_num}則`}留言</p>
									</span>
								{
									commentDiv === Data.id ?
										<div className = 'comment'>
											{	
												!loginAccount || Data.release === 'Follow/禁止留言' ? '' :
													<div className = 'comment_input'>
														{
															!loginImage ?
																<Link to={`/mypage/${loginAccount}/1`}><img src = "./src/頭像.png" className = "img_comment"></img></Link>
																:
																<Link to={`/mypage/${loginAccount}/1`}><img src = {`data:image/jpg;base64,${loginImage}`} className = "img_comment" ></img></Link>
														}
														<form>
														{
															loginAccount ? <Link to={`/mypage/${loginAccount}/1`} className="comment_user insert_user">{loginNickname}</Link> : ''
														}
															<div className = 'comment_form'>
																<textarea name = 'comment' value = {comment} className = {'comment_insert' + (formAlert === 'No comment' ? ' modify_alert' : '')} maxLength = '100' placeholder = '留言' onChange = {this.onInputChange} />
																<input type = 'hidden' value = {Data.id}/>
																<input type = 'submit' name = 'submit' value = '送出' className = 'comment_submit' onClick = {this.handleCommentSubmit}/>
															</div>
														</form>
													</div>
											}
											{
												commentData &&  commentData.map(child => {
													return (
													<div key = {child.id_child}>
														{
															isLoading ? '<p className = "comment_text">Loading...</p>' :
																<div className = 'comment_output'>
																	{
																		!child.image ?
																			<Link to={`/mypage/${child.account}/1`}><img src = "./src/頭像.png" className = "img_comment"></img></Link>
																			:
																			<Link to={`/mypage/${child.account}/1`}><img src = {`data:image/jpg;base64,${child.image}`} className = "img_comment" ></img></Link>
																	}
																	<div>
																		<div className = 'name_time'>
																			<Link to={`/mypage/${child.account}/1`} className="comment_user" >{child.nickname}</Link>
																			<p className = 'comment_user'>{child.createdAt}</p>
																		</div>
																		<div className = 'comment_text'>
																			{child.comment}
																		</div>
																	</div>
																</div>
														}
													</div>
													)
												})
											}
										</div>
										: ''
								}
								</div>
							</div>
						</div>
					)
				})}
				<div className = 'pagination' aria-label="...">
					<Link to='/1' onClick = {this.handleFirstPage} className={"page-link" + (currentPageNum <= 1 ? ' unclickable' : '')} page_num = '1'>首頁</Link>
					<Link to='/pagefront' onClick = {this.handlePrevPage} className={"page-link" + (currentPageNum <= 1 ? ' unclickable' : '')}>&lt;</Link>
					{ //根據當前頁讓頁碼鈕產生不同表現
						currentPageNum < 3 ? '' : <Link to='/' onClick = {this.handleChangePage} className="page-link ">{currentPageNum-2}</Link>
					}
					{
						currentPageNum < 2 ? '' : <Link to='/' onClick = {this.handleChangePage} className="page-link ">{currentPageNum-1}</Link>
					}
					<Link to='/' onClick = {this.handleChangePage} className="page-link unclickable page_current">{currentPageNum}</Link>
					{
						currentPageNum < pagination ? <Link to='/' onClick = {this.handleChangePage} className="page-link ">{currentPageNum+1}</Link> : ''
					}
					{
						currentPageNum < pagination-1 ? <Link to='/' onClick = {this.handleChangePage} className="page-link ">{currentPageNum+2}</Link> : ''
					}
					<Link to='/' onClick = {this.handleNextPage} className={"page-link" + (currentPageNum == pagination || pagination <= 1 ? ' unclickable' : '')}>&gt;</Link>
					<Link to='/' onClick = {this.handleLastPage} className={"page-link" + (currentPageNum == pagination || pagination <= 1 ? ' unclickable' : '')} page_num = {pagination}>末頁</Link>
				</div>
				<p className = 'copyRight'>©2019 Zhi. All Right Reserved.</p>
			</div>
		)
	}
}

export default hot(FollowWriting);