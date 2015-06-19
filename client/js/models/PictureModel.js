//PictureModel

var app = app || {};

app.PictureModel = Backbone.Model.extend({

	initialize: function(){
		//assuming that LineModels will be collection of lines
		//sets 'lines' to LineModels collection
		this.set('lines', new LineModels)
	}

});