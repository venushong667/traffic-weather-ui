export function getWeatherIconPath(forecastType: string, svgType: 'animated' | 'static') {
    const type = forecastType.toLowerCase().trim()
    const time = type.includes('day') ? '/day' : type.includes('night') ? '/night' : ''
    const svgName = removeDayNight(type).trim()

    return `/weather/${svgType}${time}/${svgName}.svg`
}

export function removeDayNight(text: string) {
    return text.replace(/\(([D|d]ay|[N|n]ight)\)/g,'')
}