//actions負責根據不同的actionTypes對應到不同的Api

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

//axios instance for upload
const instanceImg = axios.create({
	baseURL: 'http://localhost/backendApi/index.php',
	withCredentials: true,
	xsrfCookieName: 'XSRF-TOKEN',
	xsrfHeaderName: 'X-XSRF-TOKEN',
	headers: {'Content-Type': 'multipart/form-data'}
})

//註冊
export const reg = (account, password, nickname) =>({
	type: actionTypes.Reg,
	payload: instance.post('/register/create' , {
		account,
		password,
		nickname
	})
})
//登入
export const login = (account, password) =>({
	type: actionTypes.Login,
	payload: instance.post('/login/login' , {
		account,
		password
	})
})
//確認登入狀態
export const login_check = () =>({
	type: actionTypes.Login_check,
	payload: instance.get('/login/login_check')
})
//登出
export const logout = () =>({
	type: actionTypes.Logout,
	payload: instance.post('/login/logout')
})
//上傳頭像
export const updateImage = (imageFile) =>({
	type: actionTypes.UpdateImage,
	payload:axios({
		url:"http://localhost/backendApi/index.php/register/image_update",
		method: "POST",
		withCredentials: true,
		xsrfCookieName: 'XSRF-TOKEN',
		xsrfHeaderName: 'X-XSRF-TOKEN',
		data: imageFile
	})
})
//更新nickname
export const updateNickname = (account, nickname) =>({
	type: actionTypes.UpdateNickname,
	payload: instance.post('/register/nickname_update', {
		account,
		nickname
	})
})
//上傳Message
export const writingSubmit = (account, writing, category, release) =>({
	type: actionTypes.WritingSubmit,
	payload: instance.post('/writing/create', {
		account,
		writing,
		category,
		release
	})
})
//取得文章
export const getWriting = (page) =>({
	type: actionTypes.GetWriting,
	payload: instance.post('/writing/writing/' + page)
})
//編輯文章
export const writingUpdate = (modifyId, account, modifyWriting, modifyCategory, modifyRelease) =>({
	type: actionTypes.WritingUpdate,
	payload: instance.post('/writing/modify', {
		modifyId,
		account,
		modifyWriting,
		modifyCategory,
		modifyRelease
	})
})
//取得特定文章
export const getAssignWriting = (id) =>({
	type: actionTypes.GetAssignWriting,
	payload: instance.post('/writing/get_assign_writing', {
		id
	})
})
//刪除文章
export const deleteWriting = (id, account) =>({
	type: actionTypes.DeleteWriting,
	payload: instance.post('/writing/delete', {
		id,
		account
	})
})
//送出Like
export const like = (id, account) =>({
	type: actionTypes.Like,
	payload: instance.post('/writing/like', {
		id,
		account
	})
})
//取得特定留言
export const getComment = (id) =>({
	type: actionTypes.GetComment,
	payload: instance.post('/writing/get_comment', {
		id
	})
})
//送出留言
export const commentSubmit = (id, account, comment) =>({
	type: actionTypes.CommentSubmit,
	payload: instance.post('/writing/comment', {
		id,
		account,
		comment
	})
})
//送出搜尋
export const search = (nickname) =>({
	type: actionTypes.Search,
	payload: instance.post('/register/search', {
		nickname
	})
})
//取得個人文章
export const getPersonWriting = (page, account) =>({
	type: actionTypes.GetPersonWriting,
	payload: instance.post('/writing/person/' + page, {
		account
	})
})
//確認follow
export const checkFollow = (account) =>({
	type: actionTypes.CheckFollow,
	payload: instance.post('/writing/check_follow', {
		account
	})
})
//follow或取消follow
export const setFollow = (account) =>({
	type: actionTypes.SetFollow,
	payload: instance.post('/writing/set_follow', {
		account
	})
})
//取得follow名單
export const getFollowUser = () =>({
	type: actionTypes.GetFollowUser,
	payload: instance.post('/writing/get_follow_user')
})
//取得follow文章
export const getFollowWriting = (page) =>({
	type: actionTypes.GetFollowWriting,
	payload: instance.post('/writing/get_follow_writing/' + page)
})
//取得分類文章
export const getCategoryWriting = (page, category) =>({
	type: actionTypes.GetCategoryWriting,
	payload: instance.post('/writing/get_category/' + page, {
		category
	})
})
