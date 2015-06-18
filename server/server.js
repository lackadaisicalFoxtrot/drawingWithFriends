var express = require('express');
var util = require('./utils');
var db = require('./db/config.js')

var app = express().createServer();
var io = require('socket.io')(app);
//will change port at later date
var port = 8080;

app.listen(port);


io.on('connection', function(client) {  
    console.log('Client connected...');
});