//PicturesView.js

var app = app || {};

app.PicturesView = Backbone.View.extend({
  el : $('ul.gallery-list'),
  //collection : app.PicturesCollection,

  initialize : function() {
    this.collection = new app.PicturesCollection();
    this.render();
  },
  render : function () {
    debugger
    this.$el.detach();
    this.$el.html('').append(
      this.collection.map(function(picture){
        return new app.PictureView({model: picture}).render();
      })
      );
  }
});
