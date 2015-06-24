// js/app.js
// This file is responsible for instantiating the entire app. Will load on document.ready()  

var app = app || {};

$(function() {
  //TODO can these be put in the view please
  $('.item').toggle();
  //TODO these can be grouped together
  $('.menu-li').on('click',function(event){
    $('.item').toggle();
  });
  $('.item').click(function(event){
    $('.item').toggle();
  });
  var router = new app.router();
  Backbone.history.start();
  // Kick things off by creating the **App**.
  // new app.AppView();

  //var appModel = new app.AppModel();
  //var appView = new app.AppView({model: appModel});

});
