var path = require('path');

var knex = require('knex')({
  client : 'mysql',
  connection : {
    host : 'mysql://bce4aa9540cd42:3d503e7b@us-cdbr-iron-east-02.cleardb.net/heroku_05d76989f3d1130?reconnect=true',
    user : 'root',
    password : '123',
    database : 'test', //for now, or making a schema to make a custom local db/open sql to make
    charset : 'utf8',
  }
});

var bookshelf = require('bookshelf')(knex);

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
      line.integer('picture_id');
      line.timestamps();
    }).then(function (table) {
      console.log('Created table', table);
    });
  }
});
module.exports = bookshelf;
