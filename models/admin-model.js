var db = require('../models/db');

module.exports = {

    getAll: function (usertype,callback) {
        var sql = "select * from userinfo where usertype='" + usertype + "'";

        db.getResults(sql, function (results) {
                console.log(results);
            if (results.length > 0) {
                callback(results);
            } else {
                callback([]);
            }
        });
    },

    getMyInfo: function (loginemail, callback) {

        console.log(loginemail);
        var sql = "select * from user where usermail='" + loginemail + "'";
        db.getResults(sql, function (result) {
            if (result.length > 0) {
                console.log(result);
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