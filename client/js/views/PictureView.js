//PictureView.js

var app = app || {};

app.PictureView = Backbone.View.extend({

	tagName: "svg",

	className: "canvas",

	initialize: function(){
		this.render();
		//or could be...
		//this.listenTo(this.collection, "change", this.render);
	},

	
	events: {
		//"update to collection" : "this.render()"
		//seems like an alternate way to do event listener in initialize
		//not sure which one is better
	},

	render: function(){
		return this.$el.html(/**/'<rect></rect>').append(
			//this.collection should be LineModel Collection
			this.collection.map(function(line){
				//return new LineView({model: line}).render()
			})
		);
	}


});

//***// could also be <rect style="fill:#fff;" width="100%" height="100%"></rect>
//not wsure if it works this way however


//collection will contian data on lines