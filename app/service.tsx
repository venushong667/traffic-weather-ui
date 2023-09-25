import { DateTime } from 'luxon';

export const getTraffic = async (datetime?: Date) => {
    try {
        let query = '?'
        if (datetime) {
            const dt = DateTime.fromJSDate(datetime).toFormat("yyyy-MM-dd'T'HH:mm:ss");
            query += new URLSearchParams({ date_time: dt })
        }
        const request = await fetch(`/api/traffic` + query)
        const res = await request.json()
        
        return res.data
    } catch (err) {
        throw err;
    }
}