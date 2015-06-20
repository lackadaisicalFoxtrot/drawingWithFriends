var express = require('express');
var util = require('./utils');
//var db = require('./db/config');
//var Lines =require('./db/collections/lines');
//var Pictures =require('./db/collections/pictures');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//will change port at later date
var port = 8080;
server.listen(port);

app.use(express.static(__dirname + '/../client'));
io.on('connection', function(socket) {
    socket.on('user moved', function(data) {
      console.log('a user drew. their data: ', data);
      //now save the data to a bookshelf collection of lines ie a picture
      //that persists here. when the pic is done save() to the db
      //if (data.id) { //server has seen line before, it is an existing line someone is drawing
       ////do something 
      //} else { //this is the start of a new line
        //util.serverId(function(id) {
          //data.id = id;
          ////broadcast with a particular id
        //});
      //}
      //socket.broadcast.emit('user moved', data);

      socket.broadcast.emit('user moved', data);
    });
    socket.on('disconnect', function() {
      io.emit('user disconnected'); //custom event
    });
});

app.route('/gallery')
	.get(function(req,res,next){
		var results = [];
		new Pictures({}).fetch().then(function(pictures){
			for(var i = 0; i<pictures.models.length; i++){
				results[i]=[];
				new Lines({picture_id : pictures.get(i).get('id')}).fetch().then(function(lines){
					for (var i = 0; i < lines.models.length; i++) {
						results[i].push(lines.get(i));
					}
				});
			}
		});
		res.send(results);
	});
