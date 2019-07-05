const MainComment = require('../model/post_main')
const ChildComment = require('../model/post_child')

module.exports = {
	commentBackend: function(req, res){
		const sessionNum = req.session.nickname
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
	
	modifyBackend: (req, res) => {		
		const sessionNum = req.session.nickname
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