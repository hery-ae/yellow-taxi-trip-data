import { NextRequest, NextResponse } from 'next/server'
import TripData from '@/models/trip-data'

export async function GET(request: NextRequest) {
    const data = await TripData().findAll({
        group: 'payment_type',
        attributes: ['payment_type']
    })

    return NextResponse.json(
        data.map(
            (
                value: {
                    payment_type: string
                }
            ) => {
                return value.payment_type
            }
        )
    )
}
