var db = require('../models/db');

module.exports = {

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

    deleteHotel:function(name,callback){ //inner join used to delete from multiple table...
        var sql="delete from hotelinfo  where hotelname='"+name+"'";

        db.execute(sql,function(status){
            callback(status);
        });
    },


    deleteAccount:function(email,callback){ //inner join used to delete from multiple table...
        var sql="delete user,userinfo from user inner join userinfo on userinfo.usermail=user.usermail where user.usermail='"+email+"'";

        db.execute(sql,function(status){
            callback(status);
        });
    },

    permitOrRestrictHotel:function(action,name,callback){

        var sql="update hotelinfo set status='"+action+"' where hotelname='"+name+"'";

        db.execute(sql, function (status) {
            callback(status);
        });

    },


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



    getMyInfo: function (loginemail, callback) {

        // console.log(loginemail);
        var sql = "select * from user where usermail='" + loginemail + "'";
        db.getResults(sql, function (result) {
            if (result.length > 0) {
                // console.log(result);
                callback(result);
            } else {
                callback([]);
            }
        });
    },

    updateNotPassword: function (user, callback) {
        var sql = "update userinfo set firstname='" + user.firstname + "',lastname='" + user.lastname + "',address='" + user.address + "',phoneno='" + user.phoneno + "' where usermail=" + user.email;


        db.execute(sql, function (status) {
            callback(status);
        });
    },

    update: function (user, callback) {
        var sql = "update userinfo set firstname='" + user.firstname + "',lastname='" + user.lastname + "', password='" + user.password + "',address='" + user.address + "',phoneno='" + user.phoneno + "' where usermail=" + user.email;



        db.execute(sql, function (status) {
            callback(status);
        });
    },

    insertCustCare: function (reginfo, callback) {
        var sql = "insert into userinfo values('','" + reginfo.firstname + "', '" + reginfo.lastname + "', '" + reginfo.email + "', '" + reginfo.password + "', 'customercare', '" + reginfo.address + "', '" + reginfo.phoneno + "','permitted')";
        db.execute(sql, function (status) {
            var sql = "insert into user values('','" + reginfo.email + "','" + reginfo.password + "','customercare')";
            db.execute(sql, function (status) {
                callback(status);
            });
        });
    }
}