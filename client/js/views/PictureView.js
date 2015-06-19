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
	},

  dragStarted: function() {
    console.log('drag started');
    //create a line model
    this.activeLine = new app.LineModel();

    //instantiate new LineView 
    new app.LineView({
      model: this.activeLine, 
      container: this.d3
    });

    //add that line model to collection
    var lines = this.model.get('lines');
    lines.add(this.activeLine);
  }, 

  drag: function() {
    console.log('drag');
    //add data to activeLine by...

    //create a new copy of the array
    var coordinates = this.activeLine.get('coordinates').slice();

    coordinates.push(d3.mouse(this.el));

    //set coordinates property of the LineModel. 
    //This will emit a change event on the model, causing the line to re-render.
    //Adding elements to the existing coordinates array will not emit an event. 
    this.activeLine.set('coordinates', coordinates);
  }, 

  dragended: function() {
    console.log('dragend');
    //set activeLine to nothing
    this.activeLine = undefined;
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