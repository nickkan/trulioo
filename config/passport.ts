var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var Model = require('../models/model.js');

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(
    function(username, password, done) {
      Model.User.findOne({
        where: {
          'username': username
        }
      }).then(function (user) {
        if (user == null) {
          return done(null, false, {message: 'Incorrect username or password.' });
        }

        var hashedPassword = bcrypt.hashSync(password, user.salt);

        if (user.password === hashedPassword) {
          return done(null, user);
        }

        return done(null, false, { message: 'Incorrect username or password.' });
      })
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  // passport.deserializeUser(function(username, done) {
  //     done(null, username);
  // });

  passport.deserializeUser(function(username, done) {
    Model.User.findOne({
      where: {
        'username': username
      }
    }).then(function (user) {
      done(null, user);
    });
  });

};
