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
    return food.addUser(req.requestedUser)
  })
  .then ( response => {
    let data = response[0][0]
    return Food.findOne({
      where: {
        id: data.foodId
      },
    });
  })
  .then(food => {
      console.log('HERE', food);
      res.json(food);
  })
  .catch(next);



});

router.delete('/:userId/food', function (req, res, next) {
  let foodName = req.body.food.name.toLowerCase();
  Food.findOne({
    where: {
      name: foodName
    },
    include: [{
      model: User,
      through: {
        where: {userId: req.requestedUser.id}
      }
    }]
  })
    .then(function(food) {
        if (food) return food.destroy();
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
