
/**
 * Modulos dependentes
 */

var express = require('express')
  , routes = require('./routes')
  , childProcess = require('child_process')
  , fs = require('fs');

var app = module.exports = express.createServer();

// Configuraçãocd projeto

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Transferência de dados

app.get('/', function(req, res) {
res.render('index',{title: 'XML2BIB', teste: ''})
});

app.post('/',function(req,res){
caminho = req.files.imagem.path;
caminho_final = Math.round(Math.random()*10000);
childProcess.exec('xsltproc lattes2mods.xsl '+caminho+' > '+caminho+'.mods');
childProcess.exec('xmllint --schema mods.xsd '+caminho+'.mods', function (error, stderr,stdout) {
   if (error) {
     console.log(error);
res.render('index',{title:'XML2BIB', teste: 'Não foi possível a realização da conversão'})
   }
else { 
childProcess.exec('xml2bib -b -w '+caminho+'.mods > '+caminho_final+'.bib',function(error,stderr,stdout){
if(error){
res.render('index', {title: 'XML2BIB',teste: "Ocorreu algum erro ao converter para o arquivo bib"})
}
else{
fs.readFile(caminho_final+'.bib','ascii', function(err,data){
   if(err) {
        console.error("Could not open file: %s", err);
   }
res.render('index', {title: 'XML2BIB',teste: data});
}); 
}});
}});
});
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
