var express = require('express');
var util = require('./utils');
var db = require('./db/config');
var Line = require('./db/models/line');
var Lines = require('./db/collections/lines');
//var Pictures =require('./db/collections/pictures');

//timer functionality
var Timer = require('timer-stopwatch');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 8080;
server.listen(port);

app.use(express.static(__dirname + '/../client'));

var timer = null;

var savePictureAndReset = function(socket) {
  Lines.mapThen(function(model) {
    model.unset('id', {silent: true}); //silent = don't fire 'change' event. less overhead?
    model.set('coordinates', JSON.stringify(model.get('coordinates'))); //shouldn't stringifcation be automatic on save?? hm
    return model.save().then(function(res) {
      return res;
    });
  }).then(function(res) {
    console.log('saved lines: ', res);
    Lines.reset();
    socket.emit('connected', Lines); //client redraws lines (no lines)
    timerStarted = false;
    console.log('set timer to false');
  });
};

io.on('connection', function(socket) {

  socket.on('get lines', function() { //user has requested the lines because the picture view is rendering
    socket.emit('got lines', Lines); //send the lines every time the user requests it
  });

  socket.on('getTimer', function() {
    if(timer === null) {
      timer = new Timer(300000, { 
          refreshRateMS: '5000', 
          almostDoneMS: 290000
        }); //set new timer for 5 minutes

      timer.on('time', function(time) {
        savePictureAndReset.bind(null, socket);
      });

      timer.on('done', function() {
        //save entire picture to DB?
        timer = null;
      });

      timer.start();
    } 

    io.emit('setTimer', { time: timer.ms }); //emit timer to client
  });

  socket.on('user moved', function(data) {
    console.log('a user drew. their data: ', data); //TODO send model.toJSON() as data to server from client, cleaner?

    Lines.add({id: data.id, coordinates: data.coordinates}, {merge: true});

    // if (data.id) { //server has seen line before, it is an existing line someone is drawing
    // //do something 
    // } else { //this is the start of a new line
    //   util.serverId(function(id) {
    //   data.id = id;
    //   //broadcast with a particular id
    // });

    socket.broadcast.emit('user moved', data);
  });
  
  socket.on('user ended', function(data) {
    socket.broadcast.emit('user ended', data);
    Lines.get({id: data.id}).set('id', null);
  });
  socket.on('disconnect', function() {
    io.emit('user disconnected'); //custom event
  });
});

app.route('/gallery')
.get(function(req,res,next){
  var results = [];
  new Pictures({}).fetch().then(function(pictures){
    for(var i = 0; i<pictures.models.length; i++){
      results[i]=[];
      new Lines({picture_id : pictures.get(i).get('id')}).fetch().then(function(lines){ //TODO Lines is already an instance of a collection so this won't work
        for (var i = 0; i < lines.models.length; i++) {
          results[i].push(lines.get(i));
        }
      });
    }
  });
  res.send(results);
});
