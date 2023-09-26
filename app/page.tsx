'use client'

import React, { useState } from 'react'
import { DatePicker } from '@/components/date-picker'
import { ModeToggle } from '@/components/modeToggle'
import TrafficModule, { Traffic } from './traffic/TrafficModule'
import { Button } from '@/components/ui/button'
import WeatherModule from './weather/WeatherModule'


export default function Home() {
    const [date, setDate] = useState<Date>(new Date())
    const [selectedLocation, selectLocation] = useState<Traffic>()

    async function handleDateChange (date: Date) {
        setDate(date)
    }

    return (
        <main className="flex justify-between gap-5 overflow-hidden 2xl:overflow-auto h-full">
            <div id="traffic" className="flex flex-col w-3/4 gap-7 p-3 2xl:overflow-x-auto">
                <div id="top-bar" className="flex gap-3">
                    <DatePicker date={date} setDate={handleDateChange}></DatePicker>
                    <Button onClick={() => setDate(new Date())}>Right Now!</Button>
                    <div className="ml-auto">
                        <ModeToggle />
                    </div>
                </div>

                <TrafficModule date={date} selectedLocation={selectedLocation} selectLocation={selectLocation} />
            </div>
            <div id="weather" className="w-1/4 shadow overflow-y-auto">
                <WeatherModule date={date} selectedLocation={selectedLocation} />
            </div>

        </main>
    )
}
