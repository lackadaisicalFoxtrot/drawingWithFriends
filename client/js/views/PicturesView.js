//PicturesView.js

var app = app || {};

app.PicturesView = Backbone.View.extend({
  //el : $('ul.gallery-list'),
  tagName: 'ul',
  collection : app.PicturesCollection,

  svgLine: d3.svg.line()
  .x(function(d) { return d[0]; })
  .y(function(d) { return d[1]; })
  .interpolate('basis'),

  initialize : function() {
    //this.collection = new app.PicturesCollection();
    //solving our async problems with set timeout is the most hackey hackish thing I have ever done
    this.collection.on('processed', this.render, this);
    //setTimeout(this.render.bind(this), 500);

  },
  render : function () {
    //TODO this makes me uncomfortable

    //var ul = d3.select(el);
    var ul = d3.select('.container'); //TODO eww
    var pictures = this.collection.modelData;
    _.each(pictures, function(picture) {
      var svg = ul.append('li').append('svg')
      .attr({
        'class': 'canvas',
        width: 500,
        height: 500
      });
      _.each(picture, function(line) {
        //console.log(JSON.parse(line));
        var line = svg.append('path')
        .datum(JSON.parse(line))
        .attr('class', 'line');
        line.attr('d', this.svgLine);
      }, this);
    }, this);
    //$('.container').append($el);
  }
});
