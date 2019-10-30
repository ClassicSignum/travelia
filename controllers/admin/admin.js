var exprss = require('express');
var db = require('../../models/db');
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
    adminModel.getAllUsertype(function(result){
        
      
        response.render('admin/index',{users:result});
    });
});

//ADMIN ADD CUST STARTS
router.get('/adminAddCust', function (request, response) { //show customerC account page
    response.render('admin/adminAddCust');
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

//ADMIN ADD CUST ENDS

//ADMIN PROFILE STARTS
router.get('/adminProfile', function (request, response) { //show customerC account page
    adminModel.getMyInfo(request.session.loginemail, function (result) {
        response.render('admin/adminProfile', { users: result });
    });
});


router.post('/adminProfile', function (request, response) {

    var reginfo = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        phoneno: request.body.phoneno,
        address: request.body.address,
        password: request.body.createpassword,
        confirmpassword: request.body.confirmpassword
        

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

//ADMIN PROFILE ENDS

//ADMIN CUST AUDIT STARTS
router.get('/adminCustAudit', function (request, response) { //show customerC account page
    adminModel.getAllAudits(function (result) {
        response.render('admin/adminCustAudit', { audits: result });
    });
});

router.post('/adminCustAudit', function (request, response) {
    if (request.body.submit == "submit") {//adding new customer care
       
        var info = {
            email: request.body.email,
            salary: request.body.salary
        };
        adminModel.insertCustCareAudit(info, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("prob");
            }
        });
    }
    else if(request.body.submit == "update"){ // updating salary
        
        var info = {
            email: request.body.email,
            salary: request.body.newsalary
        };
        adminModel.updateCustCareSalary(info,function(status){
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("prob");
            }
        });

        
    }
    else if(request.body.submit=="delete entry"){
        var sql="delete from customercaresalary  where custcaremail='"+request.body.email+"'";

        db.execute(sql,function(status){
            if(status){
                response.redirect('/admin');
            }
            else{
                
            }
        });

    }
    else{

        var email=request.body.email;
        request.session.custcaremail=email;
        response.redirect('/admin/adminCustSalarySheet');
        
        // response.render('admin/adminCustSalarySheet');

    }


});



//ADMIN CUST AUDIT ENDS

//ADMIN CUST SALARY SHEET STARTS

router.get('/adminCustSalarySheet',function(request,response){
    adminModel.getSalarySheet(request.session.custcaremail,function(result){
        response.render('admin/adminCustSalarySheet',{audits:result});
    });
});

router.post('/adminCustSalarySheet',function(request,response){


    var info ={
        email:request.body.email,
        paidmonth:request.body.month,
        paidamount:request.body.amount
    };

    if(request.body.submit=="submit"){

        adminModel.insertSalarySheet(info,function(status){
            if(status){
                    response.redirect('/admin/adminCustSalarySheet');
            }
            else{
                response.send("prob");
            }
        });
    }
    else{

        var sql="delete from salarysheet  where custcaremail='"+info.email+"' and paidmonth='"+info.paidmonth+"'";
            // console.log(info.loginemail);
            db.execute(sql,function(status){
                response.redirect('/admin');
            });
    }


    
});
//ADMIN CUST SALARY SHEET ENDS


//ADMIN SERVICE CHARGE STARTS
router.get('/adminServiceCharge',function(request,response){
    adminModel.getServiceCharge(function(result){
        response.render('admin/adminServiceCharge',{service:result});
    });
});

router.post('/adminServiceCharge',function(request,response){
    var info = {
        email: request.body.email,
        month:request.body.month,
        amount:request.body.amount
    };
    if(request.body.submit=="submit"){

        adminModel.insertServiceCharge(info,function(status){
            if(status){
                response.redirect('/admin');
            }   
            else{
                response.send('prob');
            }
        });
    }
    else{
        var sql="delete from servicecharge where usermail='"+info.email+"' and paidmonth='"+info.month+"'";
       
        db.execute(sql,function(status){
            if(status){
                response.redirect('/admin/adminServiceCharge');
            }
            else{
                response.send("prob");
            }
        });
    }
}); 




//ADMIN SERVICE CHARGE ENDS



//ADMIN CUST CARE STARTS

router.get('/adminCustCare', function (request, response) { //show customerC account page
    adminModel.getAll("customercare", function (result) {
        response.render('admin/adminCustCare', { users: result });
    });
});

router.post('/adminCustCare', function (request, response) {
    if (request.body.submit == "permitted") {

        adminModel.permitOrRestrict("restricted", request.body.email, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
    else if (request.body.submit == "restricted") {

        adminModel.permitOrRestrict("permitted", request.body.email, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
    else {
        adminModel.deleteAccount(request.body.email, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
});

//ADMIN CUST CARE ENDS

//ADMIN TRAVELLER STARTS

router.get('/adminTraveller', function (request, response) { //show traveller account page
    adminModel.getAll("Traveller", function (result) {
        response.render('admin/adminTraveller', { users: result });
    });
});
router.post('/adminTraveller', function (request, response) {
    if (request.body.submit == "permitted") {

        adminModel.permitOrRestrict("restricted", request.body.email, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
    else if (request.body.submit == "restricted") {

        adminModel.permitOrRestrict("permitted", request.body.email, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
    else {
        adminModel.deleteAccount(request.body.email, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
});


//ADMIN TRAVELLER ENDS

//ADMIN HOTEL EMP STARTS

router.get('/adminHotelEmp', function (request, response) { //show customerC account page
    adminModel.getAll("Hotel Emp", function (result) {
        response.render('admin/adminCustCare', { users: result });
    });
});

router.post('/adminHotelEmp', function (request, response) {
    if (request.body.submit == "permitted") {

        adminModel.permitOrRestrict("restricted", request.body.email, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
    else if (request.body.submit == "restricted") {

        adminModel.permitOrRestrict("permitted", request.body.email, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
    else {
        adminModel.deleteAccount(request.body.email, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
});


//ADMIN HOTEL EMP ENDS

// ADMIN TRAVEL GUIDE STARTS
router.get('/adminTravelGuide', function (request, response) { //show traveller account page
    adminModel.getAll("Travel guider", function (result) {
        response.render('admin/adminTraveller', { users: result });
    });
});

router.post('/adminTravelGuide', function (request, response) {
    if (request.body.submit == "permitted") {

        adminModel.permitOrRestrict("restricted", request.body.email, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
    else if (request.body.submit == "restricted") {

        adminModel.permitOrRestrict("permitted", request.body.email, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
    else {
        adminModel.deleteAccount(request.body.email, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
});

// ADMIN TRAVEL GUIDE ENDS

//ADMIN HOTEL INFO STARTS
router.get('/adminHotelinfo', function (request, response) { //show traveller account page
    adminModel.getAllHotel(function (result) {
        response.render('admin/adminHotelinfo', { hotel: result });
    });
});

router.post('/adminHotelinfo', function (request, response) {
    if (request.body.submit == "permitted") {

        adminModel.permitOrRestrictHotel("restricted", request.body.hotelname, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
    else if (request.body.submit == "restricted") {

        adminModel.permitOrRestrictHotel("permitted", request.body.hotelname, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
    else {
        adminModel.deleteHotel(request.body.hotelname, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
});


//ADMIN HOTEL INFO ENDS



//ADMIN TRAVEL PLACE STARTS
router.get('/adminTravelPlace', function (request, response) { //show traveller account page
    adminModel.getAllTravelPlace(function (result) {
        response.render('admin/adminTravelPlace', { travelplace: result });
    });
});

router.post('/adminTravelPlace', function (request, response) {
    if (request.body.submit == "Pictures") {


        response.render('admin/adminTravelPlacePic', { travelplace: request.body.travelplace });
    }

    else {
        adminModel.deleteTravelPlace(request.body.travelplace, function (status) {
            if (status) {
                response.redirect('/admin');
            }
            else {
                response.send("problem ");
            }
        });
    }
});


//ADMIN TRAVEL PLACE ENDS








module.exports = router;