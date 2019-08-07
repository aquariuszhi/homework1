const MainComment = require('../model/post_main')
const ChildComment = require('../model/post_child')

module.exports = {
	commentBackend: function(req, res){
		const sessionNum = req.session.nickname
		//確認有無session和有無輸入留言，若達成條件即新增留言並導回首頁
		if(sessionNum && req.body.comment !== ''){
			MainComment.create({
				nickname: sessionNum,
				comment: req.body.comment
			}).then((Main) => {
				res.redirect('/')
			}).catch((err) => {
				console.log(err)
			})
		} else if(!sessionNum){
			res.render('loginPlease',{
				title:'煩請登入'
			})
		} else {
			res.render('commentPlease')
		}
	},
	
	childBackend: function(req, res){
		const sessionNum = req.session.nickname
		//確認有無session和有無輸入留言，若達成條件即新增留言並導回首頁
		if(sessionNum && req.body.comment_child !== ''){
			ChildComment.create({
				nickname_child: sessionNum,
				comment_child: req.body.comment_child,
				id_main: req.body.id_main
			}).then((Child) => {
				res.redirect('/')
			}).catch((err) => {
				console.log(err)
			})
		} else if(!sessionNum){
			res.render('loginPlease',{
				title:'煩請登入'
			})
		} else {
			res.render('commentPlease')
		}
	},
	//渲染修改主留言頁面
	modify: (req, res) => {
		const sessionNum = req.session.nickname
		MainComment.findAll({
			where: {
				id_main: req.query.id_main
			}
		}).then(Main => {
			res.render('modify',{
				Main,
				sessionNum,
				title: '編輯留言'
			})
		}).catch((err) => {
			console.log(err)
		})
	},
	//修改主留言後端
	modifyBackend: (req, res) => {		
		const sessionNum = req.session.nickname
		//確認有無session和有無輸入留言，若達成條件即新增留言並導回首頁
		if(sessionNum && req.body.comment !== ''){
			MainComment.update({
				comment: req.body.comment
			},{
				where: {
					id_main: req.body.id_main
				}
			}).then((Main) => {
				res.redirect('/')
			}).catch((err) => {
				console.log(err)
			})
		} else if(!sessionNum){
			res.render('loginPlease',{
				title:'煩請登入'
			})
		} else {
			res.render('commentPlease')
		}	
	},
	
	deletedBackend: (req, res) => {
		const sessionNum = req.session.nickname
		//若有session即可刪除自己的留言
		if(sessionNum){
			MainComment.destroy({
				where: {
					id_main: req.query.id_main
				}
			}).then((Main) => {
				res.redirect('/')
			}).catch((err) => {
				console.log(err)
			})
		} else if(!sessionNum){
			res.render('loginPlease',{
				title:'煩請登入'
			})
		}
	}
}