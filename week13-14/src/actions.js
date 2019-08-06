import * as actionTypes from './actionTypes'
import axios from 'axios'


var rand = function() {
    return Math.random().toString(36).substr(2); // 將隨機數轉36進位的字串，並跳過0
	};

var token = function() {
    return rand() + rand(); // to make it longer
};

var xsrftoken = token()

document.cookie = `XSRF-TOKEN=${token()}` //設定cookie

//axios instance，將withCredentials設定為true使得Request Header可以帶上cookie
const instance = axios.create({
	baseURL: 'http://localhost/backendApi/index.php',
	withCredentials: true,
	xsrfCookieName: 'XSRF-TOKEN',
	xsrfHeaderName: 'X-XSRF-TOKEN'
})

//action creater
export const getPost = (page) =>({
	type: actionTypes.GET_ALL,
	payload: instance.post('/comment/comment/' + page)
})

export const getOnePost = (id_main) =>({
	type: actionTypes.GET,
	payload: instance.post('/comment/get_one_comment/?id_main=' + id_main)
})

export const login = (account, password) =>({
	type: actionTypes.LOGIN,
	payload: instance.post('/login/login/', {
		account,
		password
	})
})

export const logout = () =>({
	type: actionTypes.LOGOUT,
	payload: instance.post('/login/logout/')
})

export const register = (account, nickname, password) =>({
	type: actionTypes.REGISTER,
	payload: instance.post('/register/create/', {
		account,
		nickname,
		password
	})
})

export const checkLogin = () =>({
	type: actionTypes.LOGIN_CHECK,
	payload: instance.post('/login/login_check/')
})

export const post_main = (nickname, comment) =>({
	type: actionTypes.POST_MAIN,
	payload: instance.post('/comment/create/',{
		nickname,
		comment
	})
})

export const post_child = (id_main, nickname, comment_child) =>({
	type: actionTypes.POST_CHILD,
	payload: instance.post('/comment/create_child/', {
		id_main,
		nickname,
		comment_child
	})
})

export const deletePost = (id_main) =>({
	type: actionTypes.DELETE,
	payload: instance.post('/comment/delete_comment/', {
		id_main
	})
})

export const modifyPost = (id_main, nickname, comment) =>({
	type: actionTypes.MODIFY,
	payload: instance.post('/modify/modify/', {
		id_main,
		nickname,
		comment
	})
})