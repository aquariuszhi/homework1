import { connect } from 'react-redux'
import { login } from '../actions'
import { withRouter } from 'react-router-dom'
import Login from './Login'

const mapStateToProps = state =>({ //state為globle state(也就是store)
	loginData: state.login.loginData,
	userLoginError: state.login.userLoginError
})

//透過dispatch將action發布出去
const mapDispatchToProps = dispatch =>({
	login: (account, password) => {
		dispatch(login(account, password))
	}
})

//透過connect將react和redux做連結
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))