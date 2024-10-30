import { NextRequest, NextResponse } from 'next/server'
//import DB from '../../../models'

export async function GET(request: NextRequest) {

return NextResponse.json('DB')

    const data = await DB.TripData.findAll({
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
