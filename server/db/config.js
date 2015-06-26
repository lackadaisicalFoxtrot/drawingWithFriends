var path = require('path');

var knex = require('knex')({
  client : 'mysql',
  connection : {
    host : '127.0.0.1',
    user : 'root',
    //password : '123',
    database : 'test', //for now, or making a schema to make a custom local db/open sql to make
    charset : 'utf8',
  }
});

var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

bookshelf.knex.schema.hasTable('Picture').then(function (exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('Picture', function (picture) {
      picture.increments('id').primary();
      picture.timestamps();
    }).then(function (table) {
      console.log('Created table', table);
    });
  }
});
bookshelf.knex.schema.hasTable('Line').then(function (exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('Line', function (line) {
      line.increments('id').primary();
      line.string('coordinates', 100000); //json
      line.integer('picture_id').references('picture.id');
      line.timestamps();
    }).then(function (table) {
      console.log('Created table', table);
    });
  }
});
module.exports = bookshelf;
