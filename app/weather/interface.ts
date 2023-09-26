
export enum ForecastType {
    thundery_showers = 'thundery showers',
    light_showers = 'light showers',
    light_rain = 'light rain',
    moderate_rain = 'moderate rain',
    partly_cloudy = 'partly cloudy',
    windy = 'windy',
    showers = 'showers',
    fair = 'fair',
    cloudy = 'cloudy',
}

export interface Observation {
    forecast: string,
    relative_humidity: { low: number, high: number },
    temperature: { low: number, high: number },
    wind: { 
        speed: { low: number, high: number },
        direction: string
    },
}

export interface HourlyForecast {
    valid_period: { start: string, end: string }
    forecasts: AreaForecast[]
}

export interface AreaForecast {
    area: string,
    forecast: string,
}

export interface FutureForecast {
    forecasts: DateForecast[]
}

export interface DateForecast extends Observation {
    date: string,
    forecast: string
}

export interface DailyForecast {
    valid_period: { start: string, end: string }
    general: Observation,
    periods: Period[]
}

export interface Period {
    time: { start: string, end: string },
    regions: {
        [region: string]: string,
    }
}
