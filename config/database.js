var dbConfig = require('../knexfile.js')[process.env.NODE_ENV || 'development'];

var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');
bookshelf.plugin('virtuals');

module.exports = bookshelf;