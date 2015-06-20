var socket = io();
console.dir(socket);
//socket.on('user broadcasted', function() {
  //console.log('detected someone broadcasted');
//});


//move the following to backbone logic when ready
//testing emitting mouse events to all other users
//$('html').on('mousemove', function(e) {
  //console.log('you moved mouse: ', e.pageX, e.pageY);
  //socket.emit('user moved', { coords: [e.pageX, e.pageY] });
//});

