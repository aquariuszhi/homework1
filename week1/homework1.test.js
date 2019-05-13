var stars = require('./homework1')


test('should return correct answer when n = 1',() => {
	expect(stars(1)).toEqual(['*']);
});
test('should return correct answer when n = 3',() => {
	expect(stars(3)).toEqual(['*','**','***']);
});
test('should return correct answer when n = 5',() => {
	expect(stars(5)).toEqual(['*','**','***','****','*****']);
})
