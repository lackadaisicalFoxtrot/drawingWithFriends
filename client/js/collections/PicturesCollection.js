// PicturesCollection.js
// This collection will contain Picture Models

var app = app || {};

app.PicturesCollection = Backbone.Collection.extend({

	initialize : function(){
		//this is hackish...should be using bind
		var that = this;
		socket.emit('gallery needed');
		socket.on('gallery served', function(data){
			that.createGallery(data);
		})

		//server.js --> 

	},

	createGallery : function(models){
		var that = this;
		this.modelData = {};
		_.each(models, function(model){
			if ( !that.modelData[model.picture_id] ){
			 	that.modelData[model.picture_id] = [];
			}
			that.modelData[model.picture_id].push(model.coordinates);
		})
	}
	


});