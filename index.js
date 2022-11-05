var express = require('express');
var fs = require('fs');
var https = require('https');
const res = require('express/lib/response');
var app = express();
const puerto = 443;

https.createServer({
    cert: fs.readFileSync('certificado.crt'),
    key: fs.readFileSync('clave.key')
}, app).listen(puerto, function(){
    console.log('Servidor http corriendo en el puerto 80');
});

app.get('/', function(req, res){
    res.send('Hola, Pagina Principal');
    console.log('Se recibio una peticion de tipo get');
});