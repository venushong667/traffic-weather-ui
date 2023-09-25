'use client'

import React from 'react'
import { DatePicker } from '@/components/date-picker'
import Image from 'next/image'
import { getTraffic } from './service'

interface ImageMetadata {
    height: number,
    width: number,
    md5: string
}

interface Traffic {
    id: string,
    address: string,
    route: string,
    neighborhood: string,
    region: string,
    image: {
        url: string,
        metadata: ImageMetadata
    },
    timestamp: string
}

export default function Home() {
    const [date, setDate] = React.useState<Date>()
    const [traffic, setTraffic] = React.useState<Traffic[]>([])

    async function handleDateChange (date: Date | undefined) {
        setDate(date)
        const data = await getTraffic(date);
        setTraffic(data)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div id="top-bar" className="flex gap-3">
                <DatePicker date={date} setDate={handleDateChange}></DatePicker>
            </div>

            <div id="location-list" className="overflow-x-auto h-[500px]">
                <ul>
                    {traffic.map(t => (
                        <li key={t.id}>
                            {t.address} - {t.route} - {t.neighborhood} - {t.region}
                        </li>
                    ))}
                </ul>
            </div>

        </main>
    )
}
