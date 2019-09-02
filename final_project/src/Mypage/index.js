import { connect } from 'react-redux'
import Mypage from './Mypage'
import { login_check, writingSubmit, getPersonWriting, writingUpdate, deleteWriting, getAssignWriting, commentSubmit, getComment, like, checkFollow, setFollow } from '../actions'
import { withRouter } from 'react-router-dom'


const mapStateToProps = state =>({
	nowLoading: state.getPersonWriting.nowLoading,
	loginAccount: state.login_check.loginAccount,
	loginNickname: state.login_check.loginNickname,
	loginImage: state.login_check.loginImage,
	logoutState: state.logout.logoutState,
	writingMessage: state.writingSubmit.writingMessage,
	getWritingMessage: state.getPersonWriting.getWritingMessage,
	writingData: state.getPersonWriting.writingData,
	followed: state.checkFollow.followed,
	setFollowed: state.checkFollow.setFollowed,
	pagination: state.getPersonWriting.pagination,
	currentPage: state.getPersonWriting.currentPage,
	isLoading: state.getComment.isLoading,
	commentData: state.getComment.commentData,
	getAssignMessage: state.getAssignWriting.getAssignMessage,
	getAssignData: state.getAssignWriting.getAssignData,
	modifyMesssage: state.getAssignWriting.modifyMesssage,
	delWritingMessage: state.deleteWriting.delWritingMessage,
	likeMessage: state.deleteWriting.likeMessage,
	commentMessage: state.commentSubmit.commentMessage
})


const mapDispatchToProps = dispatch =>({
	login_check: () => {
		dispatch(login_check())
	},
	writingSubmit: (account, message, category, release) => {
		dispatch(writingSubmit(account, message, category, release))
	},
	getPersonWriting: (page, account) => {
		dispatch(getPersonWriting(page, account))
	},
	getAssignWriting: (id) => {
		dispatch(getAssignWriting(id))
	},
	writingUpdate: (modifyId, account, modifyWriting, modifyCategory, modifyRelease) => {
		dispatch(writingUpdate(modifyId, account, modifyWriting, modifyCategory, modifyRelease))
	},
	deleteWriting: (id, account) => {
		dispatch(deleteWriting(id, account))
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
	checkFollow: (account) => {
		dispatch(checkFollow(account))
	},
	setFollow: (account) => {
		dispatch(setFollow(account))
	}
})

//透過connect將react和redux做連結
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Mypage))
