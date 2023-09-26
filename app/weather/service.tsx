import { formatDate } from '@/lib/utils';

export type Duration = '2-hour' | '24-hour' | '4-day'

export const getWeatherForecasts = async (duration: Duration = '2-hour', datetime?: Date, date?: Date) => {
    try {
        let query = '?' + new URLSearchParams({ duration: duration })
        if (datetime) {
            const dt = formatDate(datetime, "yyyy-MM-dd'T'HH:mm:ss");
            query += '&' + new URLSearchParams({ date_time: dt })
        }
        if (date) {
            const d = formatDate(date, "yyyy-MM-dd");
            formatDate
            query += '&' + new URLSearchParams({ date: d })
        } 

        const request = await fetch(`/api/weather` + query)
        const res = await request.json()
        
        return res.data
    } catch (err) {
        throw err;
    }
}