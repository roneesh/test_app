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

	it('returns false for an object missing the name key', function() {
		var broken_object = {
				'age' : valid_object.age,
				'profession' : valid_object.profession
			},
			validity = index.recordIsValid(broken_object);

		expect(validity).toEqual(false)	
	});

	it('returns false for an object missing the age key', function() {
		var broken_object = {
				'name' : valid_object.name,
				'profession' : valid_object.profession
			},
			validity = index.recordIsValid(broken_object);

		expect(validity).toEqual(false);
	});

	it('returns false for an object with extra keys', function() {
		valid_object['new_key'] = 'new_value';

		var validity = index.recordIsValid(valid_object);

		expect(validity).toEqual(false);
	})

})