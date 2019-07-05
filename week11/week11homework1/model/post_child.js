const Sequelize = require('sequelize')
const conn = require('./conn')

const ChildComment = conn.define('childcomment', {
	id_main: {
		type: Sequelize.STRING,
		allowNull: false //設定不可為空值
	},
	id_child: {
		type: Sequelize.STRING,
		primaryKey: true, //設為primary key
		autoIncrement: true //欄位數值自動增加
	},
	nickname_child: {
		type: Sequelize.STRING,
		allowNull: false, //設定不可為空值
		unique: true //設定不可重複
	},
	comment_child: {
		type: Sequelize.STRING,
		allowNull: false //設定不可為空值
	}
}, {
	tableName: 'childcomment'
})

//User.sync() 若沒有該table就新建一個

module.exports = ChildComment