// views/TimerView.js

var app = app || {};

app.TimerView = Backbone.View.extend({

  tagName: 'div', 
  className: 'timerContainer',

  initialize: function() {
    this.model.on('start', this.attach, this);
    this.model.on('tick', this.render, this);
  }, 

  template: _.template('<h2><%= time %></h2>'), 

  attach: function() {
    $('.container').append(this.render());
  }, 

  render: function() {
    this.$el.children().detach();
    return this.$el.append(this.template(this.model.attributes));
  }
});