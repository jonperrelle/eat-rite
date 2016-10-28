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
  Food.findOrCreate({
    where: {
      name: foodName,
      aversion: req.body.food.aversion
    }
  })
  .spread( (food, created) => {
    return food.addUser(req.requestedUser)
      .then( () => res.json(food))
      .catch(next);
  })
  .catch(next);
});

router.put('/:userId/food', function (req, res, next) {
  console.log(req.token);
  let foodName = req.body.food.name.trim().toLowerCase();
  Food.findById(req.body.id)
  .then(food => {
    return food.removeUser(req.requestedUser)
  })
  .then( (data) => {
    console.log('Here', data);
    return Food.findOrCreate({
      where: {
        name: foodName,
        aversion: req.body.food.aversion
      }
    });
  })
  .spread( (food, created) => {
    return food.addUser(req.requestedUser)
      .then( () => res.json(food))
      .catch(next);
  })
  .catch(next);
});

router.delete('/:userId/food', function (req, res, next) {
  let foodName = req.body.food.name.toLowerCase();
  Food.findOne({
    where: {
      id: req.body.food.id
    }
  })
    .then(function(food) {
        if (food) return food.removeUser(req.requestedUser);
        else new Error('Not in database');
    })
    .then(function(gr) {
        res.sendStatus(204);
    })
    .catch(next);



});

// router.use('/:userId/graphs',require('../graph/graph.js'));
// router.use('/:userId/datasets',require('../dataset/dataset.js'));

module.exports = router;
