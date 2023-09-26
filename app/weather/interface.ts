

export interface Observation {
    forecast: string,
    relative_humidity: { low: number, high: number },
    temperature: { low: number, high: number },
    wind: { 
        speed: { low: number, high: number },
        direction: string
    },
}