import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom'

class Mypage extends React.Component{
	constructor(props){
		super(props)
		this.state={
			writing: '',
			formAlert: '',
			category: '',
			release: '',
			modifyId: '',
			modifyWriting: '',
			modifyCategory: '',
			modifyRelease: '',
			comment: '',
			commentDiv: '',
			middleState: ''
		}
	}
	
	componentDidMount(){
		const paramObj = this.props.match.params
		const account = paramObj.account
		//根據頁碼渲染資料
		const page = paramObj.page
		this.props.getPersonWriting(page, account)
		this.props.checkFollow(account)
		
	}
	
	componentDidUpdate(prevProps){
		const {nowLoading} = this.props
		const paramObj = this.props.match.params
		const account = paramObj.account
		if(!prevProps.writingMessage && this.props.writingMessage){  //若文章提交成功就將輸入框和提醒清空
			this.setState({
				writing: '',
				category: '',
				release: '',
				formAlert: ''
			})
			const page = 1
			this.props.getPersonWriting(page, account)
		} else if (!prevProps.delWritingMessage && this.props.delWritingMessage === 'success'){  //刪除成功後重新取得第一頁資料
			const page = 1
			this.props.getPersonWriting(page, account)
		} else if(!prevProps.getAssignMessage && this.props.getAssignMessage === 'success'){  //取得指定文章後修改狀態以開啟編輯模式
			const {getAssignData} = this.props
			const assignData = getAssignData[0]
			this.setState({
				modifyId: assignData.id,
				modifyWriting: assignData.writing,
				modifyCategory: assignData.category,
				modifyRelease: assignData.release 
			})
		} else if(!prevProps.modifyMesssage && this.props.modifyMesssage === 'success'){  //編輯成功後關閉編輯模式
			this.setState({
				modifyId: '',
				modifyWriting: '',
				modifyCategory: '',
				modifyRelease: '',
				formAlert: ''
			})
			//根據頁碼渲染資料
			const page = paramObj.page
			this.props.getPersonWriting(page, account)
		} else if(!prevProps.commentMessage && this.props.commentMessage === 'success'){  //留言成功後清空輸入欄
			this.setState({
				comment: '',
				formAlert: ''
			})
			const {commentDiv} = this.state
			const id = commentDiv
			this.props.getComment(id)
			//根據頁碼渲染資料
			const page = paramObj.page
			this.props.getPersonWriting(page, account)
		} else if(!prevProps.updateImgMessage && this.props.updateImgMessage){  //照片更新成功就重新渲染文章
			//根據頁碼渲染資料
			const page = paramObj.page
			this.props.getPersonWriting(page, account)
		} else if(!prevProps.likeMessage && this.props.likeMessage){  //Like更新成功就重新渲染文章
			//根據頁碼渲染資料
			const page = paramObj.page
			this.props.getPersonWriting(page, account)
		} else if(!prevProps.loginAccount && this.props.loginAccount){  //登入就重新渲染文章
			//根據頁碼渲染資料
			const page = paramObj.page
			this.props.getPersonWriting(page, account)
			this.props.checkFollow(account)
		} else if(!prevProps.logoutState && this.props.logoutState){  //登出就重新渲染文章
			//根據頁碼渲染資料
			const page = paramObj.page
			this.props.getPersonWriting(page, account)
			this.props.checkFollow(account)
		} else if(!prevProps.setFollowed && this.props.setFollowed){  //setFollow後就重新渲染
			const page = paramObj.page
			this.props.getPersonWriting(page, account)
			this.props.checkFollow(account)
		}
		
		//將過長的文章隱藏
		setTimeout(() => {
			const {writingData} = this.props
			for(let i = 0 ; i < writingData.length ; i++){
				const {modifyId} = this.state
				if(modifyId === ''){
					const writingsText = $('.writingText')[i]
					if(writingsText.scrollHeight > 100){
						const writings = $('.writing')[i]
						writings.setAttribute('class', 'writing hide_Over_Content')
					} else {
						const seeMore = $('.see_more')[i]
						seeMore.style.display = 'none'
					}
				}
			}
		}, 0)
	}

