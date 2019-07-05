const Sequelize = require('sequelize')
const conn = require('./conn')

const MainComment = conn.define('maincomment', {
	id_main: {
		type: Sequelize.STRING,
		primaryKey: true, //設為primary key
		autoIncrement: true, //欄位數值自動增加
	},
	nickname: {
		type: Sequelize.STRING,
		allowNull: false, //設定不可為空值
		unique: true //設定不可重複
	},
	comment: {
		type: Sequelize.STRING,
		allowNull: false //設定不可為空值
	}
}, {
	tableName: 'maincomment'
})

//User.sync() 若沒有該table就新建一個

module.exports = MainComment