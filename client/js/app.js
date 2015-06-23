// js/app.js
// This file is responsible for instantiating the entire app. Will load on document.ready()  

var app = app || {};

$(function() {

  // Kick things off by creating the **App**.
  // new app.AppView();

  var appModel = new app.AppModel();
  var appView = new app.AppView({model: appModel});

});
