var express = require('express');
var util = require('./utils');
//var db = require('./db/config.js');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//will change port at later date
var port = 8080;
server.listen(port);

app.use(express.static(__dirname + '/../client'));
io.on('connection', function(socket) {
    console.log('Client connected...');
    console.log(socket);
    socket.broadcast.emit('user broadcasted');

    socket.on('disconnect', function() {
      io.emit('user disconnected'); //custom event
    });

});

