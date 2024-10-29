import { NextApiRequest, NextApiResponse } from 'next'
import { Op } from 'sequelize'
import DB from '../../../models'

export function GET(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== 'GET') return response.status(405).end()

    const where = {} as {
        pickup_datetime?: any,
        fare_amount?: any,
        trip_distance?: string,
        payment_type?: string
    }

    if (request.query.payment) {
        where.payment_type = request.query.payment as string
    }

    if (request.query.distance) {
        where.trip_distance = request.query.distance as string
    }

    if (request.query['min-fare'] && request.query['max-fare']) {
        where.fare_amount = {
            [Op.gte]: request.query['min-fare'],
            [Op.lte]: request.query['max-fare']
        }
    }

    if (request.query['start-time'] && request.query['end-time']) {
        where.pickup_datetime = {
            [Op.gte]: new Date(request.query['start-time'] as string),
            [Op.lte]: new Date(request.query['end-time'] as string)
        }
    }

    return DB.TripData.findAll({
        where: where
    })
    .then(
        (value) => response.status(200).json(value),
        () => response.status(500).end()
    )
}
