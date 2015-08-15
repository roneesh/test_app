var express = require('express'),
	app = express(),
    server = app.listen(3000, developmentStartup),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    _ = require('underscore'),
    DB_FILE_NAME = 'applications.json';


// *************
// Express setup
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', './views');
app.set('view engine', 'jade');


// ******
// Routes
app.get('/', newApplication);
app.get('/applications', indexApplication);
app.get('/applications/new', newApplication);
app.get('/applications/:id', showApplication);
app.get('/applications/:id/edit', editApplication);
app.post('/applications', createApplication);
app.post('/applications/lookup', lookupApplication);


function newApplication(request, response) {
    response.render('new', { fruits : ['banana', 'grapefruit', 'grapes'] } );
}

function showApplication(request, response) {
	var app_id = request.params.id,
		application = getApplication(app_id);
	response.render('show', {application: application});
}

function indexApplication(request, response) {
    var applications = getApplications();
    response.render('index', {applications: applications});
}

function createApplication(request, response) {
	var new_application = {
		'name' 		  : request.body.name,
		'age'  		  : request.body.age,
		'profession'  : request.body.profession,
	}

	if (createApplicationRecord(new_application)) {
		response.render('show', {application: new_application, thanks: 'THANKZ'});
	} else {
		response.render('new', { apply_message: 'We are sorry, but your application could not be saved at this time, please try again.'})
	}

	// if (recordIsValid(new_application)) {
	// 	_.extend(new_application, {
	// 		'application_id' 	   : Math.floor(Math.random()*99999999).toString(),
	// 		'application_reviewed' : false,
	// 		'application_approved' : false
	// 	})
	// 	createApplicationRecord(new_application);
	// 	response.render('show', {application: new_application, thanks: 'THANKZ'});
	// } else {
	// 	response.render('new', { apply_message: 'We are sorry, but your application could not be saved at this time, please try again.'})
	// }
}

function lookupApplication(request, response) {
	var app_id = request.body.id,
		application = getApplication(app_id);
	if (application) {
		response.render('show', {application: application});
	} else {
		response.render('new', { lookup_message : "We no haz that application! Please try again!"})
	}
}

function editApplication(request, response) {
	var app_id = request.params.id,
		new_status = request.query.status,
		existing_application = getApplication(app_id);

	if (existing_application && (new_status === 'approve')) {
		_.extend(existing_application, {
			'application_reviewed' : true,
			'application_approved' : true
		})
		updateApplicationRecord(existing_application);

	} else if (existing_application && (new_status === 'reject')) {
		_.extend(existing_application, {
			'application_reviewed' : true,
			'application_approved' : false
		})
		updateApplicationRecord(existing_application);
	}

	response.redirect('back');
}

// ****************************************
// "Database" of applications via JSON file

function recordIsValid(application) {
	return /^[a-zA-Z]([a-zA-Z ]+)$/.test(application.name) &&
		   /^([1-9][0-9])[0-9]?$/.test(application.age) &&
		   /^[a-zA-Z][a-zA-Z\s]{2,50}/.test(application.profession);
}

function readDB() {
	return JSON.parse(fs.readFileSync(DB_FILE_NAME, {encoding: 'utf8'}));
}

function getApplications() {
	return readDB();
}

function getApplication(application_id) {
	return _.findWhere(readDB(), {'application_id' : application_id});
}

function createApplicationRecord(new_record) {
	var existing_db = readDB();

	if (recordIsValid(new_record)) {
		_.extend(new_record, {
			'application_id' 	   : Math.floor(Math.random()*99999999).toString(),
			'application_reviewed' : false,
			'application_approved' : false
		})
		existing_db.push(new_record);
		fs.writeFileSync(DB_FILE_NAME, JSON.stringify(existing_db, null, 4));
		return true;
	} else {
		return false;
	}
}

function updateApplicationRecord(updated_existing_record) {
	var existing_db = readDB();

	existing_db.forEach(function(record) {
		if (record.application_id === updated_existing_record.application_id) {
			_.extend(record, updated_existing_record);
		}
	});

	return fs.writeFileSync(DB_FILE_NAME, JSON.stringify(existing_db, null, 4));
}


// **************************
// Development server startup

function developmentStartup() {
    console.log('Server is running on port ' + server.address().port);
}

