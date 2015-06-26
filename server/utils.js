// will contain and export callback functions for server actions
var db = require('./db/config');
var Line = require('./db/models/line');
var Lines = require('./db/collections/lines');
var Picture = require('./db/models/picture');
var Pictures = require('./db/collections/pictures');

module.exports.sendTimer = function(io, timer) { //send the timer upon (any) client timer mode init (if there is a timer going), or upon user drawing the first line. io.emit to all to keep client timer more up to date
  //if there is no timer going, will emit time: null
  io.emit('setTimer', {time: timer && timer.ms});
};

//this saves the picture and lines to the db, then clears the Lines collection (that's all!) and sets the timer to null
module.exports.savePictureAndReset = function(socket) {
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
      timer = null;
    }).catch(function(err) {
      return console.error('error saving all line models to db: ', err);
    });
  }).catch(function(err) {
    return console.error('error saving picture to db: ', err);
  });
};



