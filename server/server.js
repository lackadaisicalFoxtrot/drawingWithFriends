var express = require('express');
var util = require('./utils');
var db = require('./db/config');
var Lines =require('./db/collections/lines');
var Pictures =require('./db/collections/pictures');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
//will change port at later date
var port = 8080;
server.listen(port);

app.use(express.static(__dirname + '/../client'));
io.on('connection', function(socket) {
    console.log('Client connected...');
    console.log(socket);
    socket.broadcast.emit('user broadcasted');

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
