import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom'

class FollowUser extends React.Component{
	constructor(props){
		super(props)
	}
	
	componentDidMount(){
		this.props.getFollowUser()
	}
	
	componentDidUpdate(prevProps){
		if(!prevProps.loginAccount && this.props.loginAccount){  //登入就重新渲染
			this.props.getFollowUser()
		} else if(!prevProps.logoutState && this.props.logoutState){  //登出就重新渲染
			this.props.getFollowUser()
		}
	}
	
	//顯示輸入的文字
	onInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	
	render(){
		const { getFollowedLoading, followUserMessage, followUserResult } = this.props
		return (
			<div>
				{
					getFollowedLoading ? 
						<p>Loading...</p>
						:
						<div className = 'searchList'>
							{ followUserResult && followUserResult.map(user => {
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
					followUserMessage === 'No result' && <p className = 'search_zero'>---無追隨對象---</p>
				}
				{
					followUserMessage === 'No login' && <p className = 'search_zero'>---請登入會員---</p>
				}
				<p className = 'copyRight'>©2019 Zhi. All Right Reserved.</p>
			</div>
		)
	}
}

export default hot(FollowUser);