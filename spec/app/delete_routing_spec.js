var index = require('../../index.js'),
	DB_FILE_NAME = 'applications.json',
	fs = require('fs');

describe('deleteRecord', function() {

	it('should delete a record when given an ID in the database to delete', function() {
		var new_db,
			db_reference = JSON.parse(fs.readFileSync(DB_FILE_NAME, {encoding: 'utf8'})),
			db_length = db_reference.length,
			application = db_reference[0];

		new_db = index.deleteApplicationRecord(application);
		expect(new_db.length).toEqual(db_length - 1);
	});

	it('should not delete any records when given an ID not in the database', function() {
		var nonexistent_application = { 'application_id' : '12345678' },
			new_db,
			db_reference = JSON.parse(fs.readFileSync(DB_FILE_NAME, {encoding: 'utf8'})),
			db_length = db_reference.length;

		new_db = index.deleteApplicationRecord(nonexistent_application);
		expect(new_db.length).toEqual(db_length);
	});

});