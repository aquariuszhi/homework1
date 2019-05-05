var isPrime = require('./homework3')

test('should return correct answer when num = 1',() =>{
	expect(isPrime(1)).toEqual(false)
})
test('should return correct answer when num = 2',() =>{
	expect(isPrime(2)).toEqual(true)
})
test('should return correct answer when num = 37',() =>{
	expect(isPrime(37)).toEqual(true)
})
test('should return correct answer when num = 39',() =>{
	expect(isPrime(39)).toEqual(false)
})
test('should return correct answer when num = 101',() =>{
	expect(isPrime(101)).toEqual(true)
})
test('should return correct answer when num = abc',() =>{
	expect(isPrime('abc')).toEqual('error')
})