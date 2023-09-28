"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateTime } from 'luxon';
import PropTypes from "prop-types";
import * as React from "react"
import { SelectSingleEventHandler } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface DatePickerProps {
    date: Date | undefined,
    setDate: (date: Date) => void
}

interface Time {
    hour?: number,
    minute?: number,
    unit?: string,
}

export function DatePicker({
    date,
    setDate
}: DatePickerProps) {
    const arrayRange = (start: number, stop: number, step: number) => {
        return Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => {
                let num = (start + index * step).toString();
                if (num.length < 2) num = "0" + num;
                return num;
            }
        );
    }
    const hours = arrayRange(1, 12, 1)
    const minutes = arrayRange(0, 60, 5);
    const units = ["AM", "PM"];

    const [selectedDateTime, setSelectedDateTime] = React.useState<DateTime | undefined>(date ? DateTime.fromJSDate(date) : undefined);

    React.useEffect(() => {
        if (!date) return

        setSelectedDateTime(DateTime.fromJSDate(date))
    }, [date])
    
    const handleDateSelect: SelectSingleEventHandler = (day, selected) => {
        const selectedDay = DateTime.fromJSDate(selected);
        const modifiedDay = selectedDay.set({
            hour: selectedDateTime?.hour,
            minute: selectedDateTime?.minute,
        });
        
        setSelectedDateTime(modifiedDay);
        setDate(modifiedDay.toJSDate());
    };
    
    // Need define the value object { hour | minute | unit: value: string }
    const handleTimeChange = (value: Time) => {
        if (!selectedDateTime) return;

        if (value.unit) {
            if (value.unit === 'AM' && selectedDateTime.hour < 12) return;
            if (value.unit === 'PM' && selectedDateTime.hour >= 12) return;

            const hourDiff = value.unit === 'PM' ? 12: -12
            value.hour = selectedDateTime.hour + hourDiff
            delete value.unit
        }
        const modifiedDay = selectedDateTime.set({...value});
        
        setSelectedDateTime(modifiedDay);
        setDate(modifiedDay.toJSDate());
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const hours = Number.parseInt(value.split(':')[0] || '00', 10);
        const minutes = Number.parseInt(value.split(':')[1] || '00', 10);

        handleTimeChange({ hour: hours, minute: minutes });
    };

    const menuGroup = (arrays: number[] | string[], key: string) => (
        <>
            <ScrollArea>
                <DropdownMenuGroup className="min-w-[50px] flex-1 overflow-y-auto">
                    {arrays.map((item) => (
                        <DropdownMenuItem key={item.toString()} className="text-sm" onSelect={(e) => {handleTimeChange({[key]: item}); e.preventDefault()}}>
                            {item}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </ScrollArea>
        </>
    )

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[250px] h-auto justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Input
                        className="px-4 shadow-sm w-[200px]"
                        type="time"
                        value={selectedDateTime ? selectedDateTime.toFormat("HH:mm") : undefined}
                        onChange={handleInputChange}
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-auto max-h-[200px] flex flex-row">
                    {menuGroup(hours, 'hour')}
                    {menuGroup(minutes, 'minute')}
                    {menuGroup(units, 'unit')}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

DatePicker.propTypes = {
    date: PropTypes.instanceOf(Date),
    setDate: PropTypes.func.isRequired
};