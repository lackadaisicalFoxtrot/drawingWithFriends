var db = require('./db/config');
var Line = require('./db/models/line');
var Lines = require('./db/collections/lines');
var Picture = require('./db/models/picture');
var Pictures = require('./db/collections/pictures');
//timer functionality
var Timer = require('timer-stopwatch');

var sendTimer = function(io, timer) { //send the timer upon (any) client timer mode init (if there is a timer going), or upon user drawing the first line. io.emit to all to keep client timer more up to date
  //if there is no timer going, will emit time: null
  io.emit('setTimer', {time: timer && timer.ms});
};

//creates a timer if there is no timer and starts it,
//emits it to everyone,
//calls cb when the timer ends,
//returns the timer
module.exports.updateTimer = function(io, timer, cb) {
    if (!timer) {
      var ms = 300000; //5 min
      timer = new Timer(120000, { //2 min
          refreshRateMS: '1000'
        });

      timer.on('done', cb);
      timer.start();
      sendTimer(io, timer);
    }
    return timer;
};

//saves the picture and lines to the db, then clears the Lines collection
//emits the resetting to everyone,
//calls cb after the saving/resetting is successful
module.exports.savePictureAndReset = function(io, cb) {
  console.log('trying to save');
  if (Lines.length < 1) return; //make sure we are not creating a new picture if there are no lines. this fn shouldn't be called anyway in that case

  new Picture({}).save().then(function(picture) { //save first to get a picture id
    var pic_lines = picture.lines();
    Lines.mapThen(function(model) { //iter through lines, prepare attributes for saving to db, then save to db with create
      model.unset('id', {silent: true}); //silent = don't fire unneeded 'change' event
      model.set('coordinates', JSON.stringify(model.get('coordinates')));
      return pic_lines.create(model.attributes);

    }).then(function(res) {
      Lines.reset();
      io.emit('got lines', Lines); //all clients redraws lines (no lines)
      cb();
    }).catch(function(err) {
      return console.error('error saving all line models to db: ', err);
    });
  }).catch(function(err) {
    return console.error('error saving picture to db: ', err);
  });
};

module.exports.retrievePictureModels = function(socket){
  //loop through all lines in DB
  //find all lines which have the same picture ID
  //populate arrays, which represent completed pictures, with lines which match those pictures

  new Line({}).fetchAll().then(function(pictures){
    socket.emit('gallery served', pictures)
  })
};

module.exports.sendTimer = sendTimer;
