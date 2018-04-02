var mysql      = require('mysql');
var crypto=require('crypto');

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'blogger',
    debug    :  false
});


exports.bienvenida= function(req,res) { 

	pool.getConnection(function(err,connection){

	    if (err) {
	          res.json({"code" : 100, "status" : "Error in connection database"});
	          return;
	    }

		connection.query('SELECT * from contenidos', function(err, rows, fields) {

		  	if (!err){
		    	var json_obj=rows;
				res.contentType('application/json');
				res.json(json_obj);
			}
		  	else console.log('Error while performing Query.');


		});
	});
}

exports.syllabus= function(req,res) { 

	pool.getConnection(function(err,connection){

	    if (err) {
	          res.json({"code" : 100, "status" : "Error in connection database"});
	          return;
	    }

		connection.query('SELECT * from syllabus', function(err, rows, fields) {
		  	if (!err){
		    	var json_obj=rows;
				res.contentType('application/json');
				res.json(json_obj);
			}
		  	else console.log('Error while performing Query.');
		});
	});
}