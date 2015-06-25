// views/TimerView.js

var app = app || {};

app.TimerView = Backbone.View.extend({

  tagName: 'div', 
  className: 'timerContainer'

  initialize: function() {
    this.model.on('tick', this.render);
  }, 

  template: _.template('<h2><%= time %></h2>'), 

  render: function() {
    this.$el.children().detach();

    return this.$el.html(this.template(this.model.attributes));
  }
});