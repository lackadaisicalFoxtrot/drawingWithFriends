var express = require('express');
var db = require('./db/config');
var Line = require('./db/models/line');
var Lines = require('./db/collections/lines');
var Picture = require('./db/models/picture');
var Pictures = require('./db/collections/pictures');
var util = require('./utils'); //TODO maybe as an injection like routes


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
server.listen(port);

app.use(express.static(__dirname + '/../client'));
require('./routes')(app); //is this best way to decorate/dependency inject?

var timer = null;

io.on('connection', function(socket) {

  //the below is for test purposes
  //util.retrievePictureModels();

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
      util.savePictureAndReset(io, function() { //cb to fire upon successful saving/resetting
      timer = null; 

      });
    });

    socket.broadcast.emit('user moved', data);
  });
  
  socket.on('user ended', function(data) {
    socket.broadcast.emit('user ended', data);
    //Lines.get({id: data.id}).set('id', null);
    //get rid of edge case problem where user is still drawing when timer ends (Lines reset)
  });
  //socket.on('disconnect', function() {
    //io.emit('user disconnected'); //custom event
  //});

  socket.on('gallery needed', function(){
    ///console.log('server has received gallery populate event from client');
    //console.log(util.retrievePictureModels());
    util.retrievePictureModels(socket);
  });

});

