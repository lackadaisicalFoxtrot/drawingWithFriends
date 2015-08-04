var app = app || {};

app.AppModel = Backbone.Model.extend({
  initialize: function() {
    this.pictureModel = new app.PictureModel({width: '600px', height: '600px'});
    this.timerModel = new app.TimerModel();
  }
});
