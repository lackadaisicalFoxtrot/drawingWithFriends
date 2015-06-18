var path = require('path');
var knex = require('knex')({
  client : 'mysql',
  connection : {
    host : '127.0.0.1',
    user : 'root',
    password : '123',
    database : 'pictureDB',
    charset : 'utf8',
    filename: path.join(__dirname, './pictureDB.sql')
  }
});

var bookshelf = require('bookshelf')(knex);

bookshelf.knex.schema.hasTable('pictures').then(function (exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('pictures', function (picture) {
      picture.increments('id').primary();
      picture.timestamps();
    }).then(function (table) {
      console.log('Created table', table);
    });
  }
});
bookshelf.knex.schema.hasTable('lines').then(function (exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('lines', function (line) {
      line.increments('id').primary();
      line.string('d', 100000);
      line.integer('picture_id');
    }).then(function (line) {});
  }
});
module.exports = bookshelf;