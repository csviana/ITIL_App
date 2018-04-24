/**
	* File: server.js
	* Description:  Script do servidor dentro do repositório https://github.com/csviana/ITIL_App
	* Author: Cleirton Viana
	* Create Date: 16/04/2017
*/

'use strinct';

//Carregando pacotes de roteamento
var express = require('express');
var app = express();
var fs = require("fs");
var compression = require('compression');
var httpsRedirect = require('express-https-redirect');
var subdomain = require('express-subdomain');
app.use(compression());

var checkUser = subdomain('www', function(req, res, next) {
    if(!req.session.user.valid) {
        return res.send('Permission denied.');
    }
    next();
});
app.use(checkUser);
app.use('/', httpsRedirect(true));

//Configurando rota principal
app.use("/", express.static("public"));

//Carregando os pacotes para a comunicação segura
const https = require('spdy');

//Carregando as chaves de acesso criptografado:
var key = fs.readFileSync('encryption/private_rsa.key', 'utf8');
var cert = fs.readFileSync( 'encryption/certificate.crt', 'utf8')
var cav = fs.readFileSync( 'encryption/ca_bundle.crt', 'utf8')

var options = {
	key: key,
	cert: cert,
	ca: cav
};

app.get('*', function(req, res, next){
	if(!req.secure)	return res.redirect('https://' + req.headers.host + req.url);
next();
});

//iniciando a aplicação:
app.listen(80);

//Abrindo a conexão segura:
https.createServer(options, app).listen(443);
