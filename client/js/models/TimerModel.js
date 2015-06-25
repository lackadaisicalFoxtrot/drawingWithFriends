// models/TimerModel.js

var app = app || {};

app.TimerModel = Backbone.Model.extend({

  initialize: function() {
    //emit event to get value of the timer
    socket.emit('getTimer'); 

    //provide context... Probably a less hack-y way to do this
    var self = this;
    socket.on('setTimer', function(data) {
      self.set('timer', new Tock({
        countdown: true,
        startTime: data.time, 
        interval: 1000, 
        onStart: self.start.bind(self), 
        onTick: self.tick.bind(self), 
        onComplete: self.complete.bind(self)
      }));

      //start the timer
      self.set('time', self.get('timer').lap('{MM}:{ss}'));
      self.get('timer').start();
    });
  }, 

  start: function() {
    this.trigger('start', this);
  },

  tick: function() {
    this.set('time', this.get('timer').lap('{MM}:{ss}'));
    this.trigger('tick', this);
  }, 

  complete: function() {
    this.trigger('complete');
  }
});