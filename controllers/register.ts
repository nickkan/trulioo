var bcrypt = require('bcrypt');
var Model = require('../models/model');
var sendgrid = require('sendgrid')('app47270760@heroku.com', '78hhfjfx2663');

module.exports.show = function(req, res) {
  res.render('register', {title: 'Kapow!'});
}

module.exports.register = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  var email = req.body.email;
  var account_type = req.body.account_type;

  if(!username || !password || !confirmPassword || !email) {
    req.flash('error', "Please ensure all fields are filled.");
    res.redirect('register');
  }

  if(password !== confirmPassword) {
    req.flash('error', "Passwords do not match.");
    res.redirect('register');
  }

  var salt = bcrypt.genSaltSync(9);
  var hashedPassword = bcrypt.hashSync(password, salt);

  var newUser = {
    username: username,
    password: hashedPassword,
    email: email,
    salt: salt,
    account_type: account_type
  }

  Model.User.create(newUser).then(function() {
    res.redirect('/');

    sendgrid.send({
      to: req.body.email,
      from: 'noreply@team3.com',
      subject: 'Kapow Registration',
      text: 'This is an email confirmation of you successful registration.'
    }, function(err, json) {
      if(err) {
        return console.error(err);
      }
      console.log(json);
    });
  }).catch(function(error) {
    console.log(error);
    req.flash('error', "Username has been taken.");
    res.redirect('/register');
  })
}
