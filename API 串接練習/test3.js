var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
var request = new XMLHttpRequest();
let url = 'https://lidemy-http-challenge.herokuapp.com/api/v2/books/sys_info'
let urlEncode = encodeURI(url)
let param = 'ISBN=9981835423'

const base64 = require('base-64')
let user = 'admin'
let password = 'admin123'

request.open('GET', url, true);
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
request.setRequestHeader('Authorization', 'Basic ' + base64.encode(user+':'+password));
request.setRequestHeader('X-Library-Number', '20');
request.setRequestHeader('User-Agent', 'Mozilla/4.0 (MSIE 6.0; Windows NT 5.0)');

request.onload = function() {
	if (request.status >= 200 && request.status < 400) {
		console.log(request.responseText)
  } else {
    console.log('error')

  }
};

request.onerror = function() {
  console.log('error')
};

request.send(param);
