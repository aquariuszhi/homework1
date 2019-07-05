const Url = require('../model/Url')

module.exports = {
	index: function(req, res){
		res.render('index',{
			title: 'Home'
		})
		
	},
	
	shift: function(req, res){
		if(req.params){
			Url.findAll({
				where: {
					shortUrl: req.params[0]
				}
			}).then(data => {
				res.redirect(data[0].dataValues.shiftUrl)
				
			}).catch((err) => {
				console.log(err)
			})
		} else {
			res.render('index',{
				title: 'Home'
			})
		}
	},

	UrlBackend: (req, res) => {
		var str = ''
		var result = ''
		for(var i = 1 ; i <=100000 ; i++){
			if(str.length < 6){
				var ran = Math.ceil(Math.random()*123)
				if(ran <=9 && ran > 0){
					str += ran.toString()
				} else if(ran <=90 && ran >= 65){
					result = String.fromCharCode(ran)
					str += result
				} else if(ran <=122 && ran >= 97){
					result = String.fromCharCode(ran)
					str += result
				}
			} else {
				break;
			}			
		}
		Url.create({
			shortUrl: str,
			shiftUrl: req.body.shiftUrl
		}).then(data => {
			res.send(data)
		}).catch((err) => {
			console.log(err)
		})

	}
	
}