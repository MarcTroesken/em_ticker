var bookshelf = require('../config/database');

var Channel = bookshelf.Model.extend({
    tableName: 'channels',
    hasTimestamps: true,
});

module.exports = bookshelf.model('Channel', Channel);