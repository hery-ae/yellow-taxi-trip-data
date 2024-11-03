'use strict'

const https = require('https')

module.exports = (sequelize) => (
  new Promise(
    (resolve) => {
      https.request(
        'https://data.cityofnewyork.us/resource/gkne-dk5s.json?$limit=59999',
        (res) => {
          let data = ''
          let i = 0

          process.stdout.write(('\r').concat(['/', '|', '-', '\\'][i++]))

          res.on(
            'data',
            (chunk) => {
              data = (data).concat(chunk)

              process.stdout.write(('\r').concat(['/', '|', '-', '\\'][i++]))
              i &= 3
            }
          )
          res.on(
            'end',
            async () => {
              const value = JSON.parse(data)
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

              resolve()
            }
          )
        }
      )
      .on(
        'connect',
        () => {
          console.log('seeding... ')
        }
      )
      .end()
    }
  )
)
