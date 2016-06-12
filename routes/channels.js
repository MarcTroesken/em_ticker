var express = require('express');
var router = express.Router();
var Channel = require('../models/Channel');

/* Register a new channel name */
router.post('/register', function(req, res, next) {
    new Channel({name: req.body.name})
    .save()
    .then(channel => {
        res.redirect('/');
    });
});

module.exports = router;