'use client'

import React from 'react'
import { DatePicker } from '@/components/date-picker'
import Image from 'next/image'

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

    async function handleDateChange (date: Date | undefined) {
        setDate(date)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div id="top-bar" className="flex gap-3">
                <DatePicker date={date} setDate={handleDateChange}></DatePicker>
            </div>

        </main>
    )
}
