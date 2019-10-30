var db=require('../models/db');

module.exports = {
    getAll:function(callback){
        var sql="SELECT COUNT( * ) FROM user WHERE `usertype`='Traveller'";
        db.getResults(sql,function(results){
            var s=results[0].count;
            console.log(s);
        });
    }
}