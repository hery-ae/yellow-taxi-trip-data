'use strict'

module.exports = (sequelize, DataTypes) => {
  Sequelize.queryInterface
  .createTable(
    'TripData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      vendor_id: {
        type: DataTypes.STRING
      },
      pickup_datetime: {
        type: DataTypes.DATE
      },
      dropoff_datetime: {
        type: DataTypes.DATE
      },
      passenger_count: {
        type: DataTypes.INTEGER
      },
      trip_distance: {
        type: DataTypes.DECIMAL
      },
      pickup_point: {
        type: DataTypes.GEOMETRY
      },
      store_and_fwd_flag: {
        type: DataTypes.STRING
      },
      dropoff_point: {
        type: DataTypes.GEOMETRY
      },
      payment_type: {
        type: DataTypes.STRING
      },
      fare_amount: {
        type: DataTypes.DECIMAL
      },
      mta_tax: {
        type: DataTypes.DECIMAL
      },
      tip_amount: {
        type: DataTypes.DECIMAL
      },
      tolls_amount: {
        type: DataTypes.DECIMAL
      },
      total_amount: {
        type: DataTypes.DECIMAL
      },
      imp_surcharge: {
        type: DataTypes.DECIMAL
      },
      rate_code: {
        type: DataTypes.INTEGER
      }
    }
  )
}
