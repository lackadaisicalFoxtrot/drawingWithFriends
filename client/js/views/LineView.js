// views/LineView.js

var app = app || {};

app.LineView = Backbone.View.extend({
  tagName: 'path', 
  className: 'line', 

  initialize: function(options) {
    //initialize the view with the data from LineModel, append it to parent container
    this.d3 = options.container
                .append(this.tagName)
                .datum(this.model.get('coordinates'))
                .attr('class', this.className);

    //listen for changes on the model to re-render line
    this.model.on('change', this.renderPath, this);
  }, 

  //d3 line rendering logic
  svgLine: d3.svg.line()
             .x(function(d) { return d[0]; })
             .y(function(d) { return d[1]; })
             .interpolate('basis'),

  renderPath: function() {
    this.d3.datum(this.model.get('coordinates'));
    this.d3.attr('d', this.svgLine);
  }

});