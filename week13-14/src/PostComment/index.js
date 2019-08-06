import { connect } from 'react-redux'
import PostComment from './PostComment'
import { post_main, checkLogin } from '../actions'
import { withRouter } from 'react-router-dom'


const mapStateToProps = state =>({  //state為globle state(也就是store), app對應到reducer的app
	loginData: state.login.loginData,
	commentMessage: state.post_main.commentMessage
})

//透過dispatch將action發布出去
const mapDispatchToProps = dispatch =>({
	post_main: (nickname, comment) => {
		dispatch(post_main(nickname, comment))
	},
	checkLogin: () => {
		dispatch(checkLogin())
	}
})

//透過connect將react和redux做連結
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostComment))
