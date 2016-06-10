var bookshelf = require('../config/database');

var Match = bookshelf.Model.extend({
    tableName: 'matchs',
    hasTimestamps: true,
});

module.exports = bookshelf.model('Match', Match);