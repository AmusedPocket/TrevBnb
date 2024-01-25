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
    address: "1509 Union Street",
    city: "Alameda",
    state: "CA",
    country: "USA",
    lat: 45.79, 
    lng: 103.23,
    name: "Newly Built Modern Home w/free parking!",
    description: "Do you want to enjoy a stylish experience at this centrally-located home on an island city?  Do you want to have the convenience of walking to our mile long beach where you can watch the sunsets over the San Francisco?    Then come over and enjoy my newly built mid century modern cottage in the friendly island town of Alameda!",
    price: 155
  },
  {
    ownerId: 2,
    address: "259 Page Street",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    lat: 23.04,
    lng: 143.79,
    name: "Golden Gate Apex Hideaway",
    description: "Wake up to rooftop views and sink into an inviting armchair under the eaves of this vibrant third-floor oasis. Freshen up in the chic, tiled shower with a revitalizing rain dance mode, then take it easy in front of a movie on the 72-inch TV.    The Orange Suite is a convenient, kitchenless studio on the 3rd floor of my house! It offers a comfy firm queen bed, a new bathroom and fixtures, refrigerator, toaster, microwave, espresso maker, as well as the sweetest sitting area in orange you ever will see with couch, chairs, bean bag chair and tv. I love spending time under the cozy slanted ceilings!",
    price: 141
  },
  {
    ownerId: 3,
    address: "4361 Lincoln Ave",
    city: "Oakland",
    state: "CA",
    country: "USA",
    lat: 69.504,
    lng: 34.509,
    name: "Hiking, Biking & Bay Area Views!",
    description: "This beautiful home in the east bay hills boasts spectacular views of the entire bay area, from San Jose to Marin. It is a short walk or drive from many miles of trails for hiking, horseback riding and mountain biking. It also provides immediate access to many miles of the bay area's best road biking on Skyline Boulevard. This tranquil retreat is a short drive to Montclair Village, Rockridge, Temescal, Piedmont and Berkeley for a wide variety of amazing dining, music and fun! Enjoy the view!",
    price: 486
  },
  {
    ownerId: 4,
    address: "188 King Street",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    lat: 39.30, 
    lng: 104.23,
    name: "Entire condo in San Francisco, California",
    description: "This condo is located in the Heart of San Francisco is close in proximity to many amazing local attractions, restaurants, and transportation options. Best Waterfront & City View + Free Reserved Parking. A New Experience for Better Stay/Living - Retreat and boost for your work week and getaway! Live, work, and play in style.",
    price: 680
  },
  {
    ownerId: 5,
    address: "1935 Webster Street",
    city: "Oakland",
    state: "CA",
    country: "USA",
    lat: 50.43,
    lng: 13.76,
    name: "Kaval Park - Peaceful Urban Oasis",
    description: "Kick back and relax in this serene modern home. Enjoy your morning coffee on the flowering garden patio, read a book and pick your own figs, lemons from the garden. It's a private, peaceful and beautiful space, designed with minimum impact in mind - on the border with Berkeley, Oakland and Emeryville, across Bay Bridge from San Francisco. Hop on the Bay Bridge and go into the city - San Francisco is a short drive away, 20 - 40 min depends on the traffic! Fiber Optic Wi-Fi. Off street parking.",
    price: 325
  },
  {
    ownerId: 6,
    address: "1001 Rispin Dr",
    city: "Oakland",
    state: "CA",
    country: "USA",
    lat: 32.09,
    lng: -4.39,
    name: "Famed Maybeck Mansion and Botanical Park",
    description: "A 4500 sq ft. home designed by the architect of the Palace of Fine Arts, Bernard Maybeck in the midst of a landscaped botanical park. The residence is in a hidden enclave close to the University of California Berkeley and the Claremont Hotel. Past guests include movie stars, iconic chefs such as Julia Childs, Academy award winning music has been composed on the piano in the living room and we look forward to hosting you as well.",
    price: 2500
  },
  {
    ownerId: 1,
    address: "1003 61st Street",
    city: "Oakland",
    state: "CA",
    country: "USA",
    lat: 45.78, 
    lng: -57.90,
    name: "Private room in guest suite in Oakland, California",
    description: "This house is a multiplex. My husband and I live upstair unit 3. If you stay in this house, you will stay in a separate downstair unit 1, 2 & container in backyard. There is a door accessing the backyard from the last room of the main unit. You can go to the backyard, container, basement unit and the laundry room. Also you can access backyard through an external side wooden gate as well.",
    price: 477
  },
  {
    ownerId: 2,
    address: "1725 North Point Street",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    lat: 57.90,
    lng: 45.63,
    name: "•:• Marina Star SF •:• 1 BR Private Modern Suite",
    description: "✸ Marina Star SF Suite ✸ A private, one-bedroom suite that is spacious (1,000 sf), bright, and centrally located. This beautifully-appointed flat is architect designed and newly remodeled with unique finishes and top-of-the-line amenities. Conveniently located in the heart of the Marina, sight seeing, shopping, cafes, and many of San Francisco's best restaurants are merely minutes from the front door.",
    price: 225
  },
  {
    ownerId: 3,
    address: "246 Mountain Home Road",
    city: "Woodside",
    state: "CA",
    country: "USA",
    lat: 35.20,
    lng: 34.509,
    name: "Luxury Mid-Century Modern Home w/ XL Deck",
    description: "Newly remodeled 5-bedroom (note: 1 bedroom doubles as an office), 3-bath home - walking distance to the Mountain Terrace wedding venue, Alice's Restaurant, and 10 minutes from Sand Hill Road in Palo Alto. Can accommodate up to 12 guests to comfortably sleep.  NOTE: We do allow gatherings, events, and parties to be held on-site for a $1500 fee; please message us for approval.",
    price: 953
  },
  {
    ownerId: 4,
    address: "32 Ford Street",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    lat: 45.32, 
    lng: -19.23,
    name: "Fabulous Studio in the Castro District",
    description: "This classy studio is in the heart of Castro, close to restaurants, bars, coffee shops and public transportation. The studio has a king size Casper bed, large Smart TV (no cable), Sonos sound system, a kitchenette with a refrigerator, dishwasher (huge plus!), sink, microwave, and coffee maker (no stove). There is an in unit washer and dryer for your convenience.",
    price: 296
  },
  {
    ownerId: 5,
    address: "6701 Shellmound Street",
    city: "Emeryville",
    state: "CA",
    country: "USA",
    lat: 45.23,
    lng: 9.18,
    name: "Cozy Emeryville Studio, Near Beaches & Parks!",
    description: "Experience Emeryville with ease in this studio, 2-bathroom vacation rental. Offering a full kitchen, a comfortable living area with a sauna, Smart TVs, and access to the rooftop, this property is perfect for sharing memory-filled moments or enjoying a solo retreat! Centrally located, this property allows for beachside days or time spent exploring Jack London Square. Find your next perfect pairing at Cinque Capre Vineyards or York Creek Vineyards. 'Vacation You' is just around the corner!",
    price: 321
  },
  {
    ownerId: 6,
    address: "1802 Bonita Ave",
    city: "Berkeley",
    state: "CA",
    country: "USA",
    lat: 9.45,
    lng: -42.39,
    name: "(3 BED)Modern Two BED + Detached Studio in Elmwood",
    description: "This unique 3 Bed rental is a combo of a 2 Bed garden level of a newly remodeled duplex as well as a detached studio in the heart of Elmwood located walking distance to the University, shops, and BART. You will have access to both the garden suite and the studio. Garden Suite has 2 Bedrooms, a kitchenette and living room with minimalist style. Studio is separate and detached. The garden suite is connected via a stair case to the owners level above but you will have private entrance and access.",
    price: 500
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
      country: { [Op.in]: ["USA"] }
    }, {});
  },
};
