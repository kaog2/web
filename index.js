var express=require('express')
var app=express();
var PORT=3000;
var us = require('./users');
var select = require('./select');
var cu = require('./create_user');
var insert = require('./insert');
var de = require('./delete');
var update = require('./update');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var session = require('express-session');


var idPost='';
var app = express();
app.use( express.static('public')); 
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

var auth = function(req, res, next) {
  if (req.session && req.session.username)
    return next();
  else
    return res.sendStatus(401);
};

//OJO CON EL auth ñ.. se hace primero funcion auth .. si cumple entonces next() with function(req,res)
app.get('/main',auth,function(req,res){
    console.log('main');
    console.log('username' + " " +req.session.username);
    if (req.session.username) res.redirect('mein_blog.html');
});

/*************************************/

/**************Publicar*****************/


app.post('/posteo',urlencodedParser,function(req,res){
      console.log('posteo');
     insert.insertPosteo(req,res);
});

/**************FIN_PUBLICAR*****************/


/**************Hacer login******************/
app.post('/login',urlencodedParser,function(req,res){
     console.log('login');
     us.findUser(req,res);
});



/**************RE-DIRECCIONAMIENTOS*************************/
/******************HOOME**************/
app.get("/home", function(req,res){
    console.log('home');
    console.log('username' + " " +req.session.username);
    res.send({redirect: '/toHome'});
});

app.get('/toHome', urlencodedParser ,function (req, res) {
  console.log('toHome');
  res.redirect('mein_blog.html');
});

// LOGOUT
app.post('/logout', function (req, res) {
  req.session.destroy();
  console.log('logout');
  res.send({redirect: '/tologout'});
});

app.get('/tologout', function (req, res) {
  console.log('tologout');
  res.redirect('/');
});
////VISTA BLOG DE USUARIO
app.get('/miBlog', function (req, res) {
  console.log('miBlog');
  res.send({redirect: '/toMiBlog'});
});

app.get('/toMiBlog', function (req, res) {
  console.log('toMiBlog');
  res.redirect('/miBlog_user.html');
});
//VISTA UN BLOG PARA PUBLICAR
app.post("/read", urlencodedParser,function(req,res){
    idPost =req.body.post_id;
    console.log("read"+'post_id' + " " +req.body.post_id+" "+"idPost"+" "+ idPost);
    res.send({redirect: '/toRead'});
});

app.get('/toRead',urlencodedParser,function(req,res){
    console.log('toRead'+" "+"idPost"+" "+ idPost+" "+"idPost"+" "+ idPost);
    res.redirect('showPost.html');
});

//VISTA pUBLICAR
app.post("/publicar", function(req,res){
    console.log('publicar');
    console.log('username' + " " +req.session.username);
    res.send({redirect: '/toPublicar'});
});

app.get('/toPublicar', function (req, res) {
  console.log('toPublicar');
  res.redirect('post.html');
});
//VISta REGISSTRO DE USUAIRO
app.post('/register',urlencodedParser,function(req,res){
    console.log('register');
    res.send({redirect: '/RedRegister'});
});

app.get('/RedRegister',urlencodedParser,function(req,res){
    console.log('getRegister');
    res.redirect('register.html');
});

/**************FIN RE-DIRECCIONAMIENTOS*************************/

/******************************************/
/************obtener sesion********/

app.get('/sesion',urlencodedParser,function(req,res){
    console.log('sesion username' + " " +req.session.username);
    res.json(req.session.username);
});


/***********************************/

/*********Registro de usuario*******************/


// ingresar usuario a DB

app.post('/createUser',urlencodedParser,function(req,res){
     cu.createUser(req,res);
     console.log('createUser');
});

app.get('/blog1',urlencodedParser,function(req,res){
     console.log('blog1');
     res.redirect('/');
});
/**************************************************/

/************************Obterner post************************/

app.get('/obtenerPosteos',urlencodedParser,function(req,res){
    console.log('obtenerPosteos');
     select.posteos(req,res);
});

app.get('/obtenerPosteosUsuario',urlencodedParser,function(req,res){
    console.log('obtenerPosteosUsuario');
     select.posteosUsuario(req,res);
});

/************************obtenerComentarios*********************/

app.get('/obtenerComentarios',urlencodedParser,function(req,res){
    console.log('obtenerComentarios');
    console.log("obtenerComentarios idPost"+" "+ idPost);
    select.obtenerComentarios(req,res,idPost);
});

/***********Ver post especifico************************/
app.get("/loadRead", urlencodedParser,function(req,res){
    console.log('read');
    console.log("idPost"+" "+ idPost);
    select.readPost(req,res,idPost);
});

/*******INGRESAR COMENTARIO***************************/

app.post('/comentar',urlencodedParser,function(req,res){
     console.log('comentar');
     insert.insertComentario(req,res,idPost);
});


/*app.get('/toRead',urlencodedParser,function(req,res){
    console.log('toRead');
     select.posteosUsuario(req,res);
});*/



/************************************/

/***********FIN OBTENER POST********************************/


app.post('/delete',urlencodedParser,function(req,res){
     de.deleteSyllabus(req,res);
});

app.post('/update',urlencodedParser,function(req,res){
     update.updateSyllabus(req,res);
});

app.listen(PORT,function(){
    console.log('Ejemplo Programacion Web ICI 526');
});