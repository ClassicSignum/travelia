var express = require('express');
var router = express.Router();

router.get('/', function(request, response){

	//request.session.un = null;
	// response.clearCookie('loginemail');
	request.session.loginemail=null;
	
	response.redirect('/travelia');
});

module.exports=router;