'use strict';
const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, db) {

    const User = db.model('user');
    const Food = db.model('food');
    const Product = db.model('product');

    // When passport.authenticate('local') is used, this function will receive
    // the email and password to run the actual authentication logic.
    let strategyFn = function(email, password, done) {
        User.findOne({
                where: {
                    email: email
                },
                include: [
                    {model: Food},
                    {model: Product},
                ]
            })
            .then(function(user) {
                // user.correctPassword is a method from the User schema.
                if (!user || !user.correctPassword(password)) {
                    done(null, false);
                } else {
                    // Properly authenticated.
                    done(null, user);
                }
            })
            .catch(done);
    };

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, strategyFn));

    // A POST /login route is created to handle login.
    app.post('/auth/login', function(req, res, next) {

        let authCb = function(err, user) {

            if (err) return next(err);

            if (!user) {
                const error = new Error('Invalid login credentials.');
                error.status = 401;
                return next(error);
            }

            // req.logIn will establish our session.
            req.logIn(user, function(loginErr) {
                if (loginErr) return next(loginErr);
                // We respond with a response object that has user with _id and email.

                req.token = jwt.sign({
                    id: req.user.id,
                }, 'foodSecret', {
                    expiresIn: '1h'
                });

                res.status(200).send({
                    user: user.sanitize(),
                    token: req.token
                });
            });

        };

        passport.authenticate('local', {'session': false}, authCb)(req, res, next);

    });

    app.post('/auth/signup', function(req, res, next) {

        let user = {
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
        };

        return User.create(user)
            .then(function(newUser){
                user = {};
                return res.sendStatus(201);
            })
            .catch(function(){res.sendStatus(401)})
    });

};
