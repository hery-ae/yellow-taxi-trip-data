import { NextApiRequest, NextApiResponse } from 'next'
import DB from '../../../models'

export function GET(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== 'GET') return response.status(405).end()

    return DB.TripData.findAll({
        group: 'payment_type',
        attributes: ['payment_type']
    })
    .then(
        (value) => response.status(200).json(value.map((value) => value.payment_type)),
        () => response.status(500).end()
    )
}
