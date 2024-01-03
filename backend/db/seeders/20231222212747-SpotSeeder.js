'use strict';

const { Spot } = require('../models');
// const spots = require('../models/spots');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const validSpots = [
  {
    ownerId: 1,
    address: "123 Jinglebell Lane",
    city: "North Pole",
    state: "AK",
    country: "USA",
    lat: 123.456, 
    lng: 456.789,
    name: "North Pole",
    description: "Santa Claus getting his shop on",
    price: 5000000
  },
  {
    ownerId: 2,
    address: "178 Innout Burger Lane",
    city: "Pasadena",
    state: "CA",
    country: "USA",
    lat: 895.230,
    lng: 345.697,
    name: "In-n-Out Burger",
    description: "Making the best burgers and you know it",
    price: 6700000
  },
  {
    ownerId: 3,
    address: "4567 Athens Drive",
    city: "Savannah",
    state: "GA",
    country: "USA",
    lat: 69.504,
    lng: 34.509,
    name: "Heaven",
    description: "Heaven on earth",
    price: 5940234
  },
]; 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{ 
      await Spot.bulkCreate(validSpots, {
        validate: true,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ["123 Jinglebell Lane", "178 Innout Burger Lane", "4567 Athens Drive"] }
    }, {});
  },
};
