import { type ClassValue, clsx } from "clsx"
import { DateTime } from "luxon"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(datetime: string | Date, format = "HH:mm a") {
    if (datetime instanceof Date) {
        return DateTime.fromJSDate(datetime).toFormat(format)
    }
    return DateTime.fromJSDate(new Date(datetime)).toFormat(format)
}