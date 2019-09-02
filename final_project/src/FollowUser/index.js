import { connect } from 'react-redux'
import FollowUser from './FollowUser'
import { login_check, getFollowUser } from '../actions'
import { withRouter } from 'react-router-dom'


const mapStateToProps = state =>({
	loginAccount: state.login_check.loginAccount,
	logoutState: state.logout.logoutState,
	getFollowedLoading: state.getFollowUser.getFollowedLoading,
	followUserMessage: state.getFollowUser.followUserMessage,
	followUserResult: state.getFollowUser.followUserResult
})


const mapDispatchToProps = dispatch =>({
	login_check: () => {
		dispatch(login_check())
	},
	getFollowUser: () => {
		dispatch(getFollowUser())
	}
})

//透過connect將react和redux做連結
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FollowUser))