	//送出文章
	handleWritingSubmit = (e) => {
		e.preventDefault()
		const {writing, category, release} = this.state
		const {loginAccount} = this.props
		const account = loginAccount
		if(writing === ''){  //確認是否輸入內容
			this.setState({
				formAlert: 'No writing'
			})
		} else if(category === ''){  //確認是否選擇發文類別
			this.setState({
				formAlert: 'No category'
			})
		} else if(release === ''){  //確認是否選擇發布範圍
			this.setState({
				formAlert: 'No release'
			})
		} else {
			this.props.writingSubmit(account, writing, category, release)
		}
	}
	
	//將隱藏的過長內文顯示出來
	handleSeeMore = (e) => {
		const seeMore = e.target
		const writings = seeMore.parentNode
		writings.setAttribute('class', 'writing')
		seeMore.style.display = 'none'
	}
	
	//顯示編輯功能
	handleModify = (e) => {
		const id_position = e.target.attributes[1]
		const id = id_position.value
		this.props.getAssignWriting(id)
	}
	
	//取消編輯功能
	handleCancelModify = (e) => {
		const id_position = e.target.attributes[1]
		const id = id_position.value
		this.setState({
			modifyId: '',
			modifyWriting: '',
			modifyCategory: '',
			modifyRelease: ''
		})
	}
	
	
	//送出編輯內容
	handleModifySubmit = (e) => {
		e.preventDefault()
		const {modifyId, modifyWriting, modifyCategory, modifyRelease} = this.state
		const {loginAccount} = this.props
		const account = loginAccount
		if(modifyWriting === ''){  //確認是否輸入內容
			this.setState({
				formAlert: 'No new'
			})
		} else {
			this.props.writingUpdate(modifyId, account, modifyWriting, modifyCategory, modifyRelease)
		}
	}
	
