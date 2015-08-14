var express = require('express'),
	app = express(),
    server = app.listen(3000, developmentStartup);

var fs = require('fs');


// Express View Engine
app.set('views', '.');
app.set('view engine', 'jade');

// Routes
app.get('/', home);
app.get('/application-status/:application_id', statusCheck);
app.get('/admin', admin);
app.post('/submit-application', submitApplication);

function home(request, response) {
    response.render('index');
}

function statusCheck(request, response) {

}

function admin(request, response) {
    response.render('admin')
}

function submitApplication(request, response) {

}

// Development Server Startup
function developmentStartup() {
    console.log('Server is running on port ' + server.address().port);
}