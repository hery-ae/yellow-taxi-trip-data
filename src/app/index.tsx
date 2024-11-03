'use client'

import { useEffect, useRef, useState } from 'react'

export default function index() {
    const [payments, setPayments] = useState<string[]>(['Loading...'])

    const Leaflet = useRef<any>()
    const map = useRef<any>()

    useEffect(
        () => {
            const L = require('leaflet')

            require('leaflet-spin')
            require('leaflet-routing-machine')

            L.Marker.prototype.options.icon = L.icon({
                iconUrl: 'leaflet/images/marker-icon.png',
                shadowUrl: 'leaflet/images/marker-shadow.png'
            })

            const LMap = L.map(
                'map',
                {
                    center: [40.7128, -74.0060],
                    zoom: 11
                }
            )

            L.tileLayer(
                'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                {
                    attribution: '&copy; OpenStreetMap'
                }
            )
            .addTo(LMap)

            fetch('./api/payments')
            .then(
                (res) => {
                    if (res.ok) {
                        res.json()
                        .then(
                            (value) => {
                                setPayments(value)
                            }
                        )
                    }
                }
            )

            Leaflet.current = L
            map.current = LMap

        },
        []
    )

    const buildMap = (event: React.ChangeEvent) => {
        const targetElement = event.target as HTMLInputElement

        if (!(targetElement.value.length)) return

        const startTimeElement = document.querySelector('[name="start-time"]') as HTMLInputElement
        const endTimeElement = document.querySelector('[name="end-time"]') as HTMLInputElement
        const minFareElement = document.querySelector('[name="min-fare"]') as HTMLInputElement
        const maxFareElement = document.querySelector('[name="max-fare"]') as HTMLInputElement

        if (((targetElement.name === startTimeElement.name) && !(endTimeElement.value.length)) || ((targetElement.name === endTimeElement.name) && !(startTimeElement.value.length))) return

        if (((targetElement.name === minFareElement.name) && !(maxFareElement.value.length)) || ((targetElement.name === maxFareElement.name) && !(minFareElement.value.length))) return

        let nLayer: number

        map.current.eachLayer(
            (layer: any) => {
                nLayer = (nLayer || 0) + 1

                if (nLayer > 1) map.current.removeLayer(layer)

            }
        )

        map.current.spin(true)

        const queryParams: string[] = []

        document.querySelectorAll('input, select')
        .forEach(
            (element) => {
                const inputElement = element as HTMLInputElement

                if (inputElement.value) queryParams.push((inputElement.name).concat('=').concat(encodeURIComponent(inputElement.value)))
            }
        )

        queryParams.push('limit=9999')

        fetch(
            ('./api/trip-data?').concat(queryParams.join('&'))
        )
        .then(
            (res) => {
                if (!res.ok) return

                res.json()
                .then(
                    (data) => {
                        data.forEach(
                            (value: any, index: number) => {
                                delete value.id

                                value.pickup_datetime = (new Date(value.pickup_datetime)).toLocaleString()
                                value.dropoff_datetime = (new Date(value.dropoff_datetime)).toLocaleString()

                                const waypoints: any[] = []

                                let line: any

                                const informations = Object.keys(value).filter(
                                    (info) => !(['pickup_point', 'dropoff_point']).some((value) => value === info)
                                )
                                .map(
                                    (info) => `${info.charAt(0).toUpperCase().concat(info.substring(1).replace(/_/g, ' '))}: ${value[info]}`
                                )

                                Leaflet.current.geoJSON(
                                    [
                                        value.pickup_point,
                                        value.dropoff_point
                                    ],
                                    {
                                        pointToLayer: (geoJSONPoint: any, latLng: any) => {
                                            waypoints.push({
                                                latLng: latLng
                                            })

                                            if (geoJSONPoint === value.pickup_point) {
                                                return (
                                                    Leaflet.current.circleMarker(latLng)
                                                    .bindTooltip(
                                                        informations.join('<br />')
                                                    )
                                                    .on(
                                                        'tooltipopen',
                                                        () => {
                                                            Leaflet.current.Routing.osrmv1()
                                                            .route(
                                                                waypoints,
                                                                (err: any, routes: any[]) => {
                                                                    if (err) {
                                                                        console.log(err)
                                                                    } else {
                                                                        line = Leaflet.current.Routing.line(
                                                                            routes.find((route) => true),
                                                                            {
                                                                                styles: [
                                                                                    {
                                                                                        color: 'black',
                                                                                        opacity: 1
                                                                                    }
                                                                                ],
                                                                                addWaypoints: false
                                                                            }
                                                                        )
                                                                        .addTo(map.current)
                                                                    }
                                                                }
                                                            )
                                                        }
                                                    )
                                                )

                                            }

                                            if ((index +1) === data.length) map.current.spin(false)

                                            return (
                                                Leaflet.current.marker(latLng)
                                                .bindTooltip(
                                                    informations.join('<br />')
                                                )
                                                .on(
                                                    'tooltipopen',
                                                    () => {
                                                        Leaflet.current.Routing.osrmv1()
                                                        .route(
                                                            waypoints,
                                                            (err: any, routes: any[]) => {
                                                                if (err) {
                                                                    console.log(err)
                                                                } else {
                                                                    line = Leaflet.current.Routing.line(
                                                                        routes.find((route) => true),
                                                                        {
                                                                            styles: [
                                                                                {
                                                                                    color: 'black',
                                                                                    opacity: 1
                                                                                }
                                                                            ],
                                                                            addWaypoints: false
                                                                        }
                                                                    )
                                                                    .addTo(map.current)
                                                                }
                                                            }
                                                        )
                                                    }
                                                )
                                            )
                                        },
                                        style: {
                                            fillOpacity: .7
                                        }
                                    }
                                )
                                .addTo(map.current)

                            }
                        )

                        if (!(data.length)) map.current.spin(false)

                    }
                )
            }
        )

    }

    return (
        <main className='mb-12 grow px-2'>
            <div className='mb-6 grid grid-cols-2 md:grid-cols-12 gap-4'>
                <div className='mb-4 col-span-4 md:col-span-4 w-full'>
                    <label className='block text-gray-400 mb-2' htmlFor='range-time'>
                        Time range
                    </label>
                    <div className='w-full flex gap-2'>
                        <input className='w-1/2 appearance-none border rounded py-1 px-2 focus:outline-none' type='datetime-local' name='start-time' onChange={buildMap} />
                        <input className='w-1/2 appearance-none border rounded py-1 px-2 focus:outline-none' type='datetime-local' name='end-time' onChange={buildMap} />
                    </div>
                </div>
                <div className='mb-4 col-span-4 md:col-span-3 w-full'>
                    <label className='block text-gray-400 mb-2' htmlFor='range-fare'>
                        Fare amount range
                    </label>
                    <div className='w-full flex gap-2'>
                        <input className='w-1/2 appearance-none border rounded py-1 px-2 focus:outline-none' type='number' name='min-fare' onChange={buildMap} />
                        <input className='w-1/2 appearance-none border rounded py-1 px-2 focus:outline-none' type='number' name='max-fare' onChange={buildMap} />
                    </div>
                </div>
                <div className='mb-4 col-span-4 md:col-span-2 w-full'>
                    <label className='block text-gray-400 mb-2' htmlFor='distance'>
                        Trip distance
                    </label>
                    <input className='w-full appearance-none border rounded py-1 px-2 focus:outline-none' type='number' name='distance' onChange={buildMap} />
                </div>
                <div className='mb-4 col-span-4 md:col-span-3 w-full'>
                    <label className='block text-gray-400 mb-2' htmlFor='payment'>
                        Payment type
                    </label>
                    <select className='w-full border rounded py-1 px-2 focus:outline-none' name='payment' onChange={buildMap}>
                        <option value=''>Choose a payment type</option>
                        {
                            payments && payments.map(
                                (payment) => (
                                    <option key={payment} value={payment}>{payment}</option>
                                )
                            )
                        }
                    </select>
                </div>
            </div>
            <div className='w-full h-svh' id='map'></div>
        </main>
    )
}
