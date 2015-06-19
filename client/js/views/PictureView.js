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
    this.context = this;
	},

  dragStarted: function() {
    console.log('drag started');
    //create a line model
    this.activeLine = new app.LineModel();
    this.newLine = new app.LineView({
      model: this.activeLine, 
      container: this.d3
    });
    //add that line model to collection
    var lines = this.model.get('lines');
    lines.add(this.activeLine);
  }, 

  drag: function() {
    console.log('drag');
    //add data to activeLine
    var coordinates = this.activeLine.get('coordinates');
    coordinates.push(d3.mouse(this.el));
    this.activeLine.set('coordinates', coordinates);
  }, 

  dragended: function() {
    console.log('dragend');
    //set activeLine to nothing
    this.activeLine = undefined;
  }
});


// events: {
// 	//"update to collection" : "this.render()"
// 	//seems like an alternate way to do event listener in initialize
// 	//not sure which one is better
// },

//***// could also be <rect style="fill:#fff;" width="100%" height="100%"></rect>
//not wsure if it works this way however


//collection will contian data on lines