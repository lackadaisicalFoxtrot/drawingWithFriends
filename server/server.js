var express = require('express');
var db = require('./db/config');
var Line = require('./db/models/line');
var Lines = require('./db/collections/lines');
var Picture = require('./db/models/picture');
var Pictures = require('./db/collections/pictures');
var util = require('./utils'); //TODO maybe as an injection like routes
//var Timer = require('timer-stopwatch');


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 8080;
server.listen(port);

app.use(express.static(__dirname + '/../client'));
require('./routes')(app); //is this best way to decorate/dependency inject?

var timer = null;
//test lines for debugging backend db stuff
//Lines.add({id:4949, coordinates: [10,2]});
//Lines.add({id:6534, coordinates: [7,49]});

io.on('connection', function(socket) {
  //TODO rename these events without spaces etc
  socket.on('get lines', function() { //user has requested the lines because the picture view is rendering
    socket.emit('got lines', Lines); //send the lines every time the user requests it (not very efficient, think about having view run in bg so this is only emitted once)
    //maybe call this set lines to conform
  });
  socket.on('getTimer', function() {
    util.sendTimer(io, timer);
  });

  socket.on('user moved', function(data) {
    //console.log('a user drew. their data: ', data); //TODO send JSON.stringify(model) as data to server from client, cleaner?

    Lines.add({id: data.id, coordinates: data.coordinates}, {merge: true});

    //TODO move all timer logic to another file?
    timer = util.updateTimer(io, timer, function() { //cb to fire when timer ends
      util.savePictureAndReset(socket, function() { //cb to fire upon successful saving/resetting
      timer = null; 
      });
    });

    socket.broadcast.emit('user moved', data);
  });
  
  socket.on('user ended', function(data) {
    socket.broadcast.emit('user ended', data);
    Lines.get({id: data.id}).set('id', null);
  });
  //socket.on('disconnect', function() {
    //io.emit('user disconnected'); //custom event
  //});
});

