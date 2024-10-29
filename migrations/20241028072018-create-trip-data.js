'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TripData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vendor_id: {
        type: Sequelize.STRING
      },
      pickup_datetime: {
        type: Sequelize.DATE
      },
      dropoff_datetime: {
        type: Sequelize.DATE
      },
      passenger_count: {
        type: Sequelize.INTEGER
      },
      trip_distance: {
        type: Sequelize.DECIMAL
      },
      pickup_point: {
        type: Sequelize.GEOMETRY
      },
      store_and_fwd_flag: {
        type: Sequelize.STRING
      },
      dropoff_point: {
        type: Sequelize.GEOMETRY
      },
      payment_type: {
        type: Sequelize.STRING
      },
      fare_amount: {
        type: Sequelize.DECIMAL
      },
      mta_tax: {
        type: Sequelize.DECIMAL
      },
      tip_amount: {
        type: Sequelize.DECIMAL
      },
      tolls_amount: {
        type: Sequelize.DECIMAL
      },
      total_amount: {
        type: Sequelize.DECIMAL
      },
      imp_surcharge: {
        type: Sequelize.DECIMAL
      },
      rate_code: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TripData');
  }
};