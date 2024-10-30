import { NextRequest, NextResponse } from 'next/server'
import { Op } from 'sequelize'
import TripData from '../../../src/models/trip-data'

interface ParamOption {
    where: {
        pickup_datetime?: any,
        fare_amount?: any,
        trip_distance?: string,
        payment_type?: string
    },
    limit?: number
}

export async function GET(request: NextRequest) {
    const params: ParamOption = {
        where: {}
    }

    if (request.nextUrl.searchParams.has('payment')) {
        params.where.payment_type = request.nextUrl.searchParams.get('payment') as string
    }

    if (request.nextUrl.searchParams.has('distance')) {
        params.where.trip_distance = request.nextUrl.searchParams.get('distance') as string
    }

    if (request.nextUrl.searchParams.has('min-fare') && request.nextUrl.searchParams.has('max-fare')) {
        params.where.fare_amount = {
            [Op.gte]: request.nextUrl.searchParams.get('min-fare'),
            [Op.lte]: request.nextUrl.searchParams.get('max-fare')
        }
    }

    if (request.nextUrl.searchParams.has('start-time') && request.nextUrl.searchParams.has('end-time')) {
        params.where.pickup_datetime = {
            [Op.gte]: new Date(request.nextUrl.searchParams.get('start-time') as string),
            [Op.lte]: new Date(request.nextUrl.searchParams.get('end-time') as string)
        }
    }

    if (request.nextUrl.searchParams.has('limit')) {
        params.limit = Number(request.nextUrl.searchParams.get('limit'))
    }

    if (!(Object.keys(params.where).length)) return NextResponse.json([])

    const data = await TripData().findAll(params)

    return NextResponse.json(data)
}
