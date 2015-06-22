//PictureModel

var app = app || {};

app.PictureModel = Backbone.Model.extend({
  initialize: function() {
    this.set('lines', new app.LineCollection());
  },
  addLine: function(line) {
    this.get('lines').add(line);
  }
});


/*

    Instantiating a PictureModel
    ---------------------------------------------------
    --> Pass in a collection of lines

    var pictureData = new PictureModel({
        lines: new app.LineCollection()
    });

*/
