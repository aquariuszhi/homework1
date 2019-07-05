const express = require('express')
const app = express()
const bodyParser = require('body-parser') //處理表單
const helmet = require('helmet') //安全性補強

const UrlModel = require('./model/Url')
app.set('view engine', 'ejs') //設定view engine為ejs
app.use(bodyParser.json()) //處理表單
app.use(bodyParser.urlencoded({ extended:true})) //處理表單
app.use(helmet()) //安全性補強

const UrlController = require('./controller/url')

app.get('/', UrlController.index)
app.post('/', UrlController.UrlBackend)

app.get('/sh/*', UrlController.shift)


app.listen(3000, () => {  //在localhost:3000架設伺服器
	console.log('Example app listening on port 3000!')
})