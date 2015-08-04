// This file is responsible for instantiating the entire app. Will load on document.ready()
var app = app || {};

$(function() {
  $('.item, .menu-li').click(function(e){
    $('.item').toggle();
  });
  var router = new app.router();
  Backbone.history.start();
});
