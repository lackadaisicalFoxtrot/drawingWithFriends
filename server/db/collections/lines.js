var db = require('../config');
var Line = require('../models/line');

var Lines = new db.Collection();

Lines.model = Line;

module.exports = Lines;