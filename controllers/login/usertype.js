var exprss=require('express');
var router = exprss.Router();
var db=require('../../models/db');

var router= exprss.Router();

router.get('/',function(request,response){
    var sql="select usertype from user where usermail='"+request.session.loginemail+"'";
    db.getResults(sql,function(results){
        if(results.length > 0){
            
            if(results[0].usertype=="admin"){
                response.redirect('/admin');
               	
                
            }
            
        }else{
            response.send('invalid username/password');		
        }
    });
});

module.exports = router;