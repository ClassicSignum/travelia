//DECLARATION
var express = require('express');
var ejs = require('ejs');
var app = express();
var travelia= require('./controllers/travelia/travelia');// landing page controller
var admin= require('./controllers/admin/admin');// landing page controller
//CONFIGARATION
app.set('view engine', 'ejs');


//MIDDLEWARE
app.use('/travelia',travelia); //landing page link
app.use('/admin',admin);//admin page link
app.use(express.static('public'));//all css js icons etc


//ROUTER
app.get('/travelia', function(request, response){
	response.redirect('./controllers/travelia/travelia.js');
});
app.get('/admin', function(request, response){
	response.redirect('./controllers/admin/admin.js');
});

//SERVER STARTUP
app.listen(3000, function(){
	console.log('server started at 3000...');
});