var db = require('../config');
var Picture = require('../models/picture');

var Pictures = new db.Collection();

Pictures.model = Picture;

module.exports = Pictures;