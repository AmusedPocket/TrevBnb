'use strict';
const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

const validSpotImages = [
  {
    spotId: 1,
    url: "www.randomimage.com/1",
    preview: true,
  },
  {
    spotId: 1,
    url: "www.randomimage.com/2",
    preview: true,
  },
  {
    spotId: 1,
    url: "www.randomimage.com/3",
    preview: true,
  },
  {
    spotId: 2,
    url: "www.randomimage.com/4",
    preview: true,
  },
  {
    spotId: 2,
    url: "www.randomimage.com/5",
    preview: true,
  },
  {
    spotId: 2,
    url: "www.randomimage.com/6",
    preview: true,
  },
  {
    spotId: 3,
    url: "www.randomimage.com/7",
    preview: true,
  },
  {
    spotId: 3,
    url: "www.randomimage.com/8",
    preview: true,
  },
  {
    spotId: 3,
    url: "www.randomimage.com/9",
    preview: true,
  }
]

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
      await SpotImage.bulkCreate(validSpotImages, {
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    }, {});
  }
};
