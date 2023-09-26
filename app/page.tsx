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
        <main className="h-full grid mobile:grid-cols-3 laptop:grid-cols-4 justify-between gap-5 overflow-auto">
            <div id="traffic" className="h-full flex flex-col col-span-3 gap-7 2xl:overflow-x-auto p-5">
                <div id="top-bar" className="flex gap-3 flex-row flex-wrap">
                    <DatePicker date={date} setDate={handleDateChange}></DatePicker>
                    <div>
                        <Button onClick={() => setDate(new Date())}>Right Now!</Button>
                    </div>
                </div>

                <TrafficModule date={date} selectedLocation={selectedLocation} selectLocation={selectLocation} />
            </div>
            <div id="weather" className="shadow overflow-y-auto min-h-[470px] mobile:col-span-3 mobile:overflow-y-auto laptop:col-span-1">
                <WeatherModule date={date} selectedLocation={selectedLocation} />
            </div>

        </main>
    )
}