	//刪除功能
	handleDelete = (e) => {
		if(confirm('確認是否刪除此留言')){
			const id_position = e.target.attributes[1]
			const id = id_position.value
			const {loginAccount} = this.props
			const account = loginAccount
			this.props.deleteWriting(id, account)
		} else {
			e.preventDefault();
		}
		
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
	
	//Follow或取消Follow
	handleFollow = (e) => {
		const {loginAccount} = this.props
		if(!loginAccount){
			alert('請登入會員')
		} else {
			const paramObj = this.props.match.params
			const account = paramObj.account
			this.props.setFollow(account)
		}
	}
	
	//轉址並更新個人頁面
	handleMypage = (e) => {
		const accountAttr = e.target.attributes[1]
		const account = accountAttr.value
		const page = 1
		this.props.getPersonWriting(page, account)
	}
	
	//根據頁碼導至該頁面
	handleChangePage = (e) => {
		e.preventDefault()
		const paramObj = this.props.match.params
		const account = paramObj.account
		const page = e.target.innerText
		this.props.history.push('/mypage/' + account + '/' + page)
		this.props.getPersonWriting(page, account)
	}
	//前一頁功能
	handlePrevPage = (e) => {
		e.preventDefault()
		const paramObj = this.props.match.params
		const account = paramObj.account
		const {currentPage} = this.props
		const page = Number(currentPage)-1
		this.props.history.push('/mypage/' + account + '/' + page)
		this.props.getPersonWriting(page, account)
	}
	//後一頁功能
	handleNextPage = (e) => {
		e.preventDefault()
		const paramObj = this.props.match.params
		const account = paramObj.account
		const {currentPage} = this.props
		const page = Number(currentPage)+1
		this.props.history.push('/mypage/' + account + '/' + page)
		this.props.getPersonWriting(page, account)
	}
	//第一頁功能
	handleFirstPage = (e) => {
		e.preventDefault()
		const paramObj = this.props.match.params
		const account = paramObj.account
		const page = 1
		this.props.history.push('/mypage/' + account + '/' + page)
		this.props.getPersonWriting(page, account)
	}
	//最後一頁功能
	handleLastPage = (e) => {
		e.preventDefault()
		const paramObj = this.props.match.params
		const account = paramObj.account
		const {pagination} = this.props
		const page = pagination
		this.props.history.push('/mypage/' + account + '/' + page)
		this.props.getPersonWriting(page, account)
	}
	
	//顯示輸入的文字
	onInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	
	render(){
		const { nowLoading, loginAccount, loginNickname, loginImage, writingData, writingLike, commentData, newComment, newComment_num, isLoading, pagination, currentPage, followed} = this.props
		const { writing, formAlert, category, release, modifyId, modifyWriting, modifyCategory, modifyRelease, comment, commentDiv } = this.state
		const paramObj = this.props.match.params
		const account = paramObj.account
		const currentPageNum = Number(currentPage)
		return (
			<div id = 'mainDiv' style = {{
				marginTop: '20px'
			}}>
				{
					loginAccount === account ? '' :
					<div>
						{
							followed ?
								<button type="button" className="btn btn-danger" onClick = {this.handleFollow} text_account = {account}>♥ Followed</button>
								:
								<button type="button" className="btn btn-primary" onClick = {this.handleFollow} text_account = {account}>♥ Follow</button>
						}
					</div>
				}
				{
					loginAccount !== account ? '' :
					<div className = 'writing_input'>
						<Link to={`/mypage/${loginAccount}/1`} onClick = {this.handleMypage} className = 'writing_user'>
							{
								!loginImage ?
									<img src = "./src/頭像.png" className = "img_placeholder_writing"></img>
									:
									<img src = {`data:image/jpg;base64,${loginImage}`} className = "img_placeholder_writing" ></img>
							}
							<p className = "writing_username">{loginAccount ? loginNickname : '使用者'}</p>
						</Link>
						<form className = 'writing_form'>
							<div>
								<textarea name = 'writing' value = {writing} className = {'writing_insert' + (formAlert === 'No writing' ? ' alert' : '')} maxLength = '500' placeholder = '分享' onChange = {this.onInputChange} />
							</div>
							<div className = 'writing_setup'>
								<select name="category" value = {category} className = {'writing_setup_menu' + (formAlert === 'No category' ? ' alert' : '')} onChange = {this.onInputChange} >
									<option value="選擇類別" hidden >選擇類別</option>
									<option value="工作">工作</option>
									<option value="戀愛">戀愛</option>
									<option value="遊戲">遊戲</option>
									<option value="動漫">動漫</option>
									<option value="旅遊">旅遊</option>
									<option value="美食">美食</option>
									<option value="求助">求助</option>
									<option value="抱怨">抱怨</option>
									<option value="其他">其他</option>
								</select>
								<select name="release" value = {release} className = {'writing_setup_menu' + (formAlert === 'No release' ? ' alert' : '')} onChange = {this.onInputChange} >
									<option value="選擇發布類型" hidden >選擇發布類型</option>
									<option value="公開">公開</option>
									<option value="Follow">Follow</option>
									<option value="Follow/禁止留言">Follow/禁止留言</option>
									<option value="私人">私人</option>
								</select>
								<input type = 'submit' name = 'submit' value = '送出' className = 'submit writing_submit' onClick = {this.handleWritingSubmit}/>
							</div>
						</form>
					</div>
				}
				{nowLoading ? <p>Loading...</p> : ''}
				{ writingData && writingData.map(Data => {
					return (
						<div className = 'writing_output' key = {Data.id} id = {Data.id}>
						{
							Data.account !== loginAccount || modifyId === Data.id ? '' :
								<div className = 'authButton'>
									<span className = "badge badge-primary modifyButton" id_modify = {Data.id} onClick = {this.handleModify}>編輯</span>
									<span className = "badge badge-danger delButton" id_del = {Data.id} onClick = {this.handleDelete}>刪除</span>
								</div>
						}
							<div className = 'writing_div'>
								<div className = 'writing_user'>
									{
										!Data.image ?
											<img src = "./src/頭像.png" className = "img_placeholder_writing"></img>
											:
											<img src = {`data:image/jpg;base64,${Data.image}`} className = "img_placeholder_writing" ></img>
									}
									<p className = "writing_username">{Data.nickname}</p>
								</div>
							{modifyId === Data.id ? <div className = 'form_open'></div> : ''}
							{
								modifyId === Data.id ?
									<form className = 'writing_form modify_form'>
										<div>
											<textarea name = 'modifyWriting' value = {modifyWriting} className = {'writing_insert' + (formAlert === 'No new' ? ' modify_alert' : '')} maxLength = '500' placeholder = '分享' onChange = {this.onInputChange} />
										</div>
										<div className = 'writing_setup'>
											<select name="modifyCategory" value = {modifyCategory} className = 'writing_setup_menu' onChange = {this.onInputChange} >
												<option value="選擇類別" hidden >選擇類別</option>
												<option value="工作">工作</option>
												<option value="戀愛">戀愛</option>
												<option value="遊戲">遊戲</option>
												<option value="動漫">動漫</option>
												<option value="旅遊">旅遊</option>
												<option value="美食">美食</option>
												<option value="求助">求助</option>
												<option value="抱怨">抱怨</option>
												<option value="其他">其他</option>
											</select>
											<select name="modifyRelease" value = {modifyRelease} className = 'writing_setup_menu' onChange = {this.onInputChange} >
												<option value="選擇發布類型" hidden >選擇發布類型</option>
												<option value="公開">公開</option>
												<option value="Follow">Follow</option>
												<option value="Follow/禁止留言">Follow/禁止留言</option>
												<option value="私人">私人</option>
											</select>
											<div>
												<button name = 'cancel' className = 'cancel' onClick = {this.handleCancelModify}>取消</button>
												<input type = 'submit' name = 'submit' value = '送出' className = 'submit writing_submit' onClick = {this.handleModifySubmit}/>
											</div>
										</div>
									</form>
									:
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
																	<Link to={`/mypage/${loginAccount}/1`}><img src = "./src/頭像.png" onClick = {this.handleMypage} text_account = {loginAccount} className = "img_comment"></img></Link>
																	:
																	<Link to={`/mypage/${loginAccount}/1`} onClick = {this.handleMypage}><img src = {`data:image/jpg;base64,${loginImage}`} onClick = {this.handleMypage} text_account = {loginAccount} className = "img_comment" ></img></Link>
															}
															<form>
															{
																loginAccount ? <Link to={`/mypage/${loginAccount}/1`} className="comment_user insert_user" onClick = {this.handleMypage} text_account = {loginAccount}>{loginNickname}</Link> : ''
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
																				<Link to={`/mypage/${child.account}/1`}><img src = "./src/頭像.png" className = "img_comment" onClick = {this.handleMypage} text_account = {child.account}></img></Link>
																				:
																				<Link to={`/mypage/${child.account}/1`}><img src = {`data:image/jpg;base64,${child.image}`} onClick = {this.handleMypage} text_account = {child.account} className = "img_comment" ></img></Link>
																		}
																		<div>
																			<div className = 'name_time'>
																				<Link to={`/mypage/${child.account}/1`} className="comment_user" onClick = {this.handleMypage} text_account = {child.account}>{child.nickname}</Link>
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
							}
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
					<Link to='/' onClick = {this.handleChangePage} className="page-link unclickable page_current">{currentPageNum}</Link>
					{
						currentPageNum < pagination ? <Link to='/' onClick = {this.handleChangePage} className="page-link ">{currentPageNum+1}</Link> : ''
					}
					{
						currentPageNum < pagination-1 ? <Link to='/' onClick = {this.handleChangePage} className="page-link ">{currentPageNum+2}</Link> : ''
					}
					<Link to='/' onClick = {this.handleNextPage} className={"page-link" + (currentPageNum == pagination ? ' unclickable' : '')}>&gt;</Link>
					<Link to='/' onClick = {this.handleLastPage} className={"page-link" + (currentPageNum == pagination ? ' unclickable' : '')} page_num = {pagination}>末頁</Link>
				</div>
				<p className = 'copyRight'>©2019 Zhi. All Right Reserved.</p>
			</div>
		)
	}
}

export default hot(Mypage);