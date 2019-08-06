import { connect } from 'react-redux'
import Header from './Header'
import { logout, checkLogin } from '../actions'

const mapStateToProps = state =>({  //state為globle state(也就是store), app對應到reducer的app
	loginData: state.login.loginData
})

//透過dispatch將action發布出去
const mapDispatchToProps = dispatch =>({
	logout: () => {
		dispatch(logout())
	},
	checkLogin: () => {
		dispatch(checkLogin())
	}
})

//透過connect將react和redux做連結
export default connect(mapStateToProps, mapDispatchToProps)(Header)