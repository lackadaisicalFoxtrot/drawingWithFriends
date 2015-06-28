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
    //var body = d3.select('body');
    //var container = d3.select('.container');
    this.appModel = new app.AppModel(); //the 'app' is the drawing portion of the app
    //always have the drawing app model in the bg
    //var data = new app.PictureModel({
        ////lines: new app.LineCollection()
    //});
  },
  home : function(){
    $('.container').empty();
    var homeView = new app.HomeView();
  },
  draw : function () {
    console.log('running main');
    $('.container').empty();
    this.appView = new app.AppView({model: this.appModel});
    //render the view when user goes to draw tab
    //var picture = new app.PictureView({
        //model: data,
        //container: container,
        //width: '500px',
        //height: '500px'
      //});
    },
  gallery : function(page){
    $('.container').empty();
    this.picturesView = new app.PicturesView();
    // $('.container').append('<h1>GalleryView</h1>');

  }
});
