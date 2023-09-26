import { formatDate } from "@/lib/utils";
import { Traffic } from "../traffic/TrafficModule";
import Image from "next/image"
import { Compass, Droplets, LucideProps, Thermometer, Wind, icons } from "lucide-react";
import { useEffect, useState } from "react";
import { getWeatherForecasts } from "./service";



interface TodayForecast {
    update_timestamp: string,
    timestamp: string,
    valid_period: { start: string, end: string }
    general: GeneralForecast,
    periods: Period[]
}

interface GeneralForecast {
    forecast: string,
    relative_humidity: { low: number, high: number },
    temperature: { low: number, high: number },
    wind: { 
        speed: { low: number, high: number },
        direction: string
    },
}

interface Period {
    time: { start: string, end: string },
    regions: {
        [region: string]: string,
    }
}


const general = {
    forecast: "Fair (Day)",
    relative_humidity: {
        low: 55,
        high: 85
    },
    temperature: {
        low: 25,
        high: 34
    },
    wind: {
        speed: {
            low: 10,
            high: 30
        },
        direction: "S"
    }
}


const periods = [{
    forecast: "Sunny",
    valid_time: {
        start: new Date().toLocaleString(),
        end: new Date().toLocaleString()
    }
},{
    forecast: "Sunny",
    valid_time: {
        start: new Date().toLocaleString(),
        end: new Date().toLocaleString()
    } 
},{
    forecast: "Sunny",
    valid_time: {
        start: new Date().toLocaleString(),
        end: new Date().toLocaleString()
    } 
},{
    forecast: "Sunny",
    valid_time: {
        start: new Date().toLocaleString(),
        end: new Date().toLocaleString()
    } 
}]

interface TodayWeatherProps {
    date: Date,
    selectedLocation: Traffic | undefined,
}

export default function TodayWeather({ date, selectedLocation }: TodayWeatherProps) {

    function LucideIcon({ icon: Icon }: { icon: React.FC<LucideProps> }) {
        const props = {size: 30, className:"stroke-slate-700 shrink-0"}
        return <Icon {...props} />;
    }

    const observationChips = (title: string, value: string, icon: any) => {

        return (
            <div className="flex gap-3 items-center">
                <LucideIcon icon={icon} />
                <div>
                    <div className="text-xs text-slate-600 whitespace-nowrap">{title}</div>
                    <span className="text-sm font-semibold whitespace-nowrap">{value}</span>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full p-5 flex flex-col gap-5">
            <div className="text-base font-semibold">Today</div>
            <div id="periods" className="grid grid-cols-4 justify-between">
                {periods.map((period, i) => (

                    <div key={i} className="flex flex-col items-center min-w-[80px]">
                        <Image
                            src="/weather/static/cloudy-night-1.svg" 
                            alt="weather icon"
                            height={100}
                            width={100}
                        ></Image>
                        <div className="text-sm text-slate-800 font-medium">{formatDate(period.valid_time.start)}</div>
                        <div className="text-sm text-slate-500">{period.forecast}</div>
                    </div>
                ))}
            </div>
            <div id="info" className="grid grid-cols-2 gap-5">
                {observationChips("Temperature", `${general.temperature.low}\u00B0 - ${general.temperature.high}\u00B0`, Thermometer)}
                {observationChips("Humidity", `${general.relative_humidity.low}% - ${general.relative_humidity.high}%`, Droplets)}
                {observationChips("Wind Speed", `${general.wind.speed.low} - ${general.wind.speed.high}km`, Wind)}
                {observationChips("Wind Direction", general.wind.direction, Compass)}
            </div>
        </div>
    )
}