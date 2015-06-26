var express = require('express');
var util = require('./utils');
var db = require('./db/config');
var Line = require('./db/models/line');
var Lines = require('./db/collections/lines');
var Picture =require('./db/models/picture');
var Pictures =require('./db/collections/pictures');

//timer functionality
var Timer = require('timer-stopwatch');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 8080;
server.listen(port);

app.use(express.static(__dirname + '/../client'));

var timer = null;

//test lines for debugging backend db stuff
//Lines.add({id:4949, coordinates: [10,2]});
//Lines.add({id:6534, coordinates: [7,49]});

//this saves the picture and lines to the db, then clears the Lines collection (that's all!) and sets the timer to null
var savePictureAndReset = function(socket) {
  if (Lines.length < 1) return; //make sure we are not creating a new picture if there are no lines. this fn shouldn't be called anyway in that case...

  new Picture({}).save().then(function(picture) { //save first to get a picture id
    var pic_lines = picture.lines();
    Lines.mapThen(function(model) { //iter through lines, prepare attributes for saving to db, then save to db with create
      model.unset('id', {silent: true}); //silent = don't fire 'change' event. less overhead?
      model.set('coordinates', JSON.stringify(model.get('coordinates'))); //shouldn't stringifcation be automatic on save?? hm
      return pic_lines.create(model.attributes); //eww exposing model.attr but trying the bookshelf relation way

      //Other methods tried:
      //pic_lines.add(model); //something like this would be nice
      //model.picture().set('id', picture.get('id')); //another method, less encapsulatey, setting the relationship via the other direction
      //model.set('picture_id', picture.get('id')); same as above but even more manual and not using bookshelf relationship
      //return model.save(); //create does this above

    }).then(function(res) {
      Lines.reset();
      socket.emit('got lines', Lines); //client redraws lines (no lines) TODO
      //timerStarted = false;
      timer = null;
    }).catch(function(err) {
      return console.error('error saving all line models to db: ', err);
    });
  }).catch(function(err) {
    return console.error('error saving picture to db: ', err);
  });
};

var sendTimer = function(socket) { //send the timer upon (any) client timer mode init (if there is a timer going), or upon user drawing the first line. io.emit to all to keep client timer more up to date
  //if there is no timer going, will emit time: null
  io.emit('setTimer', {time: timer && timer.ms});
};

io.on('connection', function(socket) {

  socket.on('get lines', function() { //user has requested the lines because the picture view is rendering
    socket.emit('got lines', Lines); //send the lines every time the user requests it (not very efficient, think about having view run in bg so this is only emitted once)
    //maybe call this set lines to conform
  });

  socket.on('getTimer', function() {
    sendTimer(socket);
  });

  socket.on('user moved', function(data) {
    //console.log('a user drew. their data: ', data); //TODO send JSON.stringify(model) as data to server from client, cleaner?

    Lines.add({id: data.id, coordinates: data.coordinates}, {merge: true});

    if (!timer) {
      var ms = 300000; //5 min
      timer = new Timer(30000, { //30 sec
          refreshRateMS: '5000', //??set the interval for when savePictureAndReset is called
          almostDoneMS: 290000 //this will emit an event when the timer is almost done ... probably not necessary, TODO - get rid of this if we don't use it
        }); //set new timer for 5 minutes

      timer.on('time', function(time) {
      });
      timer.on('done', function() {
        //save entire picture to DB
        savePictureAndReset(socket); 
      });
      timer.start();
      //console.log('timer started');
      sendTimer(socket);
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
