// collections/LineCollection.js

var app = app || {};

app.LineCollection = Backbone.Collection.extend({
  model: app.LineModel,

  initialize: function() {
    socket.on('user moved', function(data) {
      console.log('another user moved: ', data);
      this.updateLines(data);
    }.bind(this));
    socket.on('user ended', function(data) {
      console.log('another user ended their line: ', data);
      this.updateLines(data);
    }.bind(this));
  },

  updateLines: function(data) { //if no data.coords are sent, means close the line. this fn could use some refactoring TODO
    var otherLine = this.findWhere({id: data.id}); //another user's line we've already seen (they're still drawing their line or close the line)
    if (data.coords) {
      if (otherLine) {
        otherLine.set('coordinates', data.coords);
      } else { //another user's line we haven't seen yet (they just started making the line)
        var newline = new app.LineModel({id: data.id, coordinates: data.coords});

        this.add(newline);
      }
    } else { //no data.coords so close the line
      otherLine && otherLine.set('id', null);
    }
  }

});
