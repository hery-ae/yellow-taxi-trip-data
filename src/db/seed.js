const Sequelize = require('./sequelize')
const insertTripData = require('./seeders/insert-trip-data')

insertTripData(Sequelize).then(
    () => {
        console.log('TripData was inserted.')
    }
)
