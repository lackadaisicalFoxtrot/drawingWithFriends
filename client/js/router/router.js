var app = app || {};

app.router = Backbone.Router.extend({
  routes : {
    '' : 'home',
    'draw' : 'draw',
    'gallery' : 'gallery',
    'gallery/:page' : 'gallery' //TODO ????
  },
  initialize: function(){
    this.appModel = new app.AppModel(); //the 'app' is the drawing portion of the app
  },
  home : function(){
    $('.container').empty();
    var homeView = new app.HomeView();
  },
  draw : function () {
    $('.container').empty();
    this.appView = new app.AppView({model: this.appModel});
    },
  gallery : function(page){
    $('.container').empty();
    this.picturesCollection = new app.PicturesCollection();
    this.picturesView = new app.PicturesView({collection: this.picturesCollection});
  }
});
