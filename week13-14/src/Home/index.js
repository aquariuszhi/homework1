import { connect } from 'react-redux'
import Home from './Home'
import { checkLogin, getPost, getOnePost, deletePost } from '../actions'
import { withRouter } from 'react-router-dom'


const mapStateToProps = state =>({  //state為globle state(也就是store), app對應到reducer的app
	loginData: state.login.loginData,
	posts: state.getPost.posts,
	pagination: state.getPost.pagination,
	currentPage: state.getPost.currentPage
})

//透過dispatch將action發布出去
const mapDispatchToProps = dispatch =>({
	checkLogin: () => {
		dispatch(checkLogin())
	},
	getPost: page => {
		dispatch(getPost(page))
	},
	getOnePost: id_main => {
		dispatch(getOnePost(id_main))
	}
})

//透過connect將react和redux做連結
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))
