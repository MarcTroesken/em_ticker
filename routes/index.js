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

/* GET home page. */
router.post('/football-data.events', function(req, res, next) {
    fs.appendFile('testlog.txt', JSON.stringify(req.body), function (err) {
      if (err) return console.log(err);
    });

    res.status('200').end();
    // req.app.locals.irc.say('#mulibu2k', 'Hi, @Boerti1525! Nice to have u here!');

    // res.json('done');
});

/* GET home page. */
router.get('/teams', function(req, res, next) {
    var options = {
        method: 'GET',
        uri: 'http://api.football-data.org/v1/soccerseasons/424/teams',
        headers: {
           'X-Auth-Token': config.token
        }
    };

    request(options, (error, response, body) => {
        if (response.statusCode == 200) {
            res.json(JSON.parse(body));
        } else {
            console.log('error');
            console.dir(body);
        }
    });
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
