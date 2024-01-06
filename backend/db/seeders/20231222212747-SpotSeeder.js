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
  {
    ownerId: 4,
    address: "456 Eightball Drive",
    city: "Pooltable",
    state: "OH",
    country: "USA",
    lat: 39.30, 
    lng: 104.23,
    name: "Hole in the wall Pool",
    description: "It's a pool table",
    price: 40
  },
  {
    ownerId: 5,
    address: "235 Taco Court",
    city: "Irvine",
    state: "CA",
    country: "USA",
    lat: 50.43,
    lng: 13.76,
    name: "Not a Taco Bell",
    description: "Joking its a taco bell",
    price: 125
  },
  {
    ownerId: 6,
    address: "940 Bose Drive",
    city: "Sleepbuds",
    state: "IL",
    country: "USA",
    lat: 32.09,
    lng: -4.39,
    name: "Sleep Buds",
    description: "Not working but had to send them back",
    price: 97
  },
  {
    ownerId: 1,
    address: "457 Xbox Drive",
    city: "Belevue",
    state: "WA",
    country: "USA",
    lat: 45.78, 
    lng: -57.90,
    name: "Microsoft HQ",
    description: "Making Green Boxes",
    price: 234567
  },
  {
    ownerId: 2,
    address: "178 Narobia Street",
    city: "Savannah",
    state: "GA",
    country: "USA",
    lat: 57.90,
    lng: 45.63,
    name: "Narobia Dining",
    description: "Best breakfast you've ever had",
    price: 67
  },
  {
    ownerId: 3,
    address: "157 Google Pixel Drive",
    city: "San Mateo",
    state: "CA",
    country: "USA",
    lat: 35.20,
    lng: 34.509,
    name: "Google pixel phones",
    description: "It's a phone!",
    price: 5940234
  },
  {
    ownerId: 4,
    address: "983 Cucapa Drive",
    city: "Flagstaff",
    state: "AZ",
    country: "USA",
    lat: 45.32, 
    lng: -19.23,
    name: "Beer Cap",
    description: "Beer on the map",
    price: 115
  },
  {
    ownerId: 5,
    address: "157 Dust Bowl Street",
    city: "Turlock",
    state: "CA",
    country: "USA",
    lat: 45.23,
    lng: 9.18,
    name: "Dust Bowl Brewery",
    description: "Serving great beer",
    price: 95
  },
  {
    ownerId: 6,
    address: "157 Cigar City",
    city: "Miami",
    state: "FL",
    country: "USA",
    lat: 9.45,
    lng: -42.39,
    name: "Cigar City Brewery",
    description: "Hip Hip, Huray!",
    price: 170
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
