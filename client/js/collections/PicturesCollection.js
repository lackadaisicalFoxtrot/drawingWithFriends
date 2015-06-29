// PicturesCollection.js
// This collection will contain Picture Models

var app = app || {};

app.PicturesCollection = Backbone.Collection.extend({

	model : app.PictureModel,

	initialize : function(){
		//PicturesView.js--> 
		//emmits 'gallery needed' events to server on initiliazation 
		socket.emit('gallery needed');
		//server.js --> 

	},

	populateModels : function(models){
		//take models data and add to PicturesCollection
		//need to see what format models is in before populateModels 
		//is built out
	},

	createGallery : function(){
		socket.on('gallery served', function(data){
			this.populateModels(data);
		})
	}
	


});