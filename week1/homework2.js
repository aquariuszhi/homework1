function capitalize(str){
	var scode = str.charCodeAt(0)
	if (scode >= 'a'.charCodeAt(0) && scode <= 'z'.charCodeAt(0)){
		var newword = String.fromCharCode(scode - ('a'.charCodeAt(0) - 'A'.charCodeAt(0)))
		var result = str.replace(str[0], newword)
		return result
	}
	else {
		return str
	}
}

module.exports = capitalize