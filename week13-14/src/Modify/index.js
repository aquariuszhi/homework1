import { connect } from 'react-redux'
import { getOnePost, modifyPost } from '../actions'
import Modify from './Modify'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state =>({
	loginData: state.login.loginData,
	onePost: state.getOnePost.onePost,
	commentMessage: state.modifyPost.commentMessage
})

//透過dispatch將action發布出去
const mapDispatchToProps = dispatch =>({
	getOnePost: id_main => {
		dispatch(getOnePost(id_main))
	},
	modifyPost: (id_main, nickname, comment) =>{
		dispatch(modifyPost(id_main, nickname, comment))
	}
	
})

//透過connect將react和redux做連結
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Modify))