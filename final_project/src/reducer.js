import { combineReducers } from 'redux' //可將reducer合併的middleware
import { Reg, RegImage, Login, Login_check, Logout, UpdateImage, UpdateNickname, WritingSubmit, GetWriting, WritingUpdate, DeleteWriting, GetAssignWriting, GetComment, CommentSubmit, Search, Like, GetMyWriting, GetPersonWriting, CheckFollow, SetFollow, GetFollowWriting, GetFollowUser, GetCategoryWriting } from './actionTypes'


const initialState = {
	isLoading: false,
	nowLoading: true,
	registerData: null,
	registerMessage: null,
	loginAccount: null,
	loginNickname: null,
	loginImage: null,
	loginMessage: null,
	logoutState: false,
	updateImg: null,
	updateImgMessage: null,
	updateNicknameMessage: null,
	writingData: [],
	writingMessage: null,
	pagination: '',
	currentPage: '',
	getWritingMessage: null,
	modifyMesssage: null,
	getAssignMessage: null,
	getAssignData: [],
	delWritingMessage: null,
	likeMessage: null,
	followed: null,
	setFollowed: null,
	getCommentMessage: null,
	commentData: [],
	commentMessage: null,
	searchLoading: false,
	searchMessage: '',
	searchResult: '',
	getFollowedLoading: false,
	followUserMessage: '',
	followUserResult: ''
}

function IndexReducer(state = initialState, action){
	switch (action.type){
		//註冊
		case `${Reg}_PENDING`:{
			return Object.assign({}, state, {
				isLoading: true,
				registerData: null,
				registerMessage: null,
				logoutState: false
			})
		}
		case `${Reg}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				isLoading: false,
				registerData: response.account,
				registerMessage: response.result
			})
		}
		case `${Reg}_REJECTED` : {
			return Object.assign({}, state, {
				isLoading: false,
			})
		}
		//登入
		case `${Login}_PENDING`:{
			return Object.assign({}, state, {
				isLoading: true,
				registerMessage: null,
				loginNickname: null,
				loginAccount: null,
				loginMessage: null,
				loginImage: null,
				logoutState: false
			})
		}
		case `${Login}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				isLoading: false,
				loginMessage: response.result
			})
		}
		case `${Login}_REJECTED` : {
			return Object.assign({}, state, {
				isLoading: false,
			})
		}
		//確認登入狀態
		case `${Login_check}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				registerMessage: null,
				loginMessage: null,
				updateNicknameMessage: null,
				loginAccount: response.account,
				loginNickname: response.nickname,
				updateImgMessage: null,
				loginImage: response.image
			})
		}
		//登出
		case `${Logout}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				loginNickname: null,
				loginAccount: null,
				loginMessage: null,
				registerMessage: null,
				loginImage: null,
				logoutState: true
			})
		}
		//更新頭像
		case `${UpdateImage}_PENDING`:{
			return Object.assign({}, state, {
				isLoading: true,
				updateImg: null,
				updateImgMessage: null
			})
		}
		case `${UpdateImage}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				isLoading: false,
				updateImg: response.imageFile,
				updateImgMessage: response.result
			})
		}
		case `${UpdateImage}_REJECTED` : {
			return Object.assign({}, state, {
				isLoading: false,
			})
		}
		//更新暱稱
		case `${UpdateNickname}_PENDING`:{
			return Object.assign({}, state, {
				isLoading: true,
				updateNicknameMessage: null
			})
		}
		case `${UpdateNickname}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				isLoading: false,
				updateNicknameMessage: response.result
			})
		}
		case `${UpdateNickname}_REJECTED` : {
			return Object.assign({}, state, {
				isLoading: false,
			})
		}
		default:
			return state
	}
}

