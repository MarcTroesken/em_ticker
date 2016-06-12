var cron = require('node-cron');
var config = require('../config');
var request = require('request');
var _ = require('lodash');
var Channel = require('../models/Channel');
var async = require('async');
var goalsHomeTeam,
    goalsAwayTeam;

module.exports = function(client) {
    async.series([
        callback => {
            Channel
            .fetchAll()
            .then(channels => {
                var names = [];

                channels.forEach(channel => {
                    names.push(channel.get('name'));
                });

                callback(null, names);
            });
        }
    ], (err, results) => {
        cron.schedule('* * * * *', function(){
            // Request options
            var options = {
                method: 'GET',
                uri: 'http://api.football-data.org/v1/soccerseasons/424/fixtures',
                headers: {
                   'X-Auth-Token': config.token
                }
            };

            // Request the live data
            request(options, (error, response, body) => {
                if (response.statusCode === 200) {
                    // Parse data to json
                    var matches = JSON.parse(body);

                    // Loop trough all listed games
                    _(matches.fixtures).forEach((match) => {
                        if (match.status == 'IN_PLAY') {
                            var result = match.result
                            var message = '';

                            // If there is any change in the result post message
                            if(result.goalsHomeTeam != goalsHomeTeam || result.goalsAwayTeam != goalsAwayTeam) {
                                message = `${match.homeTeamName} - ${match.awayTeamName}  ${result.goalsHomeTeam}:${result.goalsAwayTeam} `;
                                goalsHomeTeam = result.goalsHomeTeam;
                                goalsAwayTeam = result.goalsAwayTeam;

                                // Loop trough all channel names and do the post
                                _(results[0]).forEach(name => {
                                    client.say(name, message);
                                });
                            }
                        }
                    });
                } else {
                    console.log('error');
                    console.dir(body);
                }
            });
        });
    });
}