var express = require('express'),
	app = express(),
    server = app.listen(3000, developmentStartup);

var fs = require('fs');


// Express Setup
app.use(express.static('public'));
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
    response.render('index')
}

function createApplication(request, response) {

}

// Development Server Startup
function developmentStartup() {
    console.log('Server is running on port ' + server.address().port);
}