import { Model, DataTypes } from 'sequelize'
import sequelize from '@/src/db/sequelize'

export function model() {
    TripData.init({
        vendor_id: DataTypes.STRING,
        pickup_datetime: DataTypes.DATE,
        dropoff_datetime: DataTypes.DATE,
        passenger_count: DataTypes.INTEGER,
        trip_distance: DataTypes.DECIMAL,
        pickup_point: DataTypes.GEOMETRY('POINT'),
        store_and_fwd_flag: DataTypes.STRING,
        dropoff_point: DataTypes.GEOMETRY('POINT'),
        payment_type: DataTypes.STRING,
        fare_amount: DataTypes.DECIMAL,
        mta_tax: DataTypes.DECIMAL,
        tip_amount: DataTypes.DECIMAL,
        tolls_amount: DataTypes.DECIMAL,
        total_amount: DataTypes.DECIMAL,
        imp_surcharge: DataTypes.DECIMAL,
        rate_code: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'TripData',
        timestamps: false
    })

    return TripData
}

interface Geometry {
    type: 'Point',
    coordinates: string[]
}

class TripData extends Model {
    declare vendor_id: string
    declare pickup_datetime: Date
    declare dropoff_datetime: Date
    declare passenger_count: number
    declare trip_distance: string
    declare pickup_point: Geometry
    declare store_and_fwd_flag: string
    declare dropoff_point: Geometry
    declare payment_type: string
    declare fare_amount: string
    declare mta_tax: string
    declare tip_amount: string
    declare tolls_amount: string
    declare total_amount: string
    declare imp_surcharge: string
    declare rate_code: number
}
