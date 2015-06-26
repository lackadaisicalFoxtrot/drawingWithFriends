var db = require('../config');
require('./picture'); //don't need var assignment, using bookshelf registry

var Line = db.Model.extend({
  tableName: 'Line',
  hasTimestamps: true,
  picture: function() {
    return this.belongsTo('Picture', 'picture_id');
  }
});

module.exports = db.model('Line', Line); //use bookshelf registry plugin to avoid circular referencing problems
