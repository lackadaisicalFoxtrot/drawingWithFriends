var express = require('express');
var db = require('./db/config');
var Line = require('./db/models/line');
var Lines = require('./db/collections/lines');
var Picture = require('./db/models/picture');
var Pictures = require('./db/collections/pictures');
var util = require('./utils');
var routes = require('./routes');

//timer functionality
var Timer = require('timer-stopwatch');


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 8080;
server.listen(port);

app.use(express.static(__dirname + '/../client'));
require('./routes')(app); //is this how to decorate/inject?

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

    //TODO move timer logic to utils?
    if (!timer) {
      var ms = 300000; //5 min
      timer = new Timer(30000, { //30 sec
          refreshRateMS: '1000'
          //almostDoneMS: 290000 //this will emit an event when the timer is almost done ... probably not necessary, TODO - get rid of this if we don't use it
        });

      //timer.on('time', function(time) {
      //});
      timer.on('done', function() {
        //save entire picture to DB
        util.savePictureAndReset(socket);
      });
      timer.start();
      util.sendTimer(io, timer);
    }
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

