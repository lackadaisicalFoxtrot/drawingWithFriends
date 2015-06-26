module.exports = function(app) {
  //TODO fix
  app.route('/gallery')
  .get(function(req,res,next){
    var results = [];
    new Pictures({}).fetch().then(function(pictures){
      for(var i = 0; i<pictures.models.length; i++){
        results[i]=[];
        new Lines({picture_id : pictures.get(i).get('id')}).fetch().then(function(lines){ //TODO Lines is already an instance of a collection so this won't work
          for (var i = 0; i < lines.models.length; i++) {
            results[i].push(lines.get(i));
          }
        });
      }
    });
    res.send(results);
  });
};

//module.exports = app;
