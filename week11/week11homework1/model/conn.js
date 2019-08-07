//連接資料庫
const Sequelize = require('sequelize')  //引入Sequelize

const sequelize = new Sequelize('commentboard', 'root', 'fish0616', {
	host: 'localhost',
	dialect: 'mysql'
})

sequelize
	.authenticate() //認證用函式
	.then(() => {
		console.log('Connection has been established successfully.')
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err)
	})
	

	
module.exports = sequelize