const User = require('../model/user')
const MainComment = require('../model/post_main')
const ChildComment = require('../model/post_child')
const bcrypt = require('bcrypt') //加密liberary

module.exports = {
	index: function(req, res){
		const sessionNum = req.session.nickname
		if(!req.query.page){
			var page = 1
		} else {
			var page = req.query.page
		}
		var start = (page-1)*10
		MainComment.findAndCountAll({
			offset: start,
			limit: 10
		})
		.then(Main => {
			var pages = Math.ceil(Main.count/10)
			ChildComment.findAll()
			.then(Child => {
				res.render('index', {
					Main,
					Child,
					sessionNum,
					page,
					pages,
					title: 'Home'
				})
			}).catch((err) => {
				console.log(err)
			})
		}).catch((err) => {
			console.log(err)
		})
	},
	
	login: (req, res) => {
		res.render('login', {
			title: 'Ligin'
		})
	},
	
	loginBackend: (req, res) => {
		let Password = req.body.password
		User.findAll({
			where: {
				account: req.body.account
			}
		}).then(data => {
			if(bcrypt.compareSync(Password,data[0].password)){
				req.session.nickname = data[0].nickname
				res.redirect('/')
			} else {
				res.render('loginError',{
					title:'登入失敗'
				})
			}
		}).catch((err) => {
			res.render('loginError',{
				title:'登入失敗'
			})
		})
	},
	
	logout: (req, res) => {
		req.session.destroy();
		res.redirect('/')
	},
	
	registered: (req, res) => {
		res.render('registered',{
			title: 'Register'
		})
			
	},
	
	registeredBackend: (req, res) => {
		let Account = req.body.account
		let Nickname = req.body.nickname
		let Password = req.body.password
		
		//判斷註冊欄位是否皆已填
		if(Account === '' || Nickname === '' || Password === ''){
			res.render('regEmpty',{
				title: '註冊失敗'
			})
			
		//判斷註冊欄位是否輸入過長
		} else if(Account.length > 10 || Password.length > 10 || Nickname.length > 10){
			res.render('regToolong',{
				title:'註冊失敗'
			})
		
		//判斷註冊欄位帳號是否重複
		} else {
			User.findAll({
				attributes:['account'],
				where:{
					account: Account,
				}
			}).then(data => {
				if(data[0].account){
					res.render('regAccountRepeat',{
						title:'帳號重複'
					})
				}
				
			//再判斷註冊欄位暱稱是否重複
			}).catch((err) => {
				User.findAll({
					attributes:['nickname'],
					where:{
						nickname: Nickname,
					}
				}).then(data => {
					if(data[0].nickname){
						res.render('regNicknameRepeat',{
							title:'暱稱重複'
						})
					}
					
				//如沒問題則建立資料
				}).catch((err) => {
					User.create({
							account: Account,
							nickname: Nickname,
							password: bcrypt.hashSync(Password, 10)
					}).then(() => {
						res.render('regSuccess',{
							title: 'Register success'
						})
					}).catch((err) => {
						console.log('error')
					})	
				})
			})		
		}
	}
	

}