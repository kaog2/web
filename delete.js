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


exports.deleteSyllabus= function(req,res) {
	
	pool.getConnection(function(err,connection){
        
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }else console.log("insert succeful");

		var id=req.body.id;	

		var sql="DELETE from syllabus WHERE id = ?";
		var values=[[id]];
		connection.query(sql,[values],function(err,result){
			if(err){
				console.log(err);	
				res.json({"code" : 300, "status" : "deleted failure"});
			}else{
				console.log("data deleted"+result);
				console.log('deleted ' + result.affectedRows + ' rows');
				res.json({"code" : 300, "status" : "deleted Exitoso"});
			} 
		});
	});

}