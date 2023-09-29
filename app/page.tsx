'use client'

import { TimerReset } from 'lucide-react'
import React, { useState } from 'react'

import { DatePicker } from '@/components/date-picker'
import { ModeToggle } from '@/components/modeToggle'
import { Button } from '@/components/ui/button'

import { Traffic } from './traffic/interfaces'
import TrafficModule from './traffic/TrafficModule'
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
                <div id="top-bar" className="flex gap-3 flex-row flex-wrap relative translate-x-0 pr-[40px]">
                    <DatePicker date={date} setDate={handleDateChange}></DatePicker>
                    <Button onClick={() => setDate(new Date())}>
                        <TimerReset className="mr-2 h-5 w-5"/>
                        Now
                    </Button>
                    <ModeToggle className="fixed right-0" />
                </div>

                <TrafficModule date={date} selectedLocation={selectedLocation} selectLocation={selectLocation} />
            </div>
            <div id="weather" className="shadow dark:shadow-slate-500 mobile:overflow-x-auto mobile:min-h-[470px] laptop:overflow-visible laptop:min-h-[auto] laptop: mobile:col-span-3 laptop:col-span-1">
                <WeatherModule date={date} selectedLocation={selectedLocation} />
            </div>

        </main>
    )
}
