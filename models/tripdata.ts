import { Model, DataTypes } from 'sequelize'

class TripData extends Model {}

export function model(sequelize) {
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
