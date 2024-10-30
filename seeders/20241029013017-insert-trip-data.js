'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const res = await fetch(
      'https://data.cityofnewyork.us/resource/gkne-dk5s.json?$limit=10000'//0'
    )

    const data = await res.json()

    await queryInterface.bulkInsert(
      'TripData',
      (data).map(
        (value) => {
          value.pickup_point = queryInterface.sequelize.fn(
            'ST_GeomFromGeoJSON',
            `{\
              "type": "Point",\
              "coordinates": [${value.pickup_longitude}, ${value.pickup_latitude}]\
            }`
          )

          value.dropoff_point = queryInterface.sequelize.fn(
            'ST_GeomFromGeoJSON',
            `{\
              "type": "Point",\
              "coordinates": [${value.dropoff_longitude}, ${value.dropoff_latitude}]\
            }`
          )

          delete value.pickup_longitude;
          delete value.pickup_latitude;
          delete value.dropoff_longitude;
          delete value.dropoff_latitude;

          return value;
        }
      ),
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
