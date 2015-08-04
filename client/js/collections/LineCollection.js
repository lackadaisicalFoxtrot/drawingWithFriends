var app = app || {};

app.LineCollection = Backbone.Collection.extend({
  model: app.LineModel,

  initialize: function() {
    socket.on('got lines', function(lines) {
      this.reset();
      this.set(lines); //should be empty if server lines got wiped
    }.bind(this));
    socket.on('user moved', function(data) { //data is line for these cbs
      this.updateLines(data);
    }.bind(this));
    socket.on('user ended', function(data) {
      this.updateLines(data);
    }.bind(this));
  },

  updateLines: function(data) { //if no data.coordinates are sent, means close the line.
    var otherLine = this.findWhere({id: data.id}); //another user's line we've already seen (they're still drawing their line or close the line)
    if (data.coordinates) {
      if (otherLine) {
        otherLine.set('coordinates', data.coordinates);
      } else { //another user's line we haven't seen yet (they just started making the line)
        var newline = new app.LineModel({id: data.id, coordinates: data.coordinates});

        this.add(newline);
      }
    } else { //no data.coords so close the line
      otherLine && otherLine.set('id', null);
    }
  }

});
