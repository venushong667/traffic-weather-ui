import CurrentWeather from "./CurrentWeather"
import { Traffic } from "../traffic/TrafficModule"
import { Separator } from "@/components/ui/separator"
import TodayWeather from "./TodayWeather"
import FutureWeather from "./FutureWeather"


interface WeatherModuleProps {
    date: Date,
    selectedLocation: Traffic | undefined,
}

export default function WeatherModule({ date, selectedLocation }: WeatherModuleProps) {

    return (
        <div className="flex flex-col overflow-y-visible">
            <div className="text-xl font-semibold mt-5 ml-5">Weather</div>
            <CurrentWeather date={date} selectedLocation={selectedLocation} />
            <Separator />
            <TodayWeather date={date} selectedLocation={selectedLocation} />
            <div className="my-1"></div>
            <FutureWeather date={date} />
        </div>
    )
}