'use strict';
const router = require('express').Router();
const db = require('../../../db');
const User = db.model('user');
const Food = db.model('food');
const Promise = require('bluebird');
const expressJWT = require('express-jwt');
const authenticate = expressJWT({secret: 'foodSecret'});
const HttpError = require('../../../utils/HttpError');
var chalk = require('chalk');

router.param('userId', function (req, res, next, id) {
  User.findOne({
    where: {
      id: id
    },
    include: [Food]
  })
  .then(function (user) {
    if (!user) throw HttpError(404);
    req.requestedUser = user;
    next();
  })
  .catch(next);
});

// function assertIsCorrectUser (req, res, next) {
//   console.log('Here', req.token);
//   console.log('Here', req.requestedUser);
//   if (+req.user.id === +req.requestedUser.id) next();
//   else next(HttpError(401));
// }

// router.use(['/:userId/\*','/:userId'],authenticate);

router.post('/:userId/food', function (req, res, next) {
  console.log(req.token);
  let foodName = req.body.food.name.trim().toLowerCase();
  Food.create({
    name: foodName,
    aversion: req.body.food.aversion
  })
  .then( food => {
      return food.addUser(req.requestedUser);
  })
  .then( response => {
    console.log(response[0]);
    res.sendStatus(200);
  })
  .catch(next);



});

router.delete('/:userId/food', function (req, res, next) {
  console.log('Here', req.requestedUser);
  Food.findById(req.body.id)
    .then(function(food) {
        console.log(food);
        return food.destroy();
    })
    .then(function(gr) {
        res.sendStatus(204);
    })
    .catch(next);



});

// router.use('/:userId/graphs',require('../graph/graph.js'));
// router.use('/:userId/datasets',require('../dataset/dataset.js'));

module.exports = router;
