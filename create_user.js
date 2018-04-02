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


exports.createUser= function(req,res) {
	
	pool.getConnection(function(err,connection){
        
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }else console.log("User add");

		var firstname=req.body.firstname;
		var lastname=req.body.lastname;
		var username=req.body.username;
		var nick=req.body.username+"@myblog.de";
		var password=req.body.password;
		var email=req.body.email;
		var birthdate=req.body.birthdate;
		var nationality=req.body.nationality;
		var permission="";

		var salt=Math.round((new Date().valueOf()*Math.random()))+'';
		var hashpassword=crypto.createHash('sha512').update(password).digest('hex');
		//ingresar usuario
		var sql='INSERT INTO users (firstname,lastname,username,nick,pass,email,birthdate,nationality,permission) VALUES ?';
		var values=[[firstname,lastname,username,nick,hashpassword,email,birthdate,nationality,permission]];
		connection.query(sql,[values],function(err,result){
			if(err){
				console.log(err);	
			}else{
				console.log(result);
				//ingresar el blog
				var sql='INSERT INTO blog (username)  VALUES ?';
				var values=[[username]];
				connection.query(sql,[values],function(err,result){
					if(err){
						console.log(err);	
					}else{
						console.log(result);
					} 
				});
				console.log('redirect');
                res.send({redirect: '/blog1'});
			}//fin else 
				
		});

	});

}
