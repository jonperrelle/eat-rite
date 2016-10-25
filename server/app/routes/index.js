'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/scanner',require('./scanner'));
router.use('/users',require('./user'));

router.use(function (req, res) {
    res.status(404).end();
});
