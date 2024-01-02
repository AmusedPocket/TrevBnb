'use strict';

const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { ValidationError } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        firstName: "bob",
        lastName: "jones",
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        firstName: 'angela',
        lastName: "smith",
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        firstName: "kaitlyn",
        lastName: "jwtoken",
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], { validate: true }).catch(err => {
      if (err instanceof ValidationError) {
        console.log(err);
        throw err.message
      } else {
        console.log(err)
        for (let error of err.errors) {
          console.log(error.record)
          console.log(error.message)
        };
        throw err.errors;
      }
    });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
