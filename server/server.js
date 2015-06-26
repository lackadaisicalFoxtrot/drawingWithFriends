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

//this saves the picture and lines to the db, then clears the Lines collection (that's all!)
var savePictureAndReset = function(socket) {
  if (Lines.length < 1) return; //for now, since we changed the timer to start even if 
  // the user hasn't drawn, make sure we are not creating a new picture if there are no lines

  new Picture({}).save().then(function(picture) { //save first to get a picture id
    var pic_lines = picture.lines();
    Lines.mapThen(function(model) { //iter through lines, prepare attributes for saving to db, then save to db with create
      model.unset('id', {silent: true}); //silent = don't fire 'change' event. less overhead?
      model.set('coordinates', JSON.stringify(model.get('coordinates'))); //shouldn't stringifcation be automatic on save?? hm
      return pic_lines.create(model.attributes); //eww but trying the bookshelf relation way

      //Other methods tried:
      //pic_lines.add(model); //something like this would be nice
      //model.picture().set('id', picture.get('id')); //another method, less encapsulatey, setting the relationship via the other direction
      //model.set('picture_id', picture.get('id')); same as above but even more manual and not using bookshelf relationship
      //return model.save(); //create does this above

    }).then(function(res) {
      console.log('saved lines ', res);
      Lines.reset();
      //socket.emit('connected', Lines); //client redraws lines (no lines) TODO not called connect anymore
      //timerStarted = false;
      timer = null;
      console.log('set timer to false');
    }).catch(function(err) {
      return console.error('error saving all line models to db: ', err);
    });
  }).catch(function(err) {
    return console.error('error saving picture to db: ', err);
  });
};

io.on('connection', function(socket) {

  socket.on('get lines', function() { //user has requested the lines because the picture view is rendering
    socket.emit('got lines', Lines); //send the lines every time the user requests it
  });

  socket.on('getTimer', function() {
    if(timer === null) {
      var ms = 300000;
      timer = new Timer(10000, { 
          refreshRateMS: '5000', //??set the interval for when savePictureAndReset is called
          almostDoneMS: 290000 //this will emit an event when the timer is almost done ... probably not necessary, TODO - get rid of this if we don't use it
        }); //set new timer for 5 minutes

      timer.on('time', function(time) {
      });

      timer.on('done', function() {
        //save entire picture to DB
        savePictureAndReset(socket); 
        //timer = null; this needs to be in the saving to db promise because we're doing db stuff
      });

      timer.start();
      console.log('timer started');
    } 

    io.emit('setTimer', { time: timer.ms }); //emit timer data to client
  });

  socket.on('user moved', function(data) {
    console.log('a user drew. their data: ', data); //TODO send JSON.stringify(model) as data to server from client, cleaner?

    Lines.add({id: data.id, coordinates: data.coordinates}, {merge: true});
    //if (!timerStarted) {
      //setTimeout(savePictureAndReset.bind(null, socket), 15000); //every 15 seconds
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
