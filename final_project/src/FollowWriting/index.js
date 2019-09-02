import { connect } from 'react-redux'
import FollowWriting from './FollowWriting'
import { login_check, commentSubmit, getComment, like, getFollowWriting } from '../actions'
import { withRouter } from 'react-router-dom'


const mapStateToProps = state =>({
	nowLoading: state.getFollowWriting.nowLoading,
	loginAccount: state.login_check.loginAccount,
	loginNickname: state.login_check.loginNickname,
	loginImage: state.login_check.loginImage,
	logoutState: state.logout.logoutState,
	getWritingMessage: state.getFollowWriting.getWritingMessage,
	writingData: state.getFollowWriting.writingData,
	pagination: state.getFollowWriting.pagination,
	currentPage: state.getFollowWriting.currentPage,
	isLoading: state.getComment.isLoading,
	commentData: state.getComment.commentData,
	likeMessage: state.deleteWriting.likeMessage,
	commentMessage: state.commentSubmit.commentMessage
})


const mapDispatchToProps = dispatch =>({
	login_check: () => {
		dispatch(login_check())
	},
	getComment: (id) => {
		dispatch(getComment(id))
	},
	commentSubmit: (id, account, comment) => {
		dispatch(commentSubmit(id, account, comment))
	},
	like: (id, account) => {
		dispatch(like(id, account))
	},
	getFollowWriting: (page) => {
		dispatch(getFollowWriting(page))
	}
})

//透過connect將react和redux做連結
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FollowWriting))
