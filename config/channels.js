var Channel = require('../models/Channel');

module.exports = function() {
    return new Promise((resolve, reject) => {
        Channel
        .fetchAll()
        .then(channels => {
            var names = [];

            channels.forEach(channel => {
                names.push(channel.get('name'));
            });

            resolve(names);
        });
    });
};