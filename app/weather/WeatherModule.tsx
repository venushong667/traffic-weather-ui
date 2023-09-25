import CurrentWeather from "./CurrentWeather"
import { Traffic } from "../traffic/TrafficModule"


interface WeatherModuleProps {
    date: Date,
    selectedLocation: Traffic | undefined,
}

export default function WeatherModule({ date, selectedLocation }: WeatherModuleProps) {

    return (
        <>
            <CurrentWeather date={date} selectedLocation={selectedLocation} />
        </>
    )
}