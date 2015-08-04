//HomeView.js

var app = app || {};

app.HomeView = Backbone.View.extend({
  initialize : function() {
    this.render();
  },
  render : function () {
    $('.container')
    .append("<p> Join friends and strangers in creating a speed sketch.</p> \
            <p>Create a masterpiece as fast as you can before it's immortalized in our gallery. \
            </p>");
  }
});
