var app = app || {};

app.router = Backbone.Router.extend({
  routes : {
    '' : 'home',
    'draw' : 'draw',
    'gallery' : 'gallery',
    'gallery/:page' : 'gallery'
  },
  initialize: function(){
    // this.main();
  },
  home : function(){
    $('.container').empty();
    var homeView= new app.HomeView();
  },
  draw : function () {
    console.log('running main');
    $('.container').empty();
    var body = d3.select('body');
    var container = d3.select('.container');
    var data = new app.PictureModel({
        lines: new app.LineCollection()
      });
    var picture = new app.PictureView({
        model: data,
        container: container,
        width: '500px',
        height: '500px'
      });
    },
  gallery : function(page){
    $('.container').empty();
    $('.container').append('<h1>GalleryView</h1>');
  }
});
