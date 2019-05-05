function add(str1,str2){
	var reverse = ''
	var mid = 0
	var carry = 0
	var result = ''
	if(str1.length >= str2.length){
		for(i = 0 ; i < str2.length ; i++){
			index = i
			mid = Number(str1[str1.length-1-i]) + Number(str2[str2.length-1-i]) + carry
			carry = Math.floor(mid/10)
			reverse = reverse + (mid%10).toString()
		}
		for(j = 0 ; j < (str1.length - str2.length) ; j++){
			mid = Number(str1[str1.length-1-i-j]) + carry
			carry = Math.floor(mid/10)
			reverse = reverse + (mid%10).toString()
		}
		if(carry === 1){
			mid = Number(str1[str1.length-1-index-j])
			reverse = reverse + carry.toString()
		}
		for(k = 0 ; k < reverse.length ; k++){
			result += reverse[reverse.length-1-k]
		}
		return result
	}
	if(str1.length < str2.length){
		for(i = 0 ; i < str1.length ; i++){
			index = i
			mid = Number(str1[str1.length-1-i]) + Number(str2[str2.length-1-i]) + carry
			carry = Math.floor(mid/10)
			var strmid = ((mid%10) + '')
			reverse = reverse + strmid
		}
		for(j = 0 ; j < (str2.length - str1.length) ; j++){
			mid = Number(str2[str2.length-1-i-j]) + carry
			carry = Math.floor(mid/10)
			reverse = reverse + (mid%10).toString()
		}
		if(carry === 1){
			mid = Number(str2[str2.length-1-index-j])
			reverse = reverse + carry.toString()
		}
		for(k = 0 ; k < reverse.length ; k++){
			result += reverse[reverse.length-1-k]
		}
		return result
	}
}

module.exports = add