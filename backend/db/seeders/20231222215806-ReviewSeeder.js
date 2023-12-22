'use strict';

const { Review } = require('../models');

const validReviews = [
  {
    spotId: 1,
    userId: 1,
    review: "best place ever",
    stars: 5
  }, 
  {
    spotId: 1,
    userId: 2,
    review: "dogs do reviews?",
    stars: 5 
  }, 
  {
    spotId: 1,
    userId: 3,
    review: "hip place to be",
    stars: 3
  }, 
  {
    spotId: 2,
    userId: 1,
    review: "not that good honestly",
    stars: 1
  }, 
  {
    spotId: 2,
    userId: 2,
    review: "best burger I ever had",
    stars: 4
  }, 
  {
    spotId: 2,
    userId: 3,
    review: "I don't like burgers",
    stars: 1
  }, 
  {
    spotId: 3,
    userId: 1,
    review: "would love to live here",
    stars: 5
  }, 
  {
    spotId: 3,
    userId: 2,
    review: "yeah it's alright",
    stars: 5
  }, 
  {
    spotId: 3,
    userId: 3,
    review: "5/5 would hop again",
    stars: 5
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
    await Review.bulkCreate(validReviews, {
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
    for(let review of validReviews){
      try{
        await Review.destroy({
          where: review
        })
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
