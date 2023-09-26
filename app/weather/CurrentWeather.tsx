import { useEffect, useState } from "react"
import { getWeatherForecasts } from "./service"
import { Traffic } from "../traffic/TrafficModule"
import Image from "next/image"
import { formatDate } from "@/lib/utils"


interface HourlyForecast {
    update_timestamp: string,
    timestamp: string,
    valid_period: { start: string, end: string }
    forecasts: Forecast[]
}

interface Forecast {
    area: string,
    forecast: string,
}

interface CurrentWeatherProps {
    date: Date,
    selectedLocation: Traffic | undefined,
}

export default function CurrentWeather({ date, selectedLocation }: CurrentWeatherProps) {
    const [hourlyForecasts, setHourlyForecasts] = useState<HourlyForecast>()
    const [selectedForecast, selectForecast] = useState<Forecast>()

    useEffect(() => {
        getHourlyForecasts(date)
    }, [date])

    useEffect(() => {
        if (selectedForecast?.area === selectedLocation?.neighborhood) return
        handleLocationChange(hourlyForecasts?.forecasts, selectedLocation?.neighborhood)
    }, [hourlyForecasts?.forecasts, selectedForecast?.area, selectedLocation])

    async function getHourlyForecasts(date: Date) {
        const data = (await getWeatherForecasts('2-hour', date))
        if (data) {
            console.log(data[0])
            setHourlyForecasts(data[0])
        }
    }

    function handleLocationChange(forecasts: Forecast[] | undefined, neighborhood: string | undefined) {
        if (!forecasts || !neighborhood) return

        const currForecast = forecasts.find(forecast => forecast.area === neighborhood)
        selectForecast(currForecast)
    }

    return (
        <>
            <div id="current-weather" className="p-5 flex flex-col w-full gap-1">
                <div className="text-xl font-semibold">Weather Now</div>
                
                {selectedForecast && hourlyForecasts && 
                    <>
                        <div>{formatDate(new Date())}</div>
                        <div>{selectedForecast.area}</div>
                        <div className="relative h-[150px] w-[150px] ">
                            <Image
                                src="/weather/animated/cloudy-day-1.svg" 
                                alt="weather icon"
                                fill
                            ></Image>
                        </div>
                        <div>{selectedForecast?.forecast}</div>     
                    </>
                }
            </div>
        </>
    )
}