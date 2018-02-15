// server.js

var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var request = require('request');

app = express();
app.use(serveStatic(__dirname + "/dist"));

app.use('/api', function(req, res) {
    var uurl = 'https://sandbox.tradier.com' + req.url;
    var options = {
        url: uurl,
        headers: {
            'accept': 'application/json',
        }
    }
    req.pipe(request(options)).pipe(res);
  });

var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started '+ port);