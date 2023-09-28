import { ForecastType } from "./interfaces"

export function getWeatherIconPath(forecastType: string, svgType: 'animated' | 'static') {
    const type = forecastType.toLowerCase().trim()
    const time = type.includes('day') ? '/day' : type.includes('night') ? '/night' : ''
    let svgName = removeDayNight(type).trim()

    const foundIcon = Object.values(ForecastType).find(type => svgName.includes(type))
    if (foundIcon) {
        svgName = foundIcon
    }
    
    return `/weather/${svgType}${time}/${foundIcon}.svg`
}

export function removeDayNight(text: string) {
    return text.replace(/\(([D|d]ay|[N|n]ight)\)/g,'')
}