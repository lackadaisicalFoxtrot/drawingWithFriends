//PicturesView.js

var app = app || {};

app.PicturesView = Backbone.View.extend({
  el : $('ul.gallery-list'),
  collection : app.PicturesCollection,
  modelView : app.PictureView,

  initialize : function() {
    this.render();
  },
  render : function () {
    this.$el.detach();
    this.$el.html('').append(
      this.collection.map(function(picture){
        return new app.PictureView({model: picture}).render();
      })
      );
  }
});