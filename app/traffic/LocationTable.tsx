'use client'

import React, { useEffect, useState } from "react";

import { ColumnDef, Row } from "@tanstack/react-table";
import { getTraffic } from "./service";
import { Traffic } from "./TrafficModule";
import { DateTime } from "luxon";
import { DataList } from "@/components/data-table/data-list";


const columns: ColumnDef<Traffic>[] = [
    {
        accessorKey: "address",
        cell: ({ row }) => (
            <div id="row" className="flex items-center">
                <div className="cursor-pointer">
                    {row.getValue("address")}
                    <div className="text-xs text-slate-500">{row.getValue("route")}, {row.getValue("neighborhood")}</div>
                </div>
            </div>
        ),
        meta: { search: true }
    },
    {
        accessorKey: "route",
        cell: undefined,
        meta: { search: true }
    },
    {
        accessorKey: "neighborhood",
        cell: undefined,
        meta: { filter: true }
    },
    {
        accessorKey: "timestamp",
        cell: ({ row }) => <div className="w-[100px] max-w-[100px] ml-auto ">
            {DateTime.fromJSDate(new Date(row.getValue("timestamp"))).toFormat("HH:mm a")}
        </div>,
    },
]

interface LocationTableProps {
    date: Date,
    selectedLocation: Traffic | undefined,
    selectLocation: React.Dispatch<React.SetStateAction<Traffic | undefined>>
}

export default function LocationTable( { date, selectedLocation, selectLocation }: LocationTableProps) {
    const [traffic, setTraffic] = useState<Traffic[]>([])

    useEffect(() => {
        handleDateChange(date)
        selectLocation(undefined)
    }, [date, selectLocation])

    async function handleDateChange(date: Date) {
        const data = await getTraffic(date)
        setTraffic(data)
    }

    const onSelectRow = (row: Row<Traffic>) => {
        selectLocation(row.original)
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="font-bold text-blue-700 dark:text-blue-200">Locations</div>
            <DataList
                columns={columns}
                data={traffic}
                onSelectRow={onSelectRow}
                enableViewOptions={false}
            />
        </div>
    )
}