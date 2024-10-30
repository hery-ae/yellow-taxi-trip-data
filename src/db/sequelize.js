const { Sequelize } = require('sequelize')
const pg = require('pg')

module.exports = (
    new Sequelize(
        process.env['DBDATABASE'] || 'yellow_taxi_trip_data',
        process.env['DBUSERNAME'] || 'postgres',
        process.env['DBPASSWORD'],
        {
            host: process.env['DBHOST'] || 'localhost',
            dialect: 'postgres',
            dialectModule: pg
        }
    )
)
