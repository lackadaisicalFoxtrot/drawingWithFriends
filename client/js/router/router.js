var app = app || {};

app.router = Backbone.Router.extend({
  routes : {
    '' : 'home',
    'draw' : 'draw',
    'gallery' : 'gallery',
    'gallery/:page' : 'gallery'
  },
  initialize: function(){
    this.appModel = new app.AppModel(); //the 'app' is the drawing portion of the app
  },
  home : function(){
    $('.container').empty();
    //$('.color-picker').empty();
    var homeView = new app.HomeView();
  },
  draw : function () {
    //console.log('running main');
    $('.container').empty();
    //$('.color-picker').empty();
    //if (this.appView) {
      //this.appView.remove();
      //debugger;
    //}
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

  }
});
