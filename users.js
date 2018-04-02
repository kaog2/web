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

exports.findUser= function(req,res) {   
    // console.log('aqui');
        
        pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }
        if(!req.body.password || !req.body.username) return res.json({"code" : 100, "status" : "Por favor ingrese datos"});
        else{
            var pwd=req.body.password;
            var hashpassword=crypto.createHash('sha512').update(pwd).digest('hex');
            var username=req.body.username;
            var sql='SELECT pass from users WHERE username = ?';
            var values=[[username]];
            console.log('connected as id ' + connection.threadId + "  "+ username + "  " +req.body.password);
            connection.query(sql,[values],function(err,result){

                if(err) console.log(err);
                else if(result.length>0){
                    if(result[0].pass == hashpassword){
                        var sess=req.session;
                        sess.username=username;
                        console.log('redirect');
                        res.send({redirect: '/main'});
                    }
                    else{
                    res.json({"code" : 300, "status" : "Password no coincide"});
                    }
                }
                else{
                    res.json({"code" : 300, "status" : "Usuario No Encontrado"});
                }
            });
            connection.on('error', function(err) {      
                  res.json({"code" : 100, "status" : "Error in connection database"});
                  return;    
            });
            }
        });
}

exports.logout= function(req,res) { 

   // pool.getConnection(function(err,connection){
        console.log('logout22');

            req.session.destroy(function(err){ 

                if(err){ 
                console.log('err'); 
                    console.log(err);  
                    }  
                else  
                {  
                    console.log('err');
                    res.redirect('/');  
                }  
        });

    //});
}

/*exports.findUser= function(req,res) {   
    // console.log('aqui');
        
        pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }

    }
}*/
