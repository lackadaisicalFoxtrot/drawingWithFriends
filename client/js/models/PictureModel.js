var app = app || {};

app.PictureModel = Backbone.Model.extend({
  initialize: function() {
    this.set('lines', new app.LineCollection());
  },

  dragStarted: function() {
    this.set('activeLine', new app.LineModel());
    this.get('lines').add(this.get('activeLine'));
  },

  drag: function(mouseCoord) {
    this.get('activeLine').updateLine(mouseCoord);
  },

  dragEnded: function() {
    this.get('activeLine').endLine();
    this.set('activeLine', null);
  },

});


/*

    Instantiating a PictureModel
    ---------------------------------------------------
    --> Pass in a collection of lines

    var pictureData = new PictureModel({
        lines: new app.LineCollection()
    });

*/
