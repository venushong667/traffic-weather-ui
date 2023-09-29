import { Separator } from "@/components/ui/separator"

import { Traffic } from "../traffic/interfaces"
import CurrentWeather from "./CurrentWeather"
import FutureWeather from "./FutureWeather"
import TodayWeather from "./TodayWeather"


interface WeatherModuleProps {
    date: Date,
    selectedLocation: Traffic | undefined,
}

export default function WeatherModule({ date, selectedLocation }: WeatherModuleProps) {

    return (
        <>
            <div className="text-xl font-bold mt-5 ml-5">Weather</div>
            <div className="flex mobile:flex-row laptop:flex-col overflow-y-visible">
                {selectedLocation && 
                <>
                    <CurrentWeather date={date} selectedLocation={selectedLocation} />
                    <Separator className="mobile:hidden laptop:block"/>
                </>
                }
                <TodayWeather date={date} selectedLocation={selectedLocation} />
                <div className="my-1"></div>
                <FutureWeather date={date} />
            </div>
        </>
    )
}