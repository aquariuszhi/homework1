function isPrime(num){
	if(num === 0){
		return false
	}
	if(num === 1){
		return false
	}
	if(num >= 2){
		for(i = 2 ; i < num ; i++){
			if(num % i === 0){
				return false
			}
		}
		return true
	}
	else{
		return 'error'
	}
}

module.exports = isPrime
	