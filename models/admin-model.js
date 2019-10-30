var db = require('../models/db');

module.exports = {

    

    getAllUsertype:function(callback){
        var sql="SELECT COUNT( * ) as 'travellers' FROM user WHERE `usertype`='Traveller'";
        db.getResults(sql,function(results){
            var travellers=results[0].travellers;
            var sql="SELECT COUNT( * ) as 'guiders' FROM user WHERE `usertype`='Travel guider'";
            db.getResults(sql,function(results){
                var guiders=results[0].guiders;
                var sql="SELECT COUNT( * ) as 'hotelemps' FROM user WHERE `usertype`='Hotel Emp'";
                db.getResults(sql,function(results){
                    var hotelemps=results[0].hotelemps;
                    var sql="SELECT COUNT( * ) as 'customercare' FROM user WHERE `usertype`='customercare'";
                    db.getResults(sql,function(results){
                    var customercare=results[0].customercare;
                    var sql="SELECT COUNT(*) as 'count', `division` FROM travelplace GROUP BY `division`;";
                    db.getResults(sql,function(results){
                        var dhaka,rajshahi,barishal,khulna,sylhet,chittagong;

                        for(var i=0;i<results.length;i++){
                            if(results[i].division=="sylhet"){
                                 sylhet=results[i].count;
                            }
                            else if(results[i].division=="chittagong"){
                                 chittagong=results[i].count;
                            }
                            else if(results[i].division=="dhaka"){
                                 dhaka=results[i].count;
                            }
                            else if(results[i].division=="rajshahi"){
                                 rajshahi=results[i].count;
                            }
                            else if(results[i].division=="khulna"){
                                 khulna=results[i].count;
                            }
                            else {
                                 barishal=results[i].count;
                            }

                        }
                        var users = {
                            Traveller:travellers,
                            Guider:guiders,
                            HotelEmp:hotelemps,
                            CustomerCare:customercare,
                            Sylhet:sylhet,
                            Chittagong:chittagong,
                            Dhaka:dhaka,
                            Rajshahi:rajshahi,
                            Khulna:khulna,
                            Barishal:barishal
                        }
                        callback(users);

                    });
                       
                        
                });
                
                });

            });
        });
    },


    // TRAVEL PLACE STARTS
    getAllTravelPlace: function (callback) {
        var sql = "select * from travelplace";

        db.getResults(sql, function (results) {
               
            if (results.length > 0) {
                callback(results);
            } else {
                callback([]);
            }
        });
    },

    deleteTravelPlace:function(name,callback){ //inner join used to delete from multiple table...
        var sql="delete from travelplace  where travelplace='"+name+"'";

        db.execute(sql,function(status){
            callback(status);
        });
    },



    // HOTEL SECTION STARTS
    deleteHotel:function(name,callback){ //inner join used to delete from multiple table...
        var sql="delete from hotelinfo  where hotelname='"+name+"'";

        db.execute(sql,function(status){
            callback(status);
        });
    },
    getAllHotel: function (callback) {
        var sql = "select * from hotelinfo";

        db.getResults(sql, function (results) {
               
            if (results.length > 0) {
                callback(results);
            } else {
                callback([]);
            }
        });
    },


    

    permitOrRestrictHotel:function(action,name,callback){

        var sql="update hotelinfo set status='"+action+"' where hotelname='"+name+"'";

        db.execute(sql, function (status) {
            callback(status);
        });

    },

    // USERS SECTION STARTS
    permitOrRestrict:function(action,email,callback){

        var sql="update userinfo set status='"+action+"' where usermail='"+email+"'";

        db.execute(sql, function (status) {
            callback(status);
        });

    },

    getAll: function (usertype,callback) {
        var sql = "select * from userinfo where usertype='" + usertype + "'";

        db.getResults(sql, function (results) {
               
            if (results.length > 0) {
                callback(results);
            } else {
                callback([]);
            }
        });
    },
    deleteAccount:function(email,callback){ //inner join used to delete from multiple table...
        var sql="delete user,userinfo from user inner join userinfo on userinfo.usermail=user.usermail where user.usermail='"+email+"'";

        db.execute(sql,function(status){
            callback(status);
        });
    },



    

    

    // ADMIN INFO STARTS
    update: function (user, callback) {
        var sql = "update userinfo set firstname='" + user.firstname + "',lastname='" + user.lastname + "', password='" + user.password + "',address='" + user.address + "',phoneno='" + user.phoneno + "' where usermail='" + user.email+"'";



        db.execute(sql, function (status) {
            callback(status);
        });
    },

    updateNotPassword: function (user, callback) {
        var sql = "update userinfo set firstname='" + user.firstname + "',lastname='" + user.lastname + "',address='" + user.address + "',phoneno='" + user.phoneno + "' where usermail='"+user.email+"'";


        db.execute(sql, function (status) {
            callback(status);
        });
    },
    getMyInfo: function (loginemail, callback) {

        console.log(loginemail);
        var sql = "select * from userinfo where usermail='" + loginemail + "'";
        db.getResults(sql, function (result) {
            if (result.length > 0) {
                // console.log(result);
                callback(result);
            } else {
                callback([]);
            }
        });
    },

    

    //CUSTOMER CRE SALARY SHEET STARTS
    insertSalarySheet: function (info, callback) {
        var sql = "insert into salarysheet values('','" + info.email + "','"+info.paidamount+"', '" + info.paidmonth + "')";
        db.execute(sql, function (status) {
           
                callback(status);
    
        });
    },



    getSalarySheet:function(email,callback){

        var sql="select * from salarysheet  where custcaremail='"+email+"'";
        db.getResults(sql,function(results){
            if(results.length>0){
                callback(results);
            }
            else{
                callback([]);

            }
        });

    },
    // NEW CUSTOMER CARE
    insertCustCare: function (reginfo, callback) {
        var sql = "insert into userinfo values('','" + reginfo.firstname + "', '" + reginfo.lastname + "', '" + reginfo.email + "', '" + reginfo.password + "', 'customercare', '" + reginfo.address + "', '" + reginfo.phoneno + "','permitted')";
        db.execute(sql, function (status) {
            var sql = "insert into user values('','" + reginfo.email + "','" + reginfo.password + "','customercare')";
            db.execute(sql, function (status) {
                callback(status);
            });
        });
    },


    //CUSTOMER CARE AUDIT  STARTS
    getAllAudits: function (callback) {
        var sql = "select * from customercaresalary";

        db.getResults(sql, function (results) {
               
            if (results.length > 0) {
                callback(results);
            } else {
                callback([]);
            }
        });
    },
    insertCustCareAudit: function (info, callback) {
        var sql = "insert into customercaresalary values('','" + info.email + "','', '" + info.salary + "')";
        db.execute(sql, function (status) {
           
                callback(status);
    
        });
    },
    updateCustCareSalary: function (info, callback) {

        var prevsalary;

        var sql = "select currentsalary from customercaresalary where custcaremail='"+info.email+"'";
       
        db.getResults(sql, function (result) {
            if (result.length > 0) {
                
                prevsalary=result[0].currentsalary;
                  var sql = "update customercaresalary set previoussalary='" + prevsalary + "',currentsalary='" + info.salary + "' where custcaremail= '"+info.email+"' ";
                
        db.execute(sql, function (status) {
            console.log(status);
            callback(status);
        });
                
            } else {
                // callback([]);
            }
        });
        
        
    },

    //SERVICE CHARGE STARTS
    insertServiceCharge:function(info,callback){

        var sql="insert into servicecharge values('','"+info.email+"','"+info.month+"','"+info.amount+"')";
        db.execute(sql,function(status){
            
                callback(status);
            
        });
    },
    getServiceCharge:function(callback){
        var sql="select * from servicecharge";
        db.getResults(sql,function(results){
            if(results.length>0){
                callback(results);
            }
            else{
                callback([]);
            }
        });
    }
}