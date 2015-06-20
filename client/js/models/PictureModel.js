//PictureModel

var app = app || {};

app.PictureModel = Backbone.Model.extend({
  initialize: function() {
    this.set('lines', new app.LineCollection());
    socket.on('user moved', function(data) {
      console.log('another user moved. ', data);
      this.updateLines(data);

      //this.lines
    }.bind(this));
  },
  addLine: function(line) {
    this.get('lines').add(line);
  },
  updateLines: function(data) {
    var otherLine = this.get('lines').findWhere({id: data.id}); //another user's line
    if (otherLine) { //another user is continuing their line that we've seen already
      otherLine.set('coordinates', data.coords);
    } else {//the other user's line first appears on our canvas
      //TODO put this elsewhere like the line collection?
      //I don't like how everything has access to the global app--can we encapsulate better?
      this.get('lines').add(new app.LineModel({coordinates: data.coords}));
      //expected behavior: adding a new line to lines updates the view
    }
  }
});


/*

   Instantiating a PictureModel
   ---------------------------------------------------
   --> Pass in a collection of lines

   var pictureData = new PictureModel({
lines: new app.LineCollection()
})

*/
