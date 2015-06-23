var app = app || {};

app.AppModel = Backbone.Model.extend({
  initialize: function() {
    this.pictureModel = new app.PictureModel({width: '960px', height: '960px'});
  }
});
