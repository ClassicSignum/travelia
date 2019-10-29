var mysql = require('mysql');

var getConnection = function(callback){
	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'travelia'
	});
	 
	connection.connect(function(err) {
		  if (err) {
		    console.error('error connecting: ' + err.stack);
		    return;
		  }
	 
	  console.log('connected as id ' + connection.threadId);
	});
	callback(connection);
}

module.exports = {

	getResults : function(sql, callback){
		getConnection(function (connection){
			connection.query(sql, function (error, results) {
				callback(results);
				console.log(error);
			});
			connection.end(function(err){
				console.log('connection end...');
			});	
		});
	},
	execute : function(sql, callback){
		getConnection(function (connection){
			connection.query(sql, function (error, results) {
				
				if(error){
					callback(false);
					console.log(error);
				}else{
					callback(true);
				}
			});
			connection.end(function(err){
				console.log('connection end...');
			});	
		});
	}
}