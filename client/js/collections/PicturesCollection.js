// PicturesCollection.js
// This collection will contain Picture Models

var app = app || {};

app.PicturesCollection = Backbone.Collection.extend({

	model : app.PictureModel,

	initialize : function(){
		socket.emit('gallery needed');
		socket.on('gallery served', function(data){
			console.log(data);
		})

		//server.js --> 

	},

	createGallery : function(models){
		console.log(models);
		//this.modelData = {};
		// loop through models
			//if picture id for model exists
				//add line to array
			//else
				//create array at model.(pictureid)
				//add model to array
	}
	


});