'use strict';

const { User } = require('../models');

const validUsers = [
  {
    username: 'cheesepants',
    firstName: 'Wifey',
    lastName: 'Irving',
    email: "wifey@test.com",
    hashedPassword: 12345
  },
  {
    username: 'kDog',
    firstName: "Kevin",
    lastName: "Irving",
    email: "kdogrocks@stinkybutt.com",
    hashedPassword: 542309
  },
  {
    username: 'bCarrot',
    firstName: "Bradley",
    lastName: "Bo'jax",
    email: 'bCarrotInYa@fluffybutt.com',
    hashedPassword: 4596970
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
    for(let user of validUsers){
      try {
        await User.destroy({
          where: user
        }); 
      } catch (err){
        console.log(err);
        throw err;
      }
    }
  }
};
