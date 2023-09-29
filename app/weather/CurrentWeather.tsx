import Image from "next/image"
import { useEffect, useState } from "react"

import { Traffic } from "../traffic/interfaces";
import { formatDate } from "../utils";
import { AreaForecast, HourlyForecast } from "./interfaces"
import { getWeatherForecasts } from "./service"
import { getWeatherIconPath, removeDayNight } from "./utils"

interface CurrentWeatherProps {
    date: Date,
    selectedLocation: Traffic | undefined,
}

export default function CurrentWeather({ date, selectedLocation }: CurrentWeatherProps) {
    const [hourlyForecasts, setHourlyForecasts] = useState<HourlyForecast>()
    const [selectedForecast, selectForecast] = useState<AreaForecast>()

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

    function handleLocationChange(forecasts: AreaForecast[] | undefined, neighborhood: string | undefined) {
        if (!forecasts || !neighborhood) return

        const currForecast = forecasts.find(forecast => forecast.area === neighborhood)
        selectForecast(currForecast)
    }

    return (
        <div id="current-weather" className="pt-3 px-5 flex flex-col w-full gap-1 min-w-fit">
            
            {selectedForecast && hourlyForecasts && 
                <>
                    <div className="text-base font-semibold">Now</div>
                    <div className="text-sm text-slate-500 font-semibold whitespace-nowrap">{formatDate(new Date(date))}</div>
                    
                    <div className="flex mobile:flex-col laptop:flex-row">
                        <div >
                            <Image
                                src={getWeatherIconPath(selectedForecast.forecast, 'animated')} 
                                alt="weather icon"
                                height={150}
                                width={150}
                            ></Image>
                        </div>
                        <div className="flex flex-col justify-center font-medium">
                            <div>{selectedForecast.area}</div>
                            <div className="text-slate-500">{removeDayNight(selectedForecast?.forecast)}</div>     
                        </div>
                    </div>
                </>
            }
        </div>
    )
}