import { connect } from 'react-redux'
import { register } from '../actions'
import Register from './Register'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state =>({  //state為globle state(也就是store), app對應到reducer的app
	userData: state.register.userData,
	registerMessage: state.register.registerMessage
})

//透過dispatch將action發布出去
const mapDispatchToProps = dispatch =>({
	register: (account, nickname, password) => {
		dispatch(register(account, nickname, password))
	}
})

//透過connect將react和redux做連結
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))