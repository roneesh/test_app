var index = require('../index.js');

describe('recordIsValid', function() {
	var valid_object = {
			'name' 		 : 'john smith',
			'age' 		 : '35',
			'profession' : 'programmer'
		},
		invalid_object = {
			'name' 		 : '123456',
			'age'  		 : 'john smith',
			'profession' : '12346'
		};

	it('returns true for a valid object', function() {
		var validity = index.recordIsValid(valid_object);
		expect(validity).toEqual(true);
	});

	it('returns false for an invalid object', function() {
		var validity = index.recordIsValid(invalid_object);
		expect(validity).toEqual(false);
	});

})