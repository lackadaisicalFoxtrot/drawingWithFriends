// models/TimerModel.js

var app = app || {};

app.TimerModel = Backbone.Model.extend({

  initialize: function() {
    //emit event to get value of the timer
    socket.emit('getTimer'); //TODO start timer on server upon someone drawing instead of upon seeing the draw/timer view?

    //provide context... Probably a less hack-y way to do this
    socket.on('setTimer', function(data) {
      var self = this;
      this.set('timer', new Tock({
        countdown: true,
        startTime: data.time, 
        interval: 1000, 
        onStart: self.start.bind(self), 
        onTick: self.tick.bind(self), 
        onComplete: self.complete.bind(self)
      }));

      //start the timer
      this.set('time', this.get('timer').lap('{MM}:{ss}'));
      this.get('timer').start();
    }.bind(this));
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
