// server.js

var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var request = require('request');

app = express();
app.use(serveStatic(__dirname + "/dist"));

app.use('/tradier', function(req, res) {
    var uurl = 'https://sandbox.tradier.com/v1' + req.url;
    var options = {
        url: uurl,
        headers: {
            'accept': 'application/json',
            "Authorization" : "Bearer " + process.env.TRADIER_API_KEY
        }
    }
    req.pipe(request(options)).pipe(res);
  });

  app.use('/iex', function(req, res) {
    var uurl = 'https://api.iextrading.com/1.0' + req.url;
    var options = {
        url: uurl
    }
    req.pipe(request(options)).pipe(res);
  });

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started '+ port);