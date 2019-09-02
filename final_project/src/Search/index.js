import { connect } from 'react-redux'
import Search from './Search'
import { login_check, search } from '../actions'
import { withRouter } from 'react-router-dom'


const mapStateToProps = state =>({
	searchLoading: state.search.searchLoading,
	searchMessage: state.search.searchMessage,
	searchResult: state.search.searchResult
})


const mapDispatchToProps = dispatch =>({
	login_check: () => {
		dispatch(login_check())
	},
	search: (nickname) => {
		dispatch(search(nickname))
	}
})

//透過connect將react和redux做連結
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search))
