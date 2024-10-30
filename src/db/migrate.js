const { DataTypes } = require('sequelize')
const Sequelize = require('./sequelize')
const createTripData = require('./migrations/create-trip-data')

createTripData(Sequelize, DataTypes).then(
    () => {
        console.log('TripData was created.')
    }
)
