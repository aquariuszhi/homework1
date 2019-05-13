var capitalize = require('./homework2')

test('should return correct answer when str = nick',() => {
	expect(capitalize('nick')).toEqual('Nick')
})
test('should return correct answer when str = nick',() => {
	expect(capitalize('DeZhi')).toEqual('DeZhi')
})
test('should return correct answer when str = nick',() => {
	expect(capitalize('123')).toEqual('123')
})