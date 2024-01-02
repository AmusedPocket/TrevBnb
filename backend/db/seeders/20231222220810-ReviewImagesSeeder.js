'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

const validReviewImages = [
  {
    reviewId: 1,
    url: "https://randomimage.com/123"
  },
  {
    reviewId: 1,
    url: "https://randomimage.com/456"
  },
  {
    reviewId: 1,
    url: "https://randomimage.com/543"
  },
  {
    reviewId: 2,
    url:"https://randomimage.com/125"
  },
  {
    reviewId: 2,
    url: "https://randomimage.com/095"
  },
  {
    reviewId: 2,
    url: "https://randomimage.com/943"
  },
  {
    reviewId: 3,
    url: "https://randomimage.com/345"
  },
  {
    reviewId: 3,
    url: "https://randomimage.com/157"
  },
  {
    reviewId: 3,
    url: "https://randomimage.com/653"
  },
  {
    reviewId: 4,
    url: "https://randomimage.com/347"
  },
  {
    reviewId: 4,
    url: "https://randomimage.com/740"
  },
  {
    reviewId: 4,
    url: "https://randomimage.com/260"
  },
  {
    reviewId: 5,
    url: "https://randomimage.com/360"
  },
  {
    reviewId: 5,
    url: "https://randomimage.com/364"
  },
  {
    reviewId: 5,
    url: "https://randomimage.com/365"
  },
  {
    reviewId: 6,
    url: "https://randomimage.com/170"
  },
  {
    reviewId: 6,
    url: "https://randomimage.com/272"
  },
  {
    reviewId: 6,
    url: "https://randomimage.com/202"
  },
  {
    reviewId: 7,
    url: "https://randomimage.com/404"
  },
  {
    reviewId: 7,
    url: "https://randomimage.com/181"
  },
  {
    reviewId: 7,
    url: "https://randomimage.com/820"
  },
  {
    reviewId: 8,
    url: "https://randomimage.com/507"
  },
  {
    reviewId: 8,
    url: "https://randomimage.com/340"
  },
  {
    reviewId: 8,
    url: "https://randomimage.com/180"
  },
  {
    reviewId: 9,
    url: "https://randomimage.com/150"
  },
  {
    reviewId: 9,
    url: "https://randomimage.com/457"
  },
  {
    reviewId: 9,
    url: "https://randomimage.com/809"
  },
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
      await ReviewImage.bulkCreate(validReviewImages, {
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
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27] }
    }, {});
  }
};
