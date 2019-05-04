import {stars} from './homework1'

describe('homework1', () => {
	test('should return correct answer when n = 1',() => {
	expect(stars(1)).toBe(['*'])
	})
})