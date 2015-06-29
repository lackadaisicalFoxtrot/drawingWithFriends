// PicturesCollection.js
// This collection will contain Picture Models

var app = app || {};

app.PicturesCollection = Backbone.Collection.extend({

	model : app.PictureModel,

	initialize : function(){
		//PicturesView.js--> 
		//emmits 'gallery needed' events to server on initiliazation 
		console.log('PicturesCollection has been initialized');
		
		socket.emit('gallery needed');
		socket.on('gallery served', function(data){
			//this.createGallery(data)
			//the below is for testing purposes
			console.log(data);
		})

		//server.js --> 

	},

	createGallery : function(models){
		//take models data and add to PicturesCollection
		//need to see what format models is in before populateModels 
		//is built out
	}
	


});