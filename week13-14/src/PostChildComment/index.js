import { connect } from 'react-redux'
import PostChildComment from './PostChildComment'
import { post_child, checkLogin, getOnePost, deletePost } from '../actions'
import { withRouter } from 'react-router-dom'


const mapStateToProps = state =>({  //state為globle state(也就是store), app對應到reducer的app
	loginData: state.login.loginData,
	onePost: state.getOnePost.onePost,
	postChild: state.getOnePost.postChild,
	deleteMessage: state.deletePost.deleteMessage,
	currentPage: state.getPost.currentPage,
	comment_child: state.post_child.comment_child
})

//透過dispatch將action發布出去
const mapDispatchToProps = dispatch =>({
	post_child: (id_main, nickname, comment_child) => {
		dispatch(post_child(id_main, nickname, comment_child))
	},
	getOnePost: id_main => {
		dispatch(getOnePost(id_main))
	},
	checkLogin: () => {
		dispatch(checkLogin())
	},
	deletePost: id_main => {
		dispatch(deletePost(id_main))
	}
})

//透過connect將react和redux做連結
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostChildComment))
