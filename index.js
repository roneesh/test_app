var express = require('express'),
	app = express(),
    server = app.listen(3000, developmentStartup),
    bodyParser = require('body-parser');

var fs = require('fs'),
	applications = [];

// "Database" of applications
fs.readFile('applications.json', {encoding: 'utf8'}, readApplicationsToArray);

function readApplicationsToArray(error, data) {
	if (error) {
		throw error;
	}

	JSON.parse(data).forEach(function(application) {
		applications.push(application);
	});
}


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
	response.send('now viewing application: ' + request.params.id);
}

function indexApplication(request, response) {
    response.render('index', {applications: applications});
}

function createApplication(request, response) {
	console.log('POST applications hit')
	console.log(request.body)
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