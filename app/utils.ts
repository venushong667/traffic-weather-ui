import { DateTime } from "luxon"

export function formatDate(datetime: string | Date, format = "HH:mm a") {
    if (datetime instanceof Date) {
        return DateTime.fromJSDate(datetime).toFormat(format)
    }
    return DateTime.fromJSDate(new Date(datetime)).toFormat(format)
}