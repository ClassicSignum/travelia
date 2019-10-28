var exprss = require('express');
var adminModel = require('../../models/admin-model');
var router = exprss.Router();


// router.get('*', function (request, response, next) {

//     if (request.session.loginemail != null) {
//         next();
//     } else {
//         response.redirect('/logout');
//     }

// });



router.get('/', function (request, response) {
    response.render('admin/index');
});

router.get('/adminAddCust', function (request, response) { //show customerC account page
    response.render('admin/adminAddCust');
});

router.get('/adminProfile', function (request, response) { //show customerC account page
    adminModel.getMyInfo(request.session.loginemail, function (result) {
        response.render('admin/adminProfile', { users: result });
    });
});


router.post('/adminAddCust', function (request, response) { //adding cutomerC account post req
    var reginfo = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
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
        adminModel.insertCustCare(reginfo, function (status) {
            if (status) {
                response.redirect('/admin');
            } else {
                // response.redirect('/user/edit/'+request.params.id);
                response.send("problem inserting");
            }
        });
    }

});

router.post('/adminProfile', function (request, response) {

    var reginfo = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        phoneno: request.body.phoneno,
        address: request.body.address,

    };

    if (reginfo.firstname == "" || reginfo.lastname == "" || reginfo.phoneno == "" || reginfo.address == "") {
        response.send("please fill up all the information");
    }
    else if (reginfo.password != "") {

        if (reginfo.password.length < 7) {
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
            adminModel.update(reginfo, function (status) {
                if (status) {
                    response.redirect('/admin');
                } else {
                    // response.redirect('/user/edit/'+request.params.id);
                    response.send("problem inserting");
                }
            });
        }

    }

    else {
        adminModel.updateNotPassword(reginfo, function (status) {
            if (status) {
                response.redirect('/admin');
            } else {
                // response.redirect('/user/edit/'+request.params.id);
                response.send("problem inserting");
            }
        });
    }


});


router.get('/adminCustCare', function (request, response) { //show customerC account page
    adminModel.getAll("customercare", function (result) {
        response.render('admin/adminCustCare', { users: result });
    });
});
router.get('/adminTraveller', function (request, response) { //show traveller account page
    adminModel.getAll("Traveller", function (result) {
        response.render('admin/adminTraveller', { users: result });
    });
});
router.get('/adminHotelEmp', function (request, response) { //show customerC account page
    adminModel.getAll("Hotel Emp", function (result) {
        response.render('admin/adminCustCare', { users: result });
    });
});
router.get('/adminTravelGuide', function (request, response) { //show traveller account page
    adminModel.getAll("Travel guider", function (result) {
        response.render('admin/adminTraveller', { users: result });
    });
});


router.get('/adminHotelinfo', function (request, response) { //show traveller account page
    adminModel.getAllHotel(function (result) {
        response.render('admin/adminHotelinfo', { hotel: result });
    });
});

router.get('/adminTravelPlace', function (request, response) { //show traveller account page
    adminModel.getAllTravelPlace(function (result) {
        response.render('admin/adminTravelPlace', { travelplace: result });
    });
});



router.post('/adminCustCare',function(request,response){
    if(request.body.submit=="permitted"){
      
        adminModel.permitOrRestrict("restricted",request.body.email,function(status){
            if(status){
                response.redirect('/admin');
            }
            else{
                response.send("problem ");
            }
        });
    }
    else if(request.body.submit=="restricted"){
    
        adminModel.permitOrRestrict("permitted",request.body.email,function(status){
            if(status){
                response.redirect('/admin');
            }
            else{
                response.send("problem ");
            }
        });
    }
    else{
        adminModel.deleteAccount(request.body.email,function(status){
            if(status){
                response.redirect('/admin');
            }
            else{
                response.send("problem ");
            }
        });
    }
});


router.post('/adminTraveller',function(request,response){
    if(request.body.submit=="permitted"){
      
        adminModel.permitOrRestrict("restricted",request.body.email,function(status){
            if(status){
                response.redirect('/admin');
            }
            else{
                response.send("problem ");
            }
        });
    }
    else if(request.body.submit=="restricted"){
    
        adminModel.permitOrRestrict("permitted",request.body.email,function(status){
            if(status){
                response.redirect('/admin');
            }
            else{
                response.send("problem ");
            }
        });
    }
    else{
        adminModel.deleteAccount(request.body.email,function(status){
            if(status){
                response.redirect('/admin');
            }
            else{
                response.send("problem ");
            }
        });
    }
});


router.post('/adminHotelEmp',function(request,response){
    if(request.body.submit=="permitted"){
      
        adminModel.permitOrRestrict("restricted",request.body.email,function(status){
            if(status){
                response.redirect('/admin');
            }
            else{
                response.send("problem ");
            }
        });
    }
    else if(request.body.submit=="restricted"){
    
        adminModel.permitOrRestrict("permitted",request.body.email,function(status){
            if(status){
                response.redirect('/admin');
            }
            else{
                response.send("problem ");
            }
        });
    }
    else{
        adminModel.deleteAccount(request.body.email,function(status){
            if(status){
                response.redirect('/admin');
            }
            else{
                response.send("problem ");
            }
        });
    }
});


router.post('/adminTravelGuide',function(request,response){
    if(request.body.submit=="permitted"){
      
        adminModel.permitOrRestrict("restricted",request.body.email,function(status){
            if(status){
                response.redirect('/admin');
            }
            else{
                response.send("problem ");
            }
        });
    }
    else if(request.body.submit=="restricted"){
    
        adminModel.permitOrRestrict("permitted",request.body.email,function(status){
            if(status){
                response.redirect('/admin');
            }
            else{
                response.send("problem ");
            }
        });
    }
    else{
        adminModel.deleteAccount(request.body.email,function(status){
            if(status){
                response.redirect('/admin');
            }
            else{
                response.send("problem ");
            }
        });
    }
});

router.post('/adminHotelinfo',function(request,response){
    if(request.body.submit=="permitted"){
      
        adminModel.permitOrRestrictHotel("restricted",request.body.hotelname,function(status){
            if(status){
                response.redirect('/admin');
            }
            else{
                response.send("problem ");
            }
        });
    }
    else if(request.body.submit=="restricted"){
    
        adminModel.permitOrRestrictHotel("permitted",request.body.hotelname,function(status){
            if(status){
                response.redirect('/admin');
            }
            else{
                response.send("problem ");
            }
        });
    }
    else{
        adminModel.deleteHotel(request.body.hotelname,function(status){
            if(status){
                response.redirect('/admin');
            }
            else{
                response.send("problem ");
            }
        });
    }
});


router.post('/adminTravelPlace',function(request,response){
    if(request.body.submit=="Pictures"){
        
        
        response.render('admin/adminTravelPlacePic', { travelplace: request.body.travelplace });
    }
    
    else{
        adminModel.deleteTravelPlace(request.body.travelplace,function(status){
            if(status){
                response.redirect('/admin');
            }
            else{
                response.send("problem ");
            }
        });
    }
});


module.exports = router;