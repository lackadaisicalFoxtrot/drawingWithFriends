//HomeView.js

var app = app || {};

app.HomeView = Backbone.View.extend({
  initialize : function() {
    this.render();
  },
  render : function () {
    this.$el.detach();
    $('.container')
    .append('<div class="home"><h1> Drawing With Friends</h1><p> Join friends and strangers in creating a sketch. Will you draw a cat, a house, the Mona Lisa? Click below to start drawing</p><a href="#draw">Draw</a></div>');
  }
});