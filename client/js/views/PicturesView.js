//PicturesView.js

var app = app || {};

app.PicturesView = Backbone.View.extend({
  el : $('ul.gallery-list'),
  collection : app.PicturesCollection,
  modelView : app.PictureView, //TODO I think you only need the collection.

  initialize : function() {
    this.collection = new app.PicturesCollection();
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
