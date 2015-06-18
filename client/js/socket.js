io.on('connection', function (socket) {
  socket.broadcast.emit('user connected');
});
