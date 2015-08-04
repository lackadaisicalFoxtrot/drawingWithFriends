var app = app || {};

app.LineModel = Backbone.Model.extend({

  defaults: {
    coordinates: [],
    id: null //for clarity
  },
  initialize: function() {
    this.set('id', guid());
  },

  updateLine: function(coord) {
    var coordinates = this.get('coordinates').slice();
    coordinates.push(coord);

    //set coordinates property of the LineModel. 
    //This will emit a change event on the model, causing the line to re-render.
    //Adding elements to the existing coordinates array will not emit an event. 
    this.set('coordinates', coordinates);
    socket.emit('user moved', {id: this.get('id'), coordinates: this.get('coordinates')});
    //ie sending all of this.attributes

  },
  endLine: function() {
    //fix for overwriting lines. allows hash to reuse that id again
    socket.emit('user ended', {id: this.get('id')}); //the line collection hears this
    this.set('id', null);
  }

});
