const express = require('express')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser') //處理表單
const helmet = require('helmet') //安全性補強

const userModel = require('./model/user')
app.use(session({ secret: 'keyboard cat', cookie:{ maxAge: 216000}})) //設定session
app.set('view engine', 'ejs') //設定view engine為ejs
app.use(bodyParser.json()) //處理表單
app.use(bodyParser.urlencoded({ extended:true})) //處理表單
app.use(helmet()) ////安全性補強

const userController = require('./controller/user')
const postController = require('./controller/post')

app.get('/', userController.index)
app.post('/', postController.commentBackend)
app.post('/postChild', postController.childBackend)

app.get('/login', userController.login)
app.post('/login', userController.loginBackend)

app.get('/logout', userController.logout)

app.get('/registered', userController.registered)
app.post('/registered', userController.registeredBackend)

app.get('/modify', postController.modify)
app.post('/modify', postController.modifyBackend)

app.get('/deleted', postController.deletedBackend)


app.listen(3000, () => {  //在localhost:3000架設伺服器
	console.log('Example app listening on port 3000!')
})