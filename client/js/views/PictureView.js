//PictureView.js

var app = app || {};

app.PictureView = Backbone.View.extend({
  tagName: 'svg',
  className: 'canvas',

  initialize: function(options){
    this.render(options);
    this.model.get('lines').on('add', function(line) {
      this.renderLine(line);
    }, this);
  },

  renderLine: function(line) {
    //instantiate new LineView 
    new app.LineView({
      model: line,
      container: this.d3
    });
  },

  getMouse: function() {
    //pass in the d3 node so that it gets coordinates relative to the
    //SVG element, rather than relative to the entire page
    return d3.mouse(this.d3.node());
  },

  render: function(options) {
    //TODO all these d3 elems could probably be refactored to be more like $el--attempted but views didn't render correctly
    this.d3 = options.container
    .append(this.tagName)
    .attr({
      'class': this.className,
      width: this.model.get('width'),
      height: this.model.get('height')
    })
    .call(d3.behavior.drag()
          .on("dragstart", this.model.dragStarted.bind(this.model))
          .on("drag", function() {
            this.model.drag(this.getMouse());
          }.bind(this))
          .on("dragend", this.model.dragEnded.bind(this.model)));
          //like 'events' hash
  }

});


/*
TODO update this
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
