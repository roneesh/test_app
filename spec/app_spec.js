var index = require('../index.js');

describe('recordIsValid', function() {
	var valid_object = {
		'name' : 'john smith',
		'age' : '35',
		'profession' : 'programmer'
	}
	it('returns true for a passing object', function() {
		var validity = index.recordIsValid(valid_object);
		expect(validity).toEqual(true);
	});
})