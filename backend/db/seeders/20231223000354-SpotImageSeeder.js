'use strict';
const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

const validSpotImages = [
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-770631037940585870/original/0ecd137d-d045-40d9-9f03-1fe62d166338.jpeg?im_w=1200",
    preview: true,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-770631037940585870/original/4cd5b58b-4b44-4dc0-ab6d-df9559578790.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-770631037940585870/original/e4504573-faf5-4b4d-834a-83fb68c45c97.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-770631037940585870/original/4b0fcceb-a7b0-4a53-b9b8-347f572cea77.jpeg?im_w=720",
    preview: true,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-770631037940585870/original/0179cdfd-0354-49fc-a6c9-3d5d39f3c316.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/d9f7d265-cbca-47a7-91e9-6293692789a6.jpg?im_w=1200",
    preview: true,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/3c97ee26-580c-4bc8-b8e8-d19f1c8c23b4.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/5db7fe79-9758-464b-ade3-a0aeaa3e2382.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/monet/Select-3720392/original/955dd3aa-534e-4d0e-9643-f588df410d00?im_w=1440",
    preview: true,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/d139527e-1255-44d3-b5ad-d54f245e5c7f.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-904459261671463001/original/9e78dfce-eb3e-45a2-a66d-bd9e6414dee0.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-904459261671463001/original/e0595c82-6a36-4ee9-973b-5ab06522dbba.jpeg?im_w=1200",
    preview: true,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-904459261671463001/original/5160a206-5c10-4007-8726-7fe655aab784.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-904459261671463001/original/5254dd87-21de-49a5-8c81-d679fe069f9b.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-904459261671463001/original/214af0a5-3ada-4d2b-9109-bfab4a540326.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/hosting/Hosting-975388631678738792/original/84ceb98f-f063-4694-bfde-22c102505eb1.jpeg?im_w=1200",
    preview: true,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/hosting/Hosting-975388631678738792/original/467e0a86-81fb-4328-9629-b0c8bb31930c.jpeg?im_w=1440", 
    preview: true,
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-975388631678738792/original/7e65da6b-1778-4593-bb8e-d0df1ba13086.jpeg?im_w=1440',
    preview: true,
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-975388631678738792/original/f9a5be7c-6ece-4488-abfb-27e758b887b6.jpeg?im_w=1440',
    preview: true,
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-975388631678738792/original/650ee2df-1be4-4588-850c-7759c21e44ed.jpeg?im_w=1440',
    preview: true,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/3a963607-ab65-4089-95ab-30829b46217f.jpg?im_w=1200",
    preview: true,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/97fd3590-99c2-4bb2-93b1-4f0934a41262.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/adc746b7-551d-47de-a5b9-e4cd7e178efb.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-776825883678514176/original/6408b7ba-2c5b-4d6c-8dbf-d6b3faca1bb8.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/5494ad78-ed55-4be6-82b7-a4e6308f1b27.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/6003384/4dfc82ed_original.jpg?im_w=1200",
    preview: true,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/8818242/f76871a6_original.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/6003416/98bd9e4c_original.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/6003434/ad92ea50_original.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/8818215/f5ee7462_original.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/f1c9339b-8851-4719-ba3e-cb7a5c87fdad.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/60c744c3-0629-43c3-b4d1-22739cb7ad1c.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/92ef2583-e8f2-4107-8f06-fb936e857858.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/dce6499b-4879-4f7d-a7a7-973ef21b3a31.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/ea92743c-d0eb-4ea7-92b7-b908fd42a785.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA2ODIwMzU2NjM5MTE3NzY0OQ%3D%3D/original/6a2f98bf-c704-4a97-80ef-673f4861bd14.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA2ODIwMzU2NjM5MTE3NzY0OQ%3D%3D/original/714ad01d-3d37-4cbc-b473-154413f758c8.jpeg?im_w=1200",
    preview: true,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-1068203566391177649/original/19d1ca1c-d8a5-4c2e-a173-c8040dc08a21.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-580591584462440293/original/37b0d882-0aa3-4ede-a318-f3c2a3ad2218.jpeg?im_w=1200",
    preview: true,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/cbddb187-7eb7-4dff-8655-69e7f39f0454.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/airflow/Hosting-869136186140044480/original/dfdf410c-3d2c-49f1-bf35-e229fdc4e4f8.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/airflow/Hosting-869136186140044480/original/21a4a817-5138-4198-9a67-a13a0d710a8b.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/airflow/Hosting-869136186140044480/original/f628e78a-2e50-4d51-a14e-7898f81c5e7d.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/airflow/Hosting-869136186140044480/original/6789bd70-3bbe-437d-a876-13a04a78532d.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/airflow/Hosting-869136186140044480/original/287da9fa-22d2-4aa8-aea1-f3c140417754.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 10,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-663047756982570616/original/6900d208-ba73-452e-ac9b-d7af68f08961.jpeg?im_w=1200",
    preview: true,
  },
  {
    spotId: 10,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-663047756982570616/original/016c9eaf-d804-4edf-b4e3-b101c4c2e3c7.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 10,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-663047756982570616/original/0c7d56a5-5f52-4b0d-af2c-b29ecbdcf46b.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 10,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-663047756982570616/original/11b69ee6-0d71-4e0c-ba1c-0addf8091bf2.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 10,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-663047756982570616/original/56d7a500-0bf7-45bd-9ebb-2c069e2ca43b.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 11,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-736124896461793076/original/4adec904-15aa-4831-9e01-e2b82f3e40a5.jpeg?im_w=1200",
    preview: true,
  },
  {
    spotId: 11,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-736124896461793076/original/c430bb61-43eb-4a47-9885-0449e9b33182.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 11,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-736124896461793076/original/027611b9-1e97-4d2f-9621-0150de5e3a85.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 11,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-736124896461793076/original/ddc38368-5a13-4376-a30e-0e7bd2dec631.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 11,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-736124896461793076/original/d6123adf-9f48-4d3b-9c43-2ae9176bf3ea.jpeg?im_w=1440",
    preview: true,
  },
  {
    spotId: 12,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-45676925/original/89fe564a-53cf-4580-bbba-6041b9a6675d.jpeg?im_w=1200",
    preview: true,
  },
  {
    spotId: 12,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-45676925/original/93bc709f-cd5e-4652-8904-0aea1b65ffff.jpeg?im_w=1200",
    preview: true,
  },
  {
    spotId: 12,
    url: "https://a0.muscache.com/im/pictures/9177e746-feda-4119-a1cd-34dee6e00cda.jpg?im_w=1200",
    preview: true,
  },
  {
    spotId: 12,
    url: "https://a0.muscache.com/im/pictures/15dd0e65-707a-4767-bba0-fdc393ceb0e8.jpg?im_w=1440",
    preview: true,
  },
  {
    spotId: 12,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-45676925/original/deaf4162-644e-4c6d-94f4-fdcdd8d65954.jpeg?im_w=1440",
    preview: true,
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
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    }, {});
  }
};
