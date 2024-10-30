'use strict'

const fetch = require('node-fetch')

module.exports = (sequelize) => {
  return fetch(
    'https://data.cityofnewyork.us/resource/gkne-dk5s.json?$limit=59999'
  )
  .then(
    async (res) => {
      await res.json()
      .then(
        async (value) => {
          await sequelize.queryInterface.bulkInsert(
            'TripData',
            (value).map(
              (value) => {
                value.pickup_point = sequelize.fn(
                  'ST_GeomFromGeoJSON',
                  `{\
                    "type": "Point",\
                    "coordinates": [${value.pickup_longitude}, ${value.pickup_latitude}]\
                  }`
                )
        
                value.dropoff_point = sequelize.fn(
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
          )
        }
      )
    }
  )
}
