// PicturesCollection.js
// This collection will contain Picture Models

var app = app || {};

app.PicturesCollection = Backbone.Collection.extend({
  //model: app.Picture,

	initialize : function(){
		socket.emit('gallery needed');
		socket.on('gallery served', function(data){
			this.processDbLines(data);
		}.bind(this));
	},

	processDbLines : function(lines){
		this.modelData = {};
		_.each(lines, function(line){
			if ( !this.modelData[line.picture_id] ){
			 	this.modelData[line.picture_id] = [];
			}
			this.modelData[line.picture_id].push(line.coordinates);
		}, this);
    this.trigger('processed'); //listener to bubbleup to view
    //do something like the below but without the event listeners/'lite' version
    //var picture = new app.PictureModel();
    //picture.get('lines').add etc
    //this.add(picture);
	}

});
