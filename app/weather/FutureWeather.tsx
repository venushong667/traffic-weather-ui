import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image"
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { formatDate } from "../utils";
import { FutureForecast } from "./interfaces";
import { getWeatherForecasts } from "./service";
import { getWeatherIconPath } from "./utils";


interface FutureWeatherProps {
    date: Date
}

export default function FutureWeather({ date }: FutureWeatherProps) {
    const [futureForecasts, setFutureForecasts] = useState<FutureForecast>()
    const forecastListRef = useRef<HTMLDivElement>(null);
    const [canScroll, setCanScroll] = useState({ right: false, left: false })
    
    useLayoutEffect(() => {
        function updateCanScroll() {
            if (!forecastListRef.current) return
            const scrollLimit = forecastListRef.current.scrollWidth - forecastListRef.current.clientWidth

            setCanScroll({
                left: scrollLimit !== 0 && scrollLimit >= 0,
                right: scrollLimit !== 0 && scrollLimit !== forecastListRef.current?.scrollLeft 
            })
        }
        window.addEventListener('resize', updateCanScroll);
        updateCanScroll();

        return () => window.removeEventListener('resize', updateCanScroll);
    }, []);

    useEffect(() => {
        getFutureForecasts(date)
    }, [date])

    async function getFutureForecasts(date: Date) {
        const data = (await getWeatherForecasts('4-day', date))
        if (data) {
            setFutureForecasts(data[0])
            setCanScroll({ right: true, left: false })
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

        const scrollable = forecastListRef.current.scrollWidth - forecastListRef.current.clientWidth !== 0
        
        setCanScroll({
            left: scrollable && deltaXAfterScroll >= 0,
            right: scrollable && deltaXAfterScroll <= forecastListRef.current.scrollWidth - forecastListRef.current.clientWidth 
        })
    }

    return (
        <div id="forecast-weather" className="w-full p-5 mobile:min-w-fit laptop:min-w-full">
            <div className="text-base font-semibold mb-5">4 Day Forecasts</div>
            <div className="relative mobile:w-fit laptop:w-auto">
                {canScroll.left &&
                    <Button variant="outline" size="icon" className="absolute my-auto rounded-xl top-0 bottom-0 left-2 z-10 bg-slate-50 dark:bg-slate-800 bg-opacity-70" onClick={(e) => {scrollForecasts('right');e.preventDefault();}}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                }
                <div ref={forecastListRef} className="mobile:grid mobile:grid-cols-2 laptop:flex gap-2 w-full mr-5 relative scroll-smooth overflow-hidden">
                    {futureForecasts?.forecasts.map(forecast => (
                        <div key={forecast.date} className="grid mobile:col-span-1 justify-items-center border rounded-xl w-[120px] shrink-0 p-2">
                            <div className="w-fit text-sm font-bold text-slate-500">{formatDate(forecast.date, 'MMM dd')}</div>
                            <Image
                                src={getWeatherIconPath(forecast.forecast, 'static')}
                                alt="weather icon"
                                height={90}
                                width={90}
                            ></Image>
                            <div className="w-fit text-sm font-semibold text-slate-700 dark:text-slate-300">{forecast.temperature.low}&deg; - {forecast.temperature.high}&deg;</div>
                        </div>
                    ))}
                </div>
                {canScroll.right &&
                    <Button variant="outline" size="icon" className="absolute my-auto rounded-xl top-0 bottom-0 right-2 z-10 bg-slate-50 dark:bg-slate-800 bg-opacity-70" onClick={(e) => {scrollForecasts('left');e.preventDefault();}}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                }
            </div>
        </div>
    )
}