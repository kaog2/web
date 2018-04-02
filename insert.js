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


exports.insertPosteo= function(req,res) {
	
	pool.getConnection(function(err,connection){
        
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }else console.log("insert succeful");

        	var username = req.session.username;
            var sql='SELECT * from blog WHERE username = ?';
            var values=username;

            console.log('Buscar blog de:'+ "  "+ username);

            connection.query(sql,[values],function(err,result){

                if(err) console.log(err);
                else if(result.length>0){

                    var blog_id = result[0].blog_id;
                    var post_id = "postid";
                    //var blog_id = req.body.username;
                    var title = req.body.title;
                    var body = req.body.body;
                    var photo = req.body.photo;
                    var f = new Date();
                    post_date = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
                    var username = req.session.username;
                    console.log(blog_id,post_id,title,body,photo,post_date,username);

                    var sql='INSERT INTO post (post_id,blog_id,title,body,photo,post_date,username)  VALUES ?';
                    var values=[[post_id,blog_id,title,body,photo,post_date,username]];
                    connection.query(sql,[values],function(err,result){
                        if(err){
                            console.log(err);   
                            res.json({"code" : 300, "status" : "ingreso Fallido"});
                        }else{ 
                            console.log("datos ingresados"+result);
                            console.log('insert ' + result.affectedRows + ' rows');
                            //res.json({"code" : 300, "status" : "ingreso Exitoso"});
                            res.send({redirect: '/toHome'});
                            
                        }
                    });

                    //res.send({redirect: '/home'});
                }
                else{
                    res.json({"code" : 300, "status" : "Blog no encontrado"});
                }
            });
	});

}

exports.insertComentario=function(req,res,idPost) {
    
    pool.getConnection(function(err,connection){
        
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }else 

        var body=req.body.texto;
        var comment_id="";
        var f = new Date();
        var com_date = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
        var post_id= idPost;
        console.log("idPost" + idPost);
        var username=req.session.username;

        //ingresar usuario
        var sql='INSERT INTO comments (body,comment_id,com_date,post_id,username) VALUES ?';
        var values=[[body,comment_id,com_date,post_id,username]];
        connection.query(sql,[values],function(err,result){
            if(err){
                console.log(err);   
            }else{
                console.log(result);

                console.log('redirect desde showPost');
                res.send({redirect: '/showPost.html'});
            }//fin else 
                
        });

    });

}