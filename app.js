//DECLARATION
var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var expressSession= require('express-session');
var expressValidator = require('express-validator');
var app = express();

//common controllers
var travelia= require('./controllers/travelia/travelia');// landing page controller
var login= require('./controllers/login/login');
var usertype= require('./controllers/login/usertype');
var registration = require('./controllers/registration/registration');
var logout = require('./controllers/logout/logout');

//for admin controllers starts
var admin= require('./controllers/admin/admin');// landing page controller
// admin controllers ends

//CONFIGARATION
app.set('view engine', 'ejs');


//MIDDLEWARE
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession({secret:'travelia',saveUninitialized: true,resave: false}));
app.use(express.static('public'));//all css js icons etc
app.use('/travelia',travelia); //landing page link
app.use('/login',login);//checks login
app.use('/usertype',usertype);
app.use('/registration',registration);//registration for all 
app.use('/logout',logout);

//admin middleware starts
app.use('/admin',admin);//admin page link

//admin middleware ends

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