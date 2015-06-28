//GalleryView.js

var app = app || {};

app.GalleryView = Backbone.View.extend({
	initialize : function(){
		this.render();
	},
	render : function(){
		$('.container').append('<h1>GalleryView</h1>');
		//render will also need to take picture models from its pictures collection, and render
		//them on the page
	}

})