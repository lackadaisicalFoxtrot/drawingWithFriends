//HomeView.js

var app = app || {};

app.HomeView = Backbone.View.extend({
  initialize : function() {
    this.render();
  },
  render : function () {
    this.$el.detach();
    $('.container')
    .append('<p> Join friends and strangers in creating a sketch. \
            Will you draw a cat, a house, the Mona Lisa?</p>');
  }
});
