// models/LineModel.js

var app = app || {};

app.LineModel = Backbone.Model.extend({

  //create a coordinates array on instantiation
  defaults: {
    coordinates: [],
    id: null //don't really need this explicitly. for clarity only
  },

  //trigger an event on drag event that updates the path. 
  //updatePath : function() {
    //this.trigger('updatePath', this);
  //}
});
