var socket = io();
socket.on('user broadcasted', function() {
  console.log('detected someone broadcasted');
});