function WritingReducer(state = initialState, action){
	switch (action.type){
		//送出文章
		case `${WritingSubmit}_PENDING`:{
			return Object.assign({}, state, {
				writingMessage: null,
			})
		}
		case `${WritingSubmit}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				writingMessage: response.result
			})
		}
		case `${WritingSubmit}_REJECTED` : {
			return Object.assign({}, state, {
			})
		}
		//取得文章
		case `${GetWriting}_PENDING`:{
			return Object.assign({}, state, {
				nowLoading: true,
				getWritingMessage: null,
				writingData: [],
				pagination: '',
				currentPage: '',
			})
		}
		case `${GetWriting}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				nowLoading: false,
				getWritingMessage: response.result,
				writingData: response.writing,
				pagination: response.pages,
				currentPage: response.page
			})
		}
		case `${GetWriting}_REJECTED` : {
			return Object.assign({}, state, {
				nowLoading: false,
			})
		}
		//取得指定文章
		case `${GetAssignWriting}_PENDING`:{
			return Object.assign({}, state, {
				getAssignMessage: null,
				getAssignData: []
			})
		}
		case `${GetAssignWriting}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				getAssignMessage: response.result,
				getAssignData: response.writing
			})
		}
		case `${GetAssignWriting}_REJECTED` : {
			return Object.assign({}, state, {
				getAssignData: []
			})
		}
		//編輯指定文章
		case `${WritingUpdate}_PENDING`:{
			return Object.assign({}, state, {
				modifyMesssage: null
			})
		}
		case `${WritingUpdate}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				modifyMesssage: response.result
			})
		}
		case `${WritingUpdate}_REJECTED` : {
			return Object.assign({}, state, {
				modifyMesssage: null
			})
		}
		//刪除文章
		case `${DeleteWriting}_PENDING`:{
			return Object.assign({}, state, {
				delWritingMessage: null,
			})
		}
		case `${DeleteWriting}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				delWritingMessage: response.result,
			})
		}
		case `${DeleteWriting}_REJECTED` : {
			return Object.assign({}, state, {
				delWritingMessage: null,
			})
		}
		//取得個人文章
		case `${GetPersonWriting}_PENDING`:{
			return Object.assign({}, state, {
				nowLoading: true,
				getWritingMessage: null,
				writingData: [],
				pagination: '',
				currentPage: '',
			})
		}
		case `${GetPersonWriting}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				nowLoading: false,
				getWritingMessage: response.result,
				writingData: response.writing,
				pagination: response.pages,
				currentPage: response.page
			})
		}
		case `${GetPersonWriting}_REJECTED` : {
			return Object.assign({}, state, {
				nowLoading: false,
				getWritingMessage: null,
				writingData: [],
				pagination: '',
				currentPage: '',
			})
		}
		//取得分類文章
		case `${GetCategoryWriting}_PENDING`:{
			return Object.assign({}, state, {
				nowLoading: true,
				getWritingMessage: null,
				writingData: [],
				pagination: '',
				currentPage: '',
			})
		}
		case `${GetCategoryWriting}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				nowLoading: false,
				getWritingMessage: response.result,
				writingData: response.writing,
				pagination: response.pages,
				currentPage: response.page
			})
		}
		case `${GetCategoryWriting}_REJECTED` : {
			return Object.assign({}, state, {
				nowLoading: false,
				getWritingMessage: null,
				writingData: [],
				pagination: '',
				currentPage: '',
			})
		}
		//取得Follow文章
		case `${GetFollowWriting}_PENDING`:{
			return Object.assign({}, state, {
				nowLoading: true,
				getWritingMessage: null,
				writingData: [],
				pagination: '',
				currentPage: '',
			})
		}
		case `${GetFollowWriting}_FULFILLED`: {
			const response = action.payload.data
			return Object.assign({}, state, {
				nowLoading: false,
				getWritingMessage: response.result,
				writingData: response.writing,
				pagination: response.pages,
				currentPage: response.page
			})
		}
		case `${GetFollowWriting}_REJECTED`: {
			return Object.assign({}, state, {
				nowLoading: false,
				getWritingMessage: null,
				writingData: [],
				pagination: '',
				currentPage: '',
			})
		}
		//取得Follow名單
		case `${GetFollowUser}_PENDING`:{
			return Object.assign({}, state, {
				getFollowedLoading: true,
				followUserMessage: '',
				followUserResult: ''
			})
		}
		case `${GetFollowUser}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				getFollowedLoading: false,
				followUserMessage: response.result,
				followUserResult: response.user
			})
		}
		case `${GetFollowUser}_REJECTED` : {
			return Object.assign({}, state, {
				getFollowedLoading: false,
				followUserMessage: '',
				followUserResult: ''
			})
		}
		//送出喜歡
		case `${Like}_PENDING`:{
			return Object.assign({}, state, {
				likeMessage: null,
			})
		}
		case `${Like}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				likeMessage: response.result,
			})
		}
		case `${Like}_REJECTED` : {
			return Object.assign({}, state, {
				likeMessage: null,
			})
		}
		//確認Follow
		case `${CheckFollow}_PENDING`:{
			return Object.assign({}, state, {
				followed: null,
			})
		}
		case `${CheckFollow}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				followed: response.result,
			})
		}
		case `${CheckFollow}_REJECTED` : {
			return Object.assign({}, state, {
				followed: null,
			})
		}
		//Follow或取消Follow
		case `${SetFollow}_PENDING`:{
			return Object.assign({}, state, {
				setFollowed: null,
			})
		}
		case `${SetFollow}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				setFollowed: response.result,
			})
		}
		case `${SetFollow}_REJECTED` : {
			return Object.assign({}, state, {
				setFollowed: null,
			})
		}
		//取得特定留言
		case `${GetComment}_PENDING`:{
			return Object.assign({}, state, {
				isLoading: true,
				getCommentMessage: null,
				commentData: [],
			})
		}
		case `${GetComment}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				isLoading: false,
				getCommentMessage: response.result,
				commentData: response.comment,
			})
		}
		case `${GetComment}_REJECTED` : {
			return Object.assign({}, state, {
				getCommentMessage: null,
			})
		}
		//送出留言
		case `${CommentSubmit}_PENDING`:{
			return Object.assign({}, state, {
				commentMessage: null
			})
		}
		case `${CommentSubmit}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				commentMessage: response.result
			})
		}
		case `${CommentSubmit}_REJECTED` : {
			return Object.assign({}, state, {
				commentMessage: null,
			})
		}
		default:
			return state
	}
}

function SearchReducer(state = initialState, action){
	switch (action.type){
		//送出搜尋
		case `${Search}_PENDING`:{
			return Object.assign({}, state, {
				searchLoading: true,
				searchMessage: '',
				searchResult: ''
			})
		}
		case `${Search}_FULFILLED` : {
			const response = action.payload.data
			return Object.assign({}, state, {
				searchLoading: false,
				searchMessage: response.result,
				searchResult: response.user
			})
		}
		case `${Search}_REJECTED` : {
			return Object.assign({}, state, {
				searchLoading: false,
				searchMessage: '',
				searchResult: ''
			})
		}
		default:
			return state
	}
}

const app = combineReducers({
	reg: IndexReducer,
	ima: IndexReducer,
	login: IndexReducer,
	login_check: IndexReducer,
	logout: IndexReducer,
	updateImage: IndexReducer,
	updateNickname: IndexReducer,
	writingSubmit: WritingReducer,
	getWriting: WritingReducer,
	writingUpdate: WritingReducer,
	getAssignWriting: WritingReducer,
	deleteWriting: WritingReducer,
	like: WritingReducer,
	checkFollow: WritingReducer,
	setFollow: WritingReducer,
	getFollowUser: WritingReducer,
	getFollowWriting: WritingReducer,
	getComment: WritingReducer,
	commentSubmit: WritingReducer,
	getPersonWriting: WritingReducer,
	getCategoryWriting: WritingReducer,
	search: SearchReducer
})

export default app