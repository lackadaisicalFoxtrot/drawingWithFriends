var app = app || {};

app.AppModel = Backbone.Model.extend({
  initialize: function() {
    this.pictureModel = new app.PictureModel({width: '500px', height: '500px'});
    this.timerModel = new app.TimerModel();
  }
});
