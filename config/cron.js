var cron = require('node-cron');
var config = require('../config');
var request = require('request');
var _ = require('lodash');

module.exports = function(client) {
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
                var goalsHomeTeam,
                    goalsAwayTeam;

                _(matches.fixtures).forEach((match) => {
                    if (match.status == 'IN_PLAY') {
                        var result = match.result
                        var message = '';

                        if(result.goalsHomeTeam != goalsHomeTeam || result.goalsAwayTeam != goalsAwayTeam) {
                            message = `${match.homeTeamName} - ${match.awayTeamName}  ${result.goalsHomeTeam}:${result.goalsAwayTeam} `;
                            goalsHomeTeam = result.goalsHomeTeam;
                            goalsAwayTeam = result.goalsAwayTeam;
                            client.say('#mulibu2k', message);
                        }
                    }
                });
            } else {
                console.log('error');
                console.dir(body);
            }
        });
    });
}