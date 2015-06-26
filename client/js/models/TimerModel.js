// models/TimerModel.js

var app = app || {};

app.TimerModel = Backbone.Model.extend({

  defaults: { time: '' },
  initialize: function() {
    //emit event to get value of the timer
    console.log('timer model inited. getting server timer...');
    socket.emit('getTimer'); //get the curr server time if there is one (or else only gets it when server emits setTimer)

    socket.on('setTimer', function(data) {
      if (!data.time) return this.set('time', 'Be the first to draw!');
      //provide context... Probably a less hack-y way to do this
      var self = this;
      //just having a server timer would be more accurate but more expensive for server. right now it only live updates upon -first- loading the view and if someone is the first to draw
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
    //this.trigger('tick', this);
  },

  tick: function() {
    this.set('time', this.get('timer').lap('{MM}:{ss}'));
    //this.trigger('tick', this);
  }, 

  complete: function() {
    this.set('time', "It's over! Draw again...");
  }
});
