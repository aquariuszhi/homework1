let url = 'https://lidemy-http-challenge.herokuapp.com/api/v2/me'

const fetch = require('node-fetch');
const base64 = require('base-64')
let user = 'admin'
let password = 'admin123'


global.fetch = fetch
global.Headers = fetch.Headers;

let headers = new Headers()

headers.set('Authorization', 'Basic' + base64.encode(user+':'+password))

fetch(url,{method:'GET',
	headers:headers
}).then(function(data){
	console.log(data)
	//console.log(JSON.stringify(data))
}).catch(function(err){
	console.log("err")
})
