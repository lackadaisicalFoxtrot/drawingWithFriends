var db = require('../config.js');
var Line = require('./line.js');

var Picture = db.Model.extend({
  tablename : 'Picture',
  hasTimestamps : true,
  lines : function () {
    return this.hasMany(Line);
  },

});

module.exports = Picture;
