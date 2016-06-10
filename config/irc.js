var irc = require('irc');
var config = require('../config');


var client = new irc.Client('irc.chat.twitch.tv', 'em_ticker', {
    channels: ['#mulibu2k'],
    password: config.oAuth
});

module.exports = client;