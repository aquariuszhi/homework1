const Sequelize = require('sequelize')

const sequelize = new Sequelize('commentboard', 'root', 'fish0616', {
	host: 'localhost',
	dialect: 'mysql'
})

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.')
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err)
	})
	

	
module.exports = sequelize