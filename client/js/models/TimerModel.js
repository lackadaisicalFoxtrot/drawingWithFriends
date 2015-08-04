var app = app || {};

app.TimerModel = Backbone.Model.extend({

  defaults: { time: '' },
  initialize: function() {
    socket.emit('getTimer'); //get the curr server time if there is one (or else only gets it when server emits setTimer)

    socket.on('setTimer', function(data) {
      if (!data.time) return this.set('time', 'Be the first to draw!');

      var self = this;
      //just having a server timer would be more accurate but more expensive for server.
      //right now it only live updates the view upon when -any- client -first- loads the view and if anyone is the first to draw
      this.set('timer', new Tock({ //overlapping tocks may happen when hearing other users' setTimers events, but we just drop the previous tock (no more pointers to prev tock)
        countdown: true,
        startTime: data.time,
        interval: 1000,
        onStart: self.update.bind(self),
        onTick: self.update.bind(self),
        onComplete: self.complete.bind(self)
      }));

      this.get('timer').start();
    }.bind(this));
  },

  update: function() {
    this.set('time', this.get('timer').lap('{MM}:{ss}'));
  },

  complete: function() {
    this.set('time', "It's over! Draw again...");
  }
});
