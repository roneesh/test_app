var express = require('express'),
	app = express(),
    server = app.listen(3000, developmentStartup),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    _ = require('underscore');

// Express Setup
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', './views');
app.set('view engine', 'jade');

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
		'name' 		 : request.body.name,
		'age'  		 : request.body.age,
		'profession' : request.body.profession
	}
	fs.appendFile('applications.json', new_application);
	response.render('index', {applications: applications, thanks: 'THANKZ'});
}

// Development Server Startup
function developmentStartup() {
    console.log('Server is running on port ' + server.address().port);
}

// "DATABASE" of applications via JSON file
function readDB() {
	return JSON.parse(fs.readFileSync('applications.json', {encoding: 'utf8'}));
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
	// return fs.writeFileSync('applications.json', existing_db);
}

createApplicationRecord({'test_record':'test_value'});
