import React from 'react'


import { Metadata } from 'next'
import Index from './index'

export const metadata: Metadata = {
    title: {
        default: 'Yellow Taxi Trip Data',
        template: '%s - Yellow Taxi Trip Data'
    }
}

export default function page() {
    return <Index />
}
