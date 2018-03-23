var Sequelize = require('sequelize');

var attributes = {
  username: {
    type: 'VARCHAR',
    allowNull: false,
    unique: true
  },
  email: {
    type: 'VARCHAR',
    validate: {
      isEmail: true
    }
  },
  password: {
    type: 'VARCHAR'
  },
  salt: {
    type: 'VARCHAR'
  },
  account_type: {
    type: 'VARCHAR'
  }
}

module.exports.attributes = attributes;
