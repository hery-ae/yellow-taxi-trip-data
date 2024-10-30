'use client'

import React from 'react'


import { useEffect, useRef, useState } from 'react'

export default function index() {
    const [payments, setPayments] = useState([])

    const Leaflet = useRef<any>()
    const map = useRef<any>()

    useEffect(
        () => {
            const L = require('leaflet')

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

    const buildMap = () => {
        let nLayer: number

        map.current.eachLayer(
            (layer: any) => {
                nLayer = (nLayer || 0) + 1

                if (nLayer > 1) map.current.removeLayer(layer)

            }
        )

        const queryParams: string[] = []

        document.querySelectorAll('input, select')
        .forEach(
            (element) => {
                const inputElement = element as HTMLInputElement

                if (inputElement.value) queryParams.push((inputElement.name).concat('=').concat(encodeURIComponent(inputElement.value)))
            }
        )

        fetch(
            ('./api/trip-data?').concat(queryParams.join('&'))
        )
        .then(
            (res) => {
                if (!res.ok) return

                res.json()
                .then(
                    (value) => {
                        value.forEach(
                            (value: any) => {
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

                                            if (geoJSONPoint === value.dropoff_point) {
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
                                                                            opacity: .5
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

                                            if (geoJSONPoint === value.pickup_point) {
                                                return (
                                                    Leaflet.current.circleMarker(latLng)
                                                    .bindTooltip(
                                                        informations.join('<br />')
                                                    )
                                                    .on(
                                                        'tooltipopen',
                                                        () => {
                                                            if (line && line.options.styles[0].opacity !== 1) {
                                                                map.current.removeLayer(line)

                                                                line.options.styles[0].opacity = 1

                                                                line.eachLayer(
                                                                    (layer: any) => {
                                                                        layer.options.opacity = 1
                                                                    }
                                                                )

                                                                map.current.addLayer(line)
                                                            }
                                                        }
                                                    )
                                                    .on(
                                                        'tooltipclose',
                                                        () => {
                                                            if (line && line.options.styles[0].opacity !== .5) {
                                                                map.current.removeLayer(line)

                                                                line.options.styles[0].opacity = .5

                                                                line.eachLayer(
                                                                    (layer: any) => {
                                                                        layer.options.opacity = .5
                                                                    }
                                                                )

                                                                map.current.addLayer(line)
                                                            }
                                                        }
                                                    )
                                                )

                                            }

                                            return (
                                                Leaflet.current.marker(latLng)
                                                .bindTooltip(
                                                    informations.join('<br />')
                                                )
                                                .on(
                                                    'tooltipopen',
                                                    () => {
                                                        if (line && line.options.styles[0].opacity !== 1) {
                                                            map.current.removeLayer(line)

                                                            line.options.styles[0].opacity = 1

                                                            line.eachLayer(
                                                                (layer: any) => {
                                                                    layer.options.opacity = 1
                                                                }
                                                            )

                                                            map.current.addLayer(line)
                                                        }
                                                    }
                                                )
                                                .on(
                                                    'tooltipclose',
                                                    () => {
                                                        if (line && line.options.styles[0].opacity !== .5) {
                                                            map.current.removeLayer(line)

                                                            line.options.styles[0].opacity = .5

                                                            line.eachLayer(
                                                                (layer: any) => {
                                                                    layer.options.opacity = .5
                                                                }
                                                            )

                                                            map.current.addLayer(line)
                                                        }
                                                    }
                                                )
                                            )
                                        },
                                        style: {
                                            fillOpacity: .9
                                        }
                                    }
                                )
                                .addTo(map.current)

                            }
                        )
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
