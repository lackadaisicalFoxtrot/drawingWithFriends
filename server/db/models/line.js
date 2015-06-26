var db = require('../config.js');
var Picture = require('./picture.js');

var Line = db.Model.extend({
  tableName: 'Line',
  hasTimestamps: true,
  picture: function() {
    return this.belongsTo(Picture);
  }
});

module.exports = Line;
