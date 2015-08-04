// AppView.js
// This view will be responsible for instantiating the entire app. Other views will be instantiated on creation of this view. 

var app = app || {};

app.AppView = Backbone.View.extend({
  initialize: function() {
     this.appContainer = '.container';
     this.pictureView = new app.PictureView({
       model: this.model.pictureModel,
       container: d3.select(this.appContainer) //TODO this is a little different compared to the usual rendering for now because of d3's svg
     });
     this.timerView = new app.TimerView({
      model: this.model.timerModel
     });
     $(this.appContainer).append(this.timerView.render());
  }

});

