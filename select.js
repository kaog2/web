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


exports.posteos= function(req,res) { 

	pool.getConnection(function(err,connection){

	    if (err) {
	          res.json({"code" : 100, "status" : "Error in connection database"});
	          return;
	    }

		connection.query('SELECT * from post', function(err, rows, fields) {

		  	if (!err){
		    	var json_obj=rows;
				res.contentType('application/json');
				res.json(json_obj);
				//console.log(json_obj);
			}
		  	else console.log('Error while performing Query.');

		});
	});
}

exports.obtenerComentarios= function(req,res,idPost) { 

	pool.getConnection(function(err,connection){

	    if (err) {
	          res.json({"code" : 100, "status" : "Error in connection database"});
	          return;
	    }
	    	
	    	var sql='SELECT * from comments WHERE post_id = ?';
            var values=[[idPost]];

	        connection.query(sql,[values],function(err, rows, fields){
            if(err) console.log(err);

            else if(rows.length>0){

                var json_obj=rows;
				res.contentType('application/json');
				res.json(json_obj);
				console.log(json_obj);   
            }
            else{
                res.json({"code" : 1, "status" : "No hay comentarios asociados"});
            }
        });
	});
}

exports.posteosUsuario= function(req,res) { 

	pool.getConnection(function(err,connection){

	    if (err) {
	          res.json({"code" : 100, "status" : "Error in connection database"});
	          return;
	    }
	    	var username = req.session.username;
	    	var sql='SELECT * from post WHERE username = ?';
            var values=[[username]];

            console.log('username ' + " "+ username );

            connection.query(sql,[values],function(err,result){
            	
	            if(err) console.log(err);
	            else if(result.length>0){

	                var json_obj=result;
					res.contentType('application/json');
					res.json(json_obj);
					console.log(json_obj);   
	            }
	            else{
	                res.json({"code" : 300, "status" : "Usuario No Encontrado"});
	            }
        });

	});
}

exports.readPost= function(req,res,idPost) { 

	pool.getConnection(function(err,connection){

	    if (err) {
	          res.json({"code" : 100, "status" : "Error in connection database"});
	          return;
	    }
	    	//var username = req.session.username;
	    	console.log('readPost ' + " "+ idPost );
	    	var sql='SELECT body from post WHERE post_id = ?';
            var values=[[idPost]];

            connection.query(sql,[values],function(err,result){
	            if(err) console.log(err);
	            else if(result.length>0){

	                var json_obj=result;
					res.contentType('application/json');
					res.json(json_obj);
					console.log(json_obj);   
	            }
	            else{
	                res.json({"code" : 300, "status" : "Usuario No Encontrado"});
	            }
        });

	});
}




