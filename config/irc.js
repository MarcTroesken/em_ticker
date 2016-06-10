var irc = require('irc');
var config = require('../config');
var Channel = require('../models/Channel');

Channel.fetchAll().then(channels => {
    var names = [];

    channels.forEach(channel => {
        names.push(channel.get('name'));
        console.log('Channel: ' + channel.get('name'));
    });

    var client = new irc.Client('irc.chat.twitch.tv', 'em_ticker', {
        channels: names,
        password: config.oAuth
    });

    module.exports = client;
});

