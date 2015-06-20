// collections/LineCollection.js

var app = app || {};

app.LineCollection = Backbone.Collection.extend({
  model: app.LineModel,

  initialize: function() {
    //this.on('add', function() {
      //this.render();
    //});
  }

});
