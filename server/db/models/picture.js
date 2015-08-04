var db = require('../config');
require('./line');

var Picture = db.Model.extend({
  tableName: 'Picture',
  hasTimestamps: true,
  lines: function() {
    return this.hasMany('Line');
  }
});

module.exports = db.model('Picture', Picture);
