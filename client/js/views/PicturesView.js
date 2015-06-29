//PicturesView.js

var app = app || {};

app.PicturesView = Backbone.View.extend({
  el : $('ul.gallery-list'),
  tagName: 'svg',
  className: 'canvas',
  collection : app.PicturesCollection,

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
      this.container.append(this.tagName)
      .attr({
        'class': this.className,
        width: 500,
        height: 500
      });
    }
  }
});
