'use client'

import React, { useState } from 'react'

import { DatePicker } from '@/components/date-picker'
import { Button } from '@/components/ui/button'

import TrafficModule, { Traffic } from './traffic/TrafficModule'
import WeatherModule from './weather/WeatherModule'


export default function Home() {
    const [date, setDate] = useState<Date>(new Date())
    const [selectedLocation, selectLocation] = useState<Traffic>()

    async function handleDateChange (date: Date) {
        setDate(date)
    }

    return (
        <main className="h-full grid mobile:grid-cols-3 desktop:grid-cols-4 justify-between gap-5 overflow-auto">
            <div id="traffic" className="h-full flex flex-col mobile:col-span-3 laptop:col-span-2 desktop:col-span-3 gap-7 2xl:overflow-x-auto p-5">
                <div id="top-bar" className="flex gap-3 flex-row flex-wrap">
                    <DatePicker date={date} setDate={handleDateChange}></DatePicker>
                    <div>
                        <Button onClick={() => setDate(new Date())}>Right Now!</Button>
                    </div>
                </div>

                <TrafficModule date={date} selectedLocation={selectedLocation} selectLocation={selectLocation} />
            </div>
            <div id="weather" className="shadow mobile:overflow-x-auto mobile:min-h-[470px] laptop:overflow-visible laptop:min-h-[auto] laptop: mobile:col-span-3 laptop:col-span-1 ">
                <WeatherModule date={date} selectedLocation={selectedLocation} />
            </div>

        </main>
    )
}
