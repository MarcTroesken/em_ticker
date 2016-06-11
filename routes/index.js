var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config');
var moment = require('moment');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({status: 'Up and running!'});
});

router.post('/', function(req, res, next) {
    fs.appendFile('testlog.txt', JSON.stringify(req.body), function (err) {
      if (err) return console.log(err);
    });

    res.status('200').end();
});

/* GET home page. */
router.get('/test', function(req, res, next) {
    // Just for testing shit
    var fakeData = {
        "Timestamp": "2015-02-12T14:00:00",
        "Resource": "Fixture",
        "Id": 149885,
        "URI": "http://api.football-data.org/v1/fixtures/149885",
        "Updates": "Score|1:0 -> 1:1"
    }

    // Request options
    var options = {
        method: 'GET',
        uri: fakeData.URI,
        headers: {
           'X-Auth-Token': config.token
        }
    };

    // Request the live data
    request(options, (error, response, body) => {
        if (response.statusCode === 200) {
            // Parse data to json
            var parsed = JSON.parse(body);

            // Parse response for update and generate chat message
            var message = '';

            if(fakeData.Updates.match(/.+?(?=\|)/g) == 'Score') {
                var score = fakeData.Updates.match(/(\d+:\d+)/g);
                message = `Spielstand ${parsed.fixture.homeTeamName} : ${parsed.fixture.awayTeamName} ${score[1]}`;
            } else {
                message = `Das Spiel  ${parsed.fixture.homeTeamName} gegen ${parsed.fixture.awayTeamName} hat begonnen.`;
            }

            req.app.locals.irc.say('#mulibu2k', message);

            res.json({status: 'ok'});
        } else {
            console.log('error');
            console.dir(body);
        }
    });
});

/* GET home page. */
router.post('/football-data.events', function(req, res, next) {
    // Just for testing
    fs.appendFile('testlog.txt', JSON.stringify(req.body), function (err) {
      if (err) return console.log(err);
    });

    res.status('200').end();

    // Do great stuff later
    // req.app.locals.irc.say('#mulibu2k', 'Hi, @Boerti1525! Nice to have u here!');
    // res.json('done');
});

/* GET home page. */
router.get('/fixtures', function(req, res, next) {
    var options = {
        method: 'GET',
        uri: 'http://api.football-data.org/v1/soccerseasons/424/fixtures',
        headers: {
           'X-Auth-Token': config.token
        }
    };

    request(options, (error, response, body) => {
        if (response.statusCode == 200) {
            res.json(JSON.parse(body).fixtures);
            // res.render('index', {games: JSON.parse(body)});
        } else {
            console.log('error');
            console.dir(body);
        }
    });
});

module.exports = router;
