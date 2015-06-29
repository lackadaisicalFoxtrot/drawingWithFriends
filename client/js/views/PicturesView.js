//PicturesView.js

var app = app || {};

app.PicturesView = Backbone.View.extend({
  el : $('ul.gallery-list'),
  tagName: 'svg',
  className: 'canvas',
  collection : app.PicturesCollection,

  svgLine: d3.svg.line()
  .x(function(d) { return d[0]; })
  .y(function(d) { return d[1]; })
  .interpolate('basis'),

  initialize : function() {
    this.collection = new app.PicturesCollection();
    //solving our async problems with set timeout is the most hackey hackish thing I have ever done
    setTimeout(this.render.bind(this), 500);

  },
  render : function () {
    this.$el.detach();

    this.container = d3.select('.container');
    var data = this.collection.modelData;

    for (var pic in data){
      var svg = this.container.append(this.tagName)
      .attr({
        'class': this.className,
        width: 500,
        height: 500
      });
      for (var i = 0; i < data[pic].length; i++) {
        console.log(JSON.parse(data[pic][i]));
        var line = svg.append('path')
        .datum(JSON.parse(data[pic][i]))
        .attr('class', 'line');
        line.attr('d', this.svgLine);
      }

    }
  }
});
