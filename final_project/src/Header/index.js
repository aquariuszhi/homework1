import { connect } from 'react-redux'
import Header from './Header'
import { reg, login, login_check, logout, updateImage, updateNickname, getPersonWriting, getCategoryWriting } from '../actions'

const mapStateToProps = state =>({
	isLoading: state.reg.isLoading,
	registerData: state.reg.registerData,
	registerMessage: state.reg.registerMessage,
	loginMessage: state.login.loginMessage,
	loginNickname: state.login_check.loginNickname,
	loginImage: state.login_check.loginImage,
	loginAccount: state.login_check.loginAccount,
	logoutState: state.logout.logoutState,
	updateImg: state.updateImage.updateImg,
	updateImgMessage: state.updateImage.updateImgMessage,
	updateNicknameMessage: state.updateNickname.updateNicknameMessage
})


const mapDispatchToProps = dispatch =>({
	reg: (account, password, nickname) => {
		dispatch(reg(account, password, nickname))
	},
	login: (account, password) => {
		dispatch(login(account, password))
	},
	login_check: () => {
		dispatch(login_check())
	},
	logout: () => {
		dispatch(logout())
	},
	updateImage: (imageFile) => {
		dispatch(updateImage(imageFile))
	},
	updateNickname: (account, nickname) => {
		dispatch(updateNickname(account, nickname))
	},
	getPersonWriting: (page, account) => {
		dispatch(getPersonWriting(page, account))
	},
	getCategoryWriting: (page, work) => {
		dispatch(getCategoryWriting(page, work))
	}
})


export default connect(mapStateToProps, mapDispatchToProps)(Header)