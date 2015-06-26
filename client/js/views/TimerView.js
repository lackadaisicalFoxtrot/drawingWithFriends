// views/TimerView.js

var app = app || {};

app.TimerView = Backbone.View.extend({

  className: 'timerContainer',

  initialize: function() {
    //this.model.on('tick', this.render, this);
    this.model.on('change:time', this.render, this);
    //or on this.model.on('change:timer')?
    //should we use listenTo? is it better for not storing a bunch of Tocks ref in memory when we don't need anymore if they're not correctly garbage collected
  },

  template: _.template('<h2><%= time %></h2>'),

  render: function() {
    this.$el.children().detach();
    return this.$el.append(this.template(this.model.attributes));
  }
});
