const Sequelize = require('sequelize')
const conn = require('./conn')

const Url = conn.define('url', {
	id_url: {
		type: Sequelize.INTEGER,
		primaryKey: true, //設為primary key
		autoIncrement: true,
	},
	shortUrl: {
		type: Sequelize.STRING,
		allowNull: false, //設定不可為空值
		unique: true //設定不可重複
	},
	shiftUrl: {
		type: Sequelize.STRING,
		allowNull: false //設定不可為空值
	}
}, {
	tableName: 'shortUrl'
})

Url.sync() //若沒有該table就新建一個

module.exports = Url