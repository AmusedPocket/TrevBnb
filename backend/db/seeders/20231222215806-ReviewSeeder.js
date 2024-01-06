'use strict';

const { Review } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
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
  {
    spotId: 4,
    userId: 4,
    review: "It's alright",
    stars: 3
  }, 
  {
    spotId: 4,
    userId: 5,
    review: "Index cards are fun",
    stars: 4
  }, 
  {
    spotId: 4,
    userId: 6,
    review: "Not the best not the worst",
    stars: 3
  }, 
  {
    spotId: 5,
    userId: 4,
    review: "I'd rather not go again",
    stars: 1
  }, {
    spotId: 5,
    userId: 5,
    review: "No please NO",
    stars: 3
  }, {
    spotId: 5,
    userId: 6,
    review: "Hurray hurray....",
    stars: 4
  }, {
    spotId: 6,
    userId: 4,
    review: "I got nothing better to do",
    stars: 4
  }, {
    spotId: 6,
    userId: 5,
    review: "Sure....",
    stars: 5
  }, {
    spotId: 6,
    userId: 6,
    review: "Best place ever",
    stars: 5
  }, {
    spotId: 7,
    userId: 4,
    review: "This place again?",
    stars: 1
  }, {
    spotId: 7,
    userId: 5,
    review: "Call me an odd ball but I loved it",
    stars: 5
  }, {
    spotId: 7,
    userId: 6,
    review: "Eh, sure, I guess",
    stars: 3
  }, {
    spotId: 8,
    userId: 4,
    review: "This isn't taco bell....",
    stars: 1
  }, {
    spotId: 8,
    userId: 5,
    review: "I loved it!",
    stars: 5
  }, {
    spotId: 8,
    userId: 6,
    review: "It has a roof, that was about it",
    stars: 3
  }, {
    spotId: 9,
    userId: 4,
    review: "Well, why not?",
    stars: 2
  }, {
    spotId: 9,
    userId: 5,
    review: "AMAZING",
    stars: 4
  }, {
    spotId: 9,
    userId: 6,
    review: "Would love to come back again",
    stars: 5
  }, {
    spotId: 10,
    userId: 4,
    review: "let's try for another place",
    stars: 1
  }, {
    spotId: 10,
    userId: 5,
    review: "Beds were full of bed bugs",
    stars: 2
  }, {
    spotId: 10,
    userId: 6,
    review: "Okay, well; not coming back.",
    stars: 2
  }, {
    spotId: 11,
    userId: 4,
    review: "Amazing views",
    stars: 5
  }, {
    spotId: 11,
    userId: 5,
    review: "Neighbors were loud",
    stars: 3
  }, {
    spotId: 11,
    userId: 6,
    review: "I enjoyed it",
    stars: 4
  }, {
    spotId: 12,
    userId: 4,
    review: "My cousin owns it, so I stayed for free",
    stars: 5
  }, {
    spotId: 12,
    userId: 5,
    review: "Too expensive for what you get",
    stars: 3
  }, {
    spotId: 12,
    userId: 6,
    review: "No complaints",
    stars: 4
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      stars: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
