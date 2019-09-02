import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom'

class Search extends React.Component{
	constructor(props){
		super(props)
		this.state={
			nickname: ''
		}
	}
	
	componentDidMount(){
		const nickname = this.state
		this.props.search(nickname)
	}
	
	componentDidUpdate(prevProps){
		if(!prevProps.searchMessage && this.props.searchMessage){
			this.setState({
				nickname: ''
			})
		}
	}
	
	//送出搜尋
	handleSearchSubmit = (e) => {
		e.preventDefault()
		const {nickname} = this.state
		if(nickname !== ''){  //確認是否輸入內容
			this.props.search(nickname)
		}
	}
	
	//顯示輸入的文字
	onInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	
	render(){
		const { searchLoading, searchMessage, searchResult } = this.props
		const { nickname } = this.state
		return (
			<div>
				<form className = 'searchForm'>
					<input type = 'text' name = 'nickname' value = {nickname} className = 'searchInput' placeholder = '請輸入對象暱稱' onChange = {this.onInputChange}/>
					<input type = 'submit' name = 'submit' value = '送出' className = 'comment_submit' onClick = {this.handleSearchSubmit}/>
				</form>
				{nickname && searchLoading ? <p>Loading...</p> : ''}
				{
					searchLoading ? '' :
						<div className = 'searchList'>
							{ searchResult && searchResult.map(user => {
								return (
									<div key = {user.account}>
										<Link to={`/mypage/${user.account}/1`} className = 'writing_user search_user'>
											{
												!user.image ?
													<img src = "./src/頭像.png" className = "img_placeholder_writing"></img>
													:
													<img src = {`data:image/jpg;base64,${user.image}`} className = "img_placeholder_writing" ></img>
											}
											<p className = "writing_username">{user.nickname}</p>
										</Link>
									</div>
								)
							})}
						</div>
				}
				{
					searchMessage === 'No result' && <p className = 'search_zero'>---無搜尋結果---</p>
				}
				
				<p className = 'copyRight'>©2019 Zhi. All Right Reserved.</p>
			</div>
		)
	}
}

export default hot(Search);