var express = require('express');
var db = require('../../models/db');
var router = express.Router();

router.post('/',function(request,response){
    var logininfo = {
        email : request.body.loginemail,
        password : request.body.loginpassword
    };

    var sql = "select * from user ";

});





module.exports=router;