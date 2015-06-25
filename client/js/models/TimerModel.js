// models/TimerModel.js

var app = app || {};

app.TimerModel = Backbone.Model.extend({

  initialize: function() {
    socket.emit('getTimer'); 
    socket.on('setTimer', function(data) {
      this.set('timer', new Tock({
        countdown: true,
        startTime: data.time, 
        interval: 1000, 
        // onStart: this.start, 
        onTick: this.tick, 
        onComplete: this.complete
      }));
    });

    //start the timer
    this.get('timer').start();
  }, 

  updateTime: function() {
    this.set('time', this.get('timer').lap('{MM}:{ss}'));
  }

  tick: function() {
    this.updateTime();
    this.trigger('tick', this);
  }, 

  complete: function() {
    this.trigger('complete');
  }
});