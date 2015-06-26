var db = require('../config');
require('./line'); //don't need to assign to var as we're using bookshelf registry to avoid circular referencing

var Picture = db.Model.extend({
  tableName: 'Picture',
  hasTimestamps: true,
  lines: function() {
    return this.hasMany('Line');
  }
});

module.exports = db.model('Picture', Picture); //circular referencing break
