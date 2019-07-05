const Sequelize = require('sequelize')
const conn = require('./conn')

const User = conn.define('user', {
	id_registered: {
		type: Sequelize.STRING,
		primaryKey: true, //設為primary key
		autoIncrement: true, //欄位數值自動增加
	},
	account: {
		type: Sequelize.STRING,
		allowNull: false, //設定不可為空值
		unique: true //設定不可重複
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false //設定不可為空值
	},
	nickname: {
		type: Sequelize.STRING,
		allowNull: false, //設定不可為空值
		unique: true //設定不可重複
	}
}, {
	tableName: 'registered'
})

//User.sync() 若沒有該table就新建一個

module.exports = User