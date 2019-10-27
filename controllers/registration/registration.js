var express = require('express');
var db = require('../../models/db');
var router = express.Router();




router.post('/',function(request,response){
    var reginfo = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        usertype: request.body.usertype,
        phoneno: request.body.phoneno,
        address: request.body.address,
        password: request.body.password,
        confirmpassword: request.body.confirmpassword
    };

    if (reginfo.firstname == "" || reginfo.lastname == "" || reginfo.email == "" || reginfo.phoneno == "" || reginfo.address == "" || reginfo.password == "" || reginfo.confirmpassword == "") {
        response.send("please fill up all the information");
    }
    else if (reginfo.password.length < 7) {
        response.send("at leats 6 characters and one number");
    }
    else if (!reginfo.password.match(/[a-z]/)) {
        response.send("at leats 6 characters and one number");

    }
    else if (!reginfo.password.match(/\d+/)) {
        response.send("at leats 6 characters and one number");

    }
    else if (reginfo.password != reginfo.confirmpassword) {
        response.send(" Retype password");
    }
    else {
        var sql = "insert into userinfo values('','" + reginfo.firstname + "', '" + reginfo.lastname + "', '" + reginfo.email + "', '" + reginfo.password + "', '"+reginfo.usertype+"', '" + reginfo.address + "', '" + reginfo.phoneno + "','permitted')";
        db.execute(sql, function (status) {
            var sql = "insert into user values('','" + reginfo.email + "','" + reginfo.password + "','"+reginfo.usertype+"')";
            db.execute(sql, function (status) {
                if(status){
                  
                    response.redirect('/travelia');
                }
                else{

                    response.send("problem");

                }
            });
        });
    }


});





module.exports=router;