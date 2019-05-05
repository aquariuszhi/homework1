var isPalindromes = require('./homework4')

test('should return correct answer while = abcdcba', () =>{
	expect(isPalindromes('abcdcba')).toEqual(true)
})
test('should return correct answer while = abcdcba', () =>{
	expect(isPalindromes('abcdcb')).toEqual(false)
})
test('should return correct answer while = abcdcba', () =>{
	expect(isPalindromes('zaaz')).toEqual(true)
})
test('should return correct answer while = abcdcba', () =>{
	expect(isPalindromes('zavvbz')).toEqual(false)
})
