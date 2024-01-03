'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const validUsers = [
  {
    username: 'cheesepants',
    firstName: 'Wifey',
    lastName: 'Irving',
    email: "wifey@test.com",
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    username: 'kDog',
    firstName: "Kevin",
    lastName: "Irving",
    email: "kdogrocks@stinkybutt.com",
    hashedPassword: bcrypt.hashSync('password2')
  },
  {
    username: 'bCarrot',
    firstName: "Bradley",
    lastName: "Bo'jax",
    email: 'bCarrotInYa@fluffybutt.com',
    hashedPassword: bcrypt.hashSync('password3')
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
    await User.bulkCreate(validUsers, {
      validate: true
      });
      } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['cheesepants', 'kDog', 'bCarrot'] }
    }, {});
  }
};
