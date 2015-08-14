var express = require('express'),
	app = express(),
    server = app.listen(3000, developmentStartup);

var fs = require('fs');


// Express Setup
app.use(express.static('.'));
app.set('views', './views');
app.set('view engine', 'jade');

// Routes
app.get('/', home);
app.get('/applications/new', home);
app.get('/applications/:id', statusCheck);
app.get('/applications', admin);
app.post('/applications', submitApplication);

function home(request, response) {
    response.render('index', { fruits : ['banana', 'grapefruit', 'grapes'] } );
}

function statusCheck(request, response) {
	response.send('now viewing application: ' + request.params.id);
}

function admin(request, response) {
    response.render('applications')
}

function submitApplication(request, response) {

}

// Development Server Startup
function developmentStartup() {
    console.log('Server is running on port ' + server.address().port);
}