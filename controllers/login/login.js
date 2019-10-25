var exprss=require('express');
var router = exprss.Router();
var db=require('../../models/db');

var router= exprss.Router();

router.get('*', function(request, response, next){

	if(request.session.loginemail != null){
		next();
	}else{
		response.redirect('/logout');
	}

});

router.post('/',function(request,response){
    var login={
        email: request.body.email,
        password: request.body.password
    };
    var sql ="select * from user where usermail='"+login.email+"' and password='"+login.password+"'";
    db.getResults(sql, function(results){

        if(results.length > 0){
            request.session.loginemail=login.email;// creates session as loginemail
            response.redirect('/usertype');
            
        }else{
            response.send("invalid login")
        }
    });	
});

module.exports = router;