// js/app.js
// This file is responsible for instantiating the entire app. Will load on document.ready()  

var app = app || {};

$(function() {
  $('.item').toggle();
  $('.menu-li').on('click',function(event){
    $('.item').toggle();
  });
  $('.item').click(function(event){
    $('.item').toggle();
  })
  var router = new app.router();
  Backbone.history.start();
  // Kick things off by creating the **App**.
  // new app.AppView();

  // var body = d3.select('body');

  // var data = new app.PictureModel({
  //   //lines: new app.LineCollection()
  // });
  // var picture = new app.PictureView({
  //   model: data, 
  //   container: body, 
  //   width: '960px', 
  //   height: '960px'
  // });

});
