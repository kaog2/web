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


exports.updateSyllabus= function(req,res) {
	
	pool.getConnection(function(err,connection){
        
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }else console.log("insert succeful");

		var id=req.body.id;
		var nombre=req.body.nombre;
		var descripcion=req.body.descripcion;
		var fecha=req.body.fecha;	

		var sql="UPDATE syllabus SET nombre = ? WHERE id = ?";
		
		var values=[[nombre],[id]];
		connection.query(sql,values,function(err,result){
			if(err){
				console.log(err);	
				res.json({"code" : 300, "status" : "update failure"});
			}else{
				console.log("data update"+result);
				console.log('update ' + result.affectedRows + ' rows');
				res.json({"code" : 300, "status" : "update Exitoso"});
			} 
		});
	});

}