'use client'

import React from 'react'
import { DatePicker } from '@/components/date-picker'
import { ModeToggle } from '@/components/modeToggle'
import TrafficContent from './traffic/TrafficContent'


export default function Home() {
    const [date, setDate] = React.useState<Date>(new Date())

    async function handleDateChange (date: Date) {
        setDate(date)
    }

    return (
        <main className="flex justify-between gap-5 overflow-hidden h-full">
            <div id="traffic" className="flex flex-col w-3/4 gap-7 p-3">
                <div id="top-bar" className="flex gap-3">
                    <DatePicker date={date} setDate={handleDateChange}></DatePicker>
                    <div className="ml-auto">
                        <ModeToggle />
                    </div>
                </div>

                <TrafficContent date={date} />
            </div>
            <div id="weather" className="w-1/4 shadow rounded-lg">
                <div>weather</div>
            </div>

        </main>
    )
}
