//DECLARATION
var express = require('express');
var ejs = require('ejs');
var app = express();
var travelia= require('./controllers/travelia/travelia');
//CONFIGARATION
app.set('view engine', 'ejs');


//MIDDLEWARE
app.use('/travelia',travelia);
app.use(express.static('public'));


//ROUTER
app.get('/travelia', function(request, response){
	response.redirect('./controllers/travelia/travelia.js');
});

//SERVER STARTUP
app.listen(3000, function(){
	console.log('server started at 3000...');
});