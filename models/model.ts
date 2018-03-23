var UserMetaData = require('./user.js');
var connection = require('../config/sequelize.js');

var User = connection.define('users', UserMetaData.attributes, UserMetaData.options);

module.exports.User = User;
