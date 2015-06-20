//PictureView.js

var app = app || {};

app.PictureView = Backbone.View.extend({
	tagName: 'svg',
	className: 'canvas',

  activeLine: undefined,

	initialize: function(options){
    //initialize the view
    this.d3 = options.container
                .append(this.tagName)
                .attr({
                  'class': this.tagName,
                  width: options.width, 
                  height: options.height
                })
                .call(d3.behavior.drag()
                .on("dragstart", this.dragStarted.bind(this))
                .on("drag", this.drag.bind(this))
                .on("dragend", this.dragended.bind(this)));

    socket.on('user moved', function(data) {
      console.log('another user moved: ', data);
      this.updateLines(data);
    }.bind(this));

    this.model.get('lines').on('add', function() {
      console.log('render called', this);
      //this.render();
    }, this);

	},

  dragStarted: function() {
    console.log('drag started');
    //create a line model
    this.activeLine = new app.LineModel();
    //TODO please put this activeLine on the picturemodel
    //instead of instantiate here in the view

    //instantiate new LineView 
    new app.LineView({
      model: this.activeLine, 
      container: this.d3
    });

    //add that line model to collection
    //TODO shouldn't adding to collection be in model not view?
    //var lines = this.model.get('lines');
    //lines.add(this.activeLine);
    this.model.addLine(this.activeLine);
    //TODO did this make the drawing slower/less accurate?

    hasherino(function(id) {
      this.activeLine.set('id', id);
    }.bind(this));
  }, 

  drag: function() {
    console.log('drag');
    //add data to activeLine by...

    //create a new copy of the array
    var coordinates = this.activeLine.get('coordinates').slice();

    var coord = d3.mouse(this.el);
    coordinates.push(coord);
    //TODO push coordinates or just the updated coord? would be better to just send new data
    //but would have to add logic
    socket.emit('user moved', {id: this.activeLine.get('id'), coords: coordinates});
    //TODO id: will always be null. we never get the data the server transmits (the data that has an id now) and attach the data to the line model in bb
    //!!!!!!!!!!!!!!!!!!!!!!!!!

    //set coordinates property of the LineModel. 
    //This will emit a change event on the model, causing the line to re-render.
    //Adding elements to the existing coordinates array will not emit an event. 
    this.activeLine.set('coordinates', coordinates);
  }, 

  dragended: function() {
    console.log('dragend');
    //set activeLine to nothing
    this.activeLine = undefined;
  }, 

  updateLines: function(data) {
    var otherLine = this.model.get('lines').findWhere({id: data.id}); //another user's line
    if (otherLine) {
      otherLine.set('coordinates', data.coords);
    } else {
      var newline = new app.LineModel({id: data.id, coordinates: data.coords});

      //instantiate view 
      new app.LineView({
        model: newline, 
        container: this.d3
      });

      this.model.addLine(newline);
    }
  }
});


/*

Instantiating a PictureView
---------------------------------------------------
--> Pass in a PictureModel, the DOM element it will be appended to, 
    width, and height

  var picture = new app.PictureView({
    model: pictureData, 
    container: d3.select('body'),
    width: '500px', 
    height: '500px'
  });

*/
