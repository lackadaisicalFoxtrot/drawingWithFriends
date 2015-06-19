//PictureModel

var app = app || {};

app.PictureModel = Backbone.Model.extend({

  // defaults : {
  //   lines: new app.LineCollection()
  // },

	initialize: function(){
		//assuming that LineModels will be collection of lines
		//sets 'lines' to LineModels collection
		//this.set('lines', new LineModels)
	}

});

//Maybe we don't need this? maybe we do though
