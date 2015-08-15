var express = require('express'),
	app = express(),
    server = app.listen(3000, developmentStartup),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    _ = require('underscore');


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
app.get('/applications/new', newApplication);
app.get('/applications/:id', showApplication);
app.get('/applications', indexApplication);
app.post('/applications', createApplication);

function newApplication(request, response) {
    response.render('new', { fruits : ['banana', 'grapefruit', 'grapes'] } );
}

function showApplication(request, response) {
	var application = getApplication(request.params.id);
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

	if (recordIsValid(new_application)) {
		_.extend(new_application, {
			'application_id' 	   : new Date(),
			'application_reviewed' : false,
			'application_approved' : false
		})
		createApplicationRecord(new_application);
		response.render('index', {applications: readDB(), thanks: 'THANKZ'});
	} else {
		response.render('index', {applications: readDB(), message: 'We are sorry, but your application could not be saved at this time, please try again.'})
	}
}


// ****************************************
// "Database" of applications via JSON file

function recordIsValid(application) {
	return /^[a-zA-Z][a-zA-Z\s]{2,20}/.test(application.name) &&
		   /^[1-9][0-9]$/.test(application.age) &&
		   /^[a-zA-Z][a-zA-Z\s]{2,50}/.test(application.profession);
}

function readDB() {
	return JSON.parse(fs.readFileSync('applications2.json', {encoding: 'utf8'}));
}

function getApplications() {
	return readDB();
}

function getApplication(application_id) {
	return _.findWhere(readDB(), {'application_id' : application_id});
}

function createApplicationRecord(new_record) {
	var existing_db = readDB();
	existing_db.push(new_record);
	return fs.writeFileSync('applications2.json', JSON.stringify(existing_db, null, 4));
}


// **************************
// Development server startup

function developmentStartup() {
    console.log('Server is running on port ' + server.address().port);
}

