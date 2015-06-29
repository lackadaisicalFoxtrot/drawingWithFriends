//HomeView.js

var app = app || {};

app.HomeView = Backbone.View.extend({
  initialize : function() {
    this.render();
  },
  render : function () {
    //this.$el.detach();
    $('.container')
    .append("<p> Join friends and strangers in creating a sketch.</p> \
            <p>Create a masterpiece as fast as you can before it's immortalized in our gallery. \
            </p>");
  }
});
