import { formatDate } from "@/lib/utils";
import { Traffic } from "../traffic/TrafficModule";
import Image from "next/image"
import { Compass, Droplets, Thermometer, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import { getWeatherForecasts } from "./service";
import { getWeatherIconPath, removeDayNight } from "./utils";
import { DailyForecast } from "./interface";


interface TodayWeatherProps {
    date: Date,
    selectedLocation: Traffic | undefined,
}

export default function TodayWeather({ date, selectedLocation }: TodayWeatherProps) {
    const [todayForecast, setTodayForecast] = useState<DailyForecast>()

    useEffect(() => {
        getDailyForecasts(new Date(date))
    }, [date])

    async function getDailyForecasts(date: Date) {
        const data = (await getWeatherForecasts('24-hour', undefined, date))
        if (data) {
            setTodayForecast(data[0])
        }
    }

    const observations = [
        {
            title: "Temperature",
            value: `${todayForecast?.general.temperature.low}\u00B0 - ${todayForecast?.general.temperature.high}\u00B0`,
            icon: Thermometer
        },
        {
            title: "Humidity",
            value: `${todayForecast?.general.relative_humidity.low}% - ${todayForecast?.general.relative_humidity.high}%`,
            icon: Droplets
        },
        {
            title: "Wind Speed",
            value: `${todayForecast?.general.wind.speed.low} - ${todayForecast?.general.wind.speed.high}km`,
            icon: Wind
        },
        {
            title: "Wind Direction",
            value: todayForecast?.general.wind.direction,
            icon: Compass
        },
    ]

    const observationChips =  (
        observations.map(obs => (
            <div key={obs.title} className="flex gap-3 items-center">
                <obs.icon size={30} className="stroke-slate-700 shrink-0"/>
                <div>
                    <div className="text-xs text-slate-600">{obs.title}</div>
                    <span className="text-sm font-semibold">{obs.value}</span>
                </div>
            </div>
        ))
    )

    return (
        <div className="w-full p-5 flex flex-col gap-5">
            <div className="flex text-base font-semibold items-end">
                <span>Today</span>
                {todayForecast && 
                    <span className="ml-auto text-sm text-slate-500">{formatDate(date, 'MM DD')}</span>
                }
            </div>
            {todayForecast &&
                <>
                    <div id="periods" className="grid grid-cols-3 justify-between">
                        {todayForecast?.periods.map((period, i) => (
                            <div key={i} className="flex flex-col items-center min-w-[80px]">
                                <Image
                                    src={getWeatherIconPath(period.regions[selectedLocation?.region ?? 'central'], 'animated')}
                                    alt="weather icon"
                                    height={100}
                                    width={100}
                                ></Image>
                                <div className="text-sm text-center text-slate-800 font-medium">{formatDate(period.time.start)}</div>
                                <div className="text-sm text-center text-slate-500">{removeDayNight(period.regions[selectedLocation?.region ?? 'central'])}</div>
                            </div>
                        ))}
                    </div>
                    <div id="info" className="grid grid-cols-2 gap-5">
                        {observationChips}
                    </div>
                </>
            }
        </div>
    )
}