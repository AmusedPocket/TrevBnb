'use strict';

const { Bookings } = require('../models');

const validBookings = [
  {
    spotId: 1,
    userId: 1,
    startDate: "2023-03-09",
    endDate: "2023-03-14"
  },
  {
    spotId: 1,
    userId: 2,
    startDate: "2023-03-09",
    endDate: "2023-03-14"
  },
  {
    spotId: 1,
    userId: 3,
    startDate: "2023-03-09",
    endDate: "2023-03-14"
  },
  {
    spotId: 2,
    userId: 1,
    startDate: "2023-03-09",
    endDate: "2023-03-14"
  },
  {
    spotId: 2,
    userId: 2,
    startDate: "2023-03-09",
    endDate: "2023-03-14"
  },
  {
    spotId: 2,
    userId: 3,
    startDate: "2023-03-09",
    endDate: "2023-03-14"
  },
  {
    spotId: 3,
    userId: 1,
    startDate: "2023-03-09",
    endDate: "2023-03-14"
  },
  {
    spotId: 3,
    userId: 2,
    startDate: "2023-03-09",
    endDate: "2023-03-14"
  },
  {
    spotId: 3,
    userId: 3,
    startDate: "2023-03-09",
    endDate: "2023-03-14"
  },

];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try {
      await Bookings.bulkCreate(validBookings, {
        validate: true
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      for (let booking of validBookings){
        try {
          await Bookings.destroy({
            where: booking
          });
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
    }
};
