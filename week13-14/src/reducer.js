import { combineReducers } from 'redux'
import { GET, GET_ALL, POST_MAIN, POST_CHILD, LOGIN_CHECK, LOGIN, LOGOUT, REGISTER, REGISTERED, MODIFY, DELETE } from './actionTypes'

const initialState = {
	userData: null,
	loginData: null,
	registerMessage: null,
	posts: [],
	onePost: [],
	postChild: [],
	isGetRequesting: false,
	isLogoutLoading: false,
	userLoginError: null,
	isDeleteRequesting: false,
	userRegisterError: null,
	commentMessage: null,
	deleteMessage: null,
	pagination: null,
	currentPage: 1
}

function GetReducer(state = initialState, action){
	switch (action.type){
		//get all comment
		case `${GET_ALL}_PENDING`:{
			return Object.assign({}, state, {
				isGetRequesting: true,
				commentMessage: null,
				posts: [],
				onePost: [],
				pagination: null,
				currentPage: 1,
				userLoginError: null,
			})
		}
		case `${GET_ALL}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				isGetRequesting: false,
				commentMessage: null,
				posts: response.maincomment,
				pagination: response.pages,
				currentPage: response.page
			})
		}
		case `${GET_ALL}_REJECTED` : {
			return Object.assign({}, state, {
				isPostRequesting: false
			})
		}
		//get one comment and get all child comment
		case `${GET}_PENDING` : {
			return Object.assign({}, state, {
				isGetRequesting: true,
				commentMessage: null,
			})
		}
		case `${GET}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				isGetRequesting: false,
				onePost: response.maincomment[0],
				postChild: response.childcomment
			})
		}
		case `${GET}_REJECTED` : {
			return Object.assign({}, state, {
				isPostRequesting: false,
			})
		}
		//login
		case `${LOGIN}_PENDING` : {
			return Object.assign({}, state, {
				loginData: null,
				userLoginError: null
			})
		}
		case `${LOGIN}_FULFILLED` : {
			const response = action.payload.data
			if(response.result === 'success'){
				return Object.assign({}, state, {
					loginData: response.nickname,
					userLoginError: response.result
				})
			}
			return Object.assign({}, state, {
				userLoginError: response.result
			})
		}
		case `${LOGIN}_REJECTED` : {
			return Object.assign({}, state, {
				userLoginError: "Error"
			})
		}
		//LOGIN_CHECK
		case `${LOGIN_CHECK}_FULFILLED` : {
			const response = action.payload.data
			if(response.result === 'success'){
				return Object.assign({}, state, {
					commentMessage: null,
					loginData: response.nickname
				})
			}
			return state
		}
		//logout
		case `${LOGOUT}_PENDING` : {
			return Object.assign({}, state, {
				isLogoutLoading: true,
			})
		}
		case `${LOGOUT}_FULFILLED` : {
			return Object.assign({}, state, {
				loginData: null,
				isLogoutLoading: false,
				userLoginError: null
			})
		}
		default:
			return state
	}
}

function RegisterReducer(state = initialState, action){
	switch (action.type){
		//Register
		case `${REGISTER}_PENDING` : {
			return Object.assign({}, state, {
				userData: null,
				registerMessage: null
			})
		}
		case `${REGISTER}_FULFILLED` : {
			const response = action.payload.data
			if(response.result === 'success'){
				return Object.assign({}, state, {
					userData: response.account,
				})
			}
			return Object.assign({}, state, {
				registerMessage: response.result
			})
		}
		case `${REGISTER}_REJECTED` : {
			return Object.assign({}, state, {
				registerMessage: null
			})
		}
		default:
			return state
	}
}

function PostMainReducer(state = initialState, action){
	switch (action.type){
		//Post main comment
		case `${POST_MAIN}_PENDING` : {
			return Object.assign({}, state, {
				commentMessage: null
			})
		}
		case `${POST_MAIN}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				commentMessage: response.result
			})
		}
		default:
			return state
	}
}

function PostChildReducer(state = initialState, action){
	switch (action.type){
		//Post child comment
		case `${POST_CHILD}_PENDING` : {
			return Object.assign({}, state, {
				userLoginError: null,
				comment_child: null
			})
		}
		case `${POST_CHILD}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				comment_child: response.result
			})
		}
		case `${POST_CHILD}_REJECTED` : {
			return Object.assign({}, state, {
				userLoginError: action.payload.data.message
			})
		}
		default:
			return state
	}
}

function DeleteReducer(state = initialState, action){
	switch (action.type){
		//Delete comment
		case `${DELETE}_PENDING` : {
			return Object.assign({}, state, {
				isDeleteRequesting: true,
				deleteMessage: null
			})
		}
		case `${DELETE}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				isDeleteRequesting: false,
				deleteMessage: 'success'
			})
		}
		case `${DELETE}_REJECTED` : {
			return Object.assign({}, state, {
				userLoginError: ''
			})
		}
		default:
			return state
	}
}

function ModifyReducer(state = initialState, action){
	switch (action.type){
		//Modify comment
		case `${MODIFY}_PENDING` : {
			return Object.assign({}, state, {
				commentMessage: null
			})
		}
		case `${MODIFY}_FULFILLED` : {
			const response = action.payload.data
			console.log(response)
			return Object.assign({}, state, {
				commentMessage: response.result
			})
		}
		case `${MODIFY}_REJECTED` : {
			return Object.assign({}, state, {
				commentMessage: '請輸入留言'
			})
		}
		default:
			return state
	}
}

const app = combineReducers({
	getPost: GetReducer,
	getOnePost: GetReducer,
	login: GetReducer,
	register: RegisterReducer,
	post_main: PostMainReducer,
	post_child: PostChildReducer,
	deletePost: DeleteReducer,
	modifyPost: ModifyReducer
})

export default app