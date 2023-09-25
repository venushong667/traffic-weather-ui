import { useEffect, useState } from "react"
import { getWeatherForecasts } from "./service"
import { Traffic } from "../traffic/TrafficModule"
import Image from "next/image"


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
            <div className="p-5 flex flex-col gap-1">
                Current Weather
                
                {selectedForecast && hourlyForecasts && 
                    <>
                        <div>{new Date().toLocaleTimeString()}</div>
                        <div>{selectedForecast.area}</div>
                        <Image
                            src="/weather/animated/cloudy-day-1.svg" 
                            alt="weather icon"
                            height={100}
                            width={100}
                        ></Image>
                        <div>{selectedForecast?.forecast}</div>     
                    </>
                }
            </div>
        </>
    )
}