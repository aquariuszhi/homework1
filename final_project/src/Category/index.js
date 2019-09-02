import { connect } from 'react-redux'
import Category from './Category'
import { login_check, writingSubmit, writingUpdate, deleteWriting, getAssignWriting, commentSubmit, getComment, like, getCategoryWriting } from '../actions'
import { withRouter } from 'react-router-dom'


const mapStateToProps = state =>({
	nowLoading: state.getCategoryWriting.nowLoading,
	loginAccount: state.login_check.loginAccount,
	loginNickname: state.login_check.loginNickname,
	loginImage: state.login_check.loginImage,
	logoutState: state.logout.logoutState,
	writingMessage: state.writingSubmit.writingMessage,
	getWritingMessage: state.getCategoryWriting.getWritingMessage,
	writingData: state.getCategoryWriting.writingData,
	pagination: state.getCategoryWriting.pagination,
	currentPage: state.getCategoryWriting.currentPage,
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
	getCategoryWriting: (page, category) => {
		dispatch(getCategoryWriting(page, category))
	}
})

//透過connect將react和redux做連結
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Category))
