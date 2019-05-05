var add = require('./homework5')

test('should return correct answer while = 123+456', () =>{
	expect(add('123','456')).toEqual('579')
})
test('should return correct answer while = 123+789', () =>{
	expect(add('123','789')).toEqual('912')
})
test('should return correct answer while = 99999+9999999', () =>{
	expect(add('99999','9999999')).toEqual('10099998')
})
test('should return correct answer while = 9999999+99999', () =>{
	expect(add('9999999','99999')).toEqual('10099998')
})
test('should return correct answer while = 7799999+99999', () =>{
	expect(add('7799999','99999')).toEqual('7899998')
})