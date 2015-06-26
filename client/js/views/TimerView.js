// views/TimerView.js

var app = app || {};

app.TimerView = Backbone.View.extend({

  className: 'timerContainer',

  initialize: function() {
    this.model.on('change:time', this.render, this);
  },

  template: _.template('<h2><%= time %></h2>'),

  render: function() {
    this.$el.children().detach();
    return this.$el.append(this.template(this.model.attributes));
  }
});
