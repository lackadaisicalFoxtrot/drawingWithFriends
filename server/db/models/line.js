var db = require('../config.js');
var Picture = require('./picture.js');

var Line = db.Model.extend({
  tableName : 'Line',
  hasTimestamps : false,
  picture : function () {
    return this.belongsTo(Picture, 'picture_id');
  },

});

module.exports = Line;
