import { useEffect, useState } from "react"
import { getWeatherForecasts } from "./service"
import { Traffic } from "../traffic/TrafficModule"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { getWeatherIconPath, removeDayNight } from "./utils"


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
            <div id="current-weather" className="pt-3 px-5 flex flex-col w-full gap-1">
                <div className="text-base font-semibold">Now</div>
                
                {selectedForecast && hourlyForecasts && 
                    <>
                        <div className="font-medium">{selectedForecast.area}</div>
                        <div className="flex">
                            <div >
                                <Image
                                    src={getWeatherIconPath(selectedForecast.forecast, 'animated')} 
                                    alt="weather icon"
                                    height={150}
                                    width={150}
                                ></Image>
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="text-slate-600 font-semibold">{formatDate(new Date(date))}</div>
                                <div className="font-semibold">{removeDayNight(selectedForecast?.forecast)}</div>     
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}