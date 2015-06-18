var express = require('express');
var util = require('./utils');
//var db = require('./db/config.js');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/../client'));


io.on('connection', function(client) {
    console.log('Client connected...');
});

//will change port at later date
var port = 8080;

http.listen(port);
