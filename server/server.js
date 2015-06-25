var express = require('express');
var util = require('./utils');
var db = require('./db/config');
var Line = require('./db/models/line');
var Lines = require('./db/collections/lines');
//var Pictures =require('./db/collections/pictures');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
server.listen(port);

app.use(express.static(__dirname + '/../client'));

var timerStarted = false;

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
  //Lines is one picture
  //Lines.invokeThen('save', null, options).then(function(res) {
    //// ... all models in the collection have been saved
    //console.log('saved. ', res);
    //Lines.reset(); //clear the server lines after saving
  //});
  //Promise.all(Lines.invoke('save')).then(function(res) { //collection has no .save() method
  //// collection models should now be saved...
  //console.log('saved. ', res);
  //});
};

io.on('connection', function(socket) {
  //socket.emit('connected', Lines); //send the server lines to the socket to be drawn
  socket.on('get lines', function() { //user has requested the lines because the picture view is rendering
    socket.emit('got lines', Lines); //send the lines every time the user requests it
  });
  socket.on('user moved', function(data) {
    console.log('a user drew. their data: ', data); //TODO send model.toJSON() as data to server from client, cleaner?
    //TODO the hashing needs to be much better for the server. the client drops the id upon dragend,
    //but on the server we keep the id until we store it in the db which is much longer--thus we def
    //need no collisions or we overwrite some lines
    Lines.add({id: data.id, coordinates: data.coordinates}, {merge: true});
    //if (!timerStarted) {
      //setTimeout(savePictureAndReset.bind(null, socket), 5000); //every 5 seconds
      //timerStarted = true;
      //console.log('started timer');
    //}
    //setTimeout(saveToDb, 1000*60*5); //save to db every 5 minutes. begin this timer when at least 1 person has started drawing

    //if (data.id) { //server has seen line before, it is an existing line someone is drawing
    ////do something 
    //} else { //this is the start of a new line
    //util.serverId(function(id) {
    //data.id = id;
    ////broadcast with a particular id
    //});
    //}
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
