import { Metadata } from 'next'
import React from 'react'
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
