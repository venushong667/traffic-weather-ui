import { formatDate } from "@/lib/utils";
import { Traffic } from "../traffic/TrafficModule";
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { getWeatherForecasts } from "./service";
import { Observation } from "./interface";
import { getWeatherIconPath } from "./utils";


interface FutureForecast {
    forecasts: Forecast[]
}

interface Forecast extends Observation {
    date: string,
    forecast: string
}

enum ForecastType {
    cloudy = 'cloudy',
    light_rain = 'light rain',
    light_showers = 'light showers',
    moderate_rain = 'moderate rain',
    windy = 'windy',
    showers = 'showers',
    thundery_showers = 'thundery showers',
    fair = 'fair'
}

interface FutureWeatherProps {
    date: Date
}

export default function FutureWeather({ date }: FutureWeatherProps) {
    const [futureForecasts, setFutureForecasts] = useState<FutureForecast>()
    const forecastListRef = useRef<HTMLDivElement>(null);
    const [canScroll, setCanScroll] = useState({ right: true, left: false })

    useEffect(() => {
        getFutureForecasts(date)
    }, [date])

    async function getFutureForecasts(date: Date) {
        const data = (await getWeatherForecasts('4-day', date))
        if (data) {
            setFutureForecasts(data[0])
        }
    }
    
    function scrollForecasts(direction: string) {
        if (!forecastListRef.current) return

        let deltaX: number = -300;
        if (direction === 'left') {
            deltaX = Math.abs(deltaX)
        }

        const deltaXAfterScroll = forecastListRef.current?.scrollLeft + deltaX

        forecastListRef.current?.scrollTo({
            left: deltaXAfterScroll
        })

        setCanScroll({
            left: deltaXAfterScroll >= 0,
            right: deltaXAfterScroll <= forecastListRef.current.scrollWidth - forecastListRef.current.clientWidth
        })
    }

    return (
        <div className="w-full p-5">
            <div className="text-base font-semibold mb-5">4 Day Forecasts</div>
            <div className="relative">
                {canScroll.left &&
                    <Button variant="outline" size="icon" className="absolute my-auto rounded-xl top-0 bottom-0 left-2 z-10" onClick={(e) => {scrollForecasts('right');e.preventDefault();}}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                }
                <div ref={forecastListRef} className="flex gap-2 w-full mr-5 relative scroll-smooth overflow-hidden">
                    {futureForecasts?.forecasts.map(forecast => (
                        <div key={forecast.date} className="grid justify-items-center border rounded-xl w-[120px] shrink-0 p-2">
                            <div className="w-fit text-sm font-medium text-slate-700">{formatDate(forecast.date, 'MMM dd')}</div>
                            <Image
                                src={getWeatherIconPath(forecast.forecast, 'static')}
                                alt="weather icon"
                                height={60}
                                width={90}
                            ></Image>
                            <div className="w-fit text-sm font-medium text-slate-700">{forecast.temperature.low}&deg; - {forecast.temperature.high}&deg;</div>
                        </div>
                    ))}
                </div>
                {canScroll.right &&
                    <Button variant="outline" size="icon" className="absolute my-auto rounded-xl top-0 bottom-0 right-2 z-10" onClick={(e) => {scrollForecasts('left');e.preventDefault();}}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                }
            </div>
        </div>
    )
}