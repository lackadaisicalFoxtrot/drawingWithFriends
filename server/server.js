var express = require('express');
var db = require('./db/config');
var Line = require('./db/models/line');
var Lines = require('./db/collections/lines');
var Picture = require('./db/models/picture');
var Pictures = require('./db/collections/pictures');
var util = require('./utils');


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
server.listen(port);

app.use(express.static(__dirname + '/../client'));
require('./routes')(app);

var timer = null;

io.on('connection', function(socket) {

  socket.on('get lines', function() { //user has requested the lines because the picture view is rendering
    socket.emit('got lines', Lines); //send the lines every time the user requests it
  });
  socket.on('getTimer', function() {
    util.sendTimer(io, timer);
  });

  socket.on('user moved', function(data) {
    Lines.add({id: data.id, coordinates: data.coordinates}, {merge: true});

    timer = util.updateTimer(io, timer, function() { //cb to fire when timer ends
      util.savePictureAndReset(io, function() { //cb to fire upon successful saving/resetting
      timer = null;
      });
    });
    socket.broadcast.emit('user moved', data);
  });

  socket.on('user ended', function(data) {
    socket.broadcast.emit('user ended', data);
  });

  socket.on('gallery needed', function(){
    util.retrievePictureModels(socket);
  });

});

