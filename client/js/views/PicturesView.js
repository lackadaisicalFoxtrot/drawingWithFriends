//PicturesView.js
//TODO this file is pretty bad

var app = app || {};

app.PicturesView = Backbone.View.extend({
  //el : $('ul.gallery-list'),
  tagName: 'ul',
  collection : app.PicturesCollection,

  generatePhrase: function() {
    var firstWord = ['so', 'this', 'wow', 'such', 'much', 'amaze', 'brilliant', 'wonderful', 'very'];
    var secondWord = ['provoke', 'amazement', 'drawing', 'painting', 'masterpiece', 'art', 'genius', 'abstract', 'impressionism', 'passion', 'da Vinci', 'Picasso'];
    var punctuate = ['!1', '??', '.'];

    return _.sample(firstWord) + ' ' + _.sample(secondWord) + _.sample(punctuate);
  },

  generateColor: function() {
    var colors = ['yellow', '#00ff00', '#00ffff', '#ff66ff', 'red', 'blue'];
    return _.sample(colors);
  },

  svgLine: d3.svg.line()
  .x(function(d) { return d[0]; })
  .y(function(d) { return d[1]; })
  .interpolate('basis'),

  initialize : function() {
    $('.container').text('loading...');
    this.collection.on('processed', this.render, this);

  },
  render : function () {
    $('.container').empty();

    //var ul = d3.select(el);
    var ul = d3.select('.container'); //TODO eww
    var pictures = this.collection.modelData;
    var pic_ids = Object.keys(pictures).reverse();
    _.each(pic_ids, function(pic_id) {
      var li = ul.append('li').attr('class', 'pic');
      li.append('h2').style('color', this.generateColor()).text(this.generatePhrase());
      var svg = li.append('svg')
      .attr({
        'class': 'canvas',
        width: 500,
        height: 500
      });



      var picture = pictures[pic_id];
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
