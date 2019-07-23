var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
var request = new XMLHttpRequest();
var params = 'name=《大腦喜歡這樣學》&ISBN=9789863594475'
request.open('DELETE', 'https://lidemy-http-challenge.herokuapp.com/api/books', true);
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

request.onload = function() {
	if (request.status >= 200 && request.status < 400) {
		var data = JSON.parse(request.responseText);
		console.log(data)
  } else {
    console.log('error')

  }
};

request.onerror = function() {
  console.log('error')
};

request.send(params);
