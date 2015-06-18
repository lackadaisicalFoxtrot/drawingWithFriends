var db = require('../config.js');
var Line = require('./line.js');

var Picture = db.model.extend({
  tablename : 'pictures',
  hasTimestamps : true,
  lines : function () {
    return this.hasMany(Line);
  },

});

module.exports = Picture;