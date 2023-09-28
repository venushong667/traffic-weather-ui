'use client'

import { ColumnDef, Row } from "@tanstack/react-table";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";

import { DataList } from "@/components/data-table/data-list";

import { Traffic } from "./interfaces";
import { getTraffic } from "./service";


const columns: ColumnDef<Traffic>[] = [
    {
        accessorKey: "address",
        cell: ({ row }) => (
            <div id="row" className="flex items-center">
                <div className="cursor-pointer">
                    {row.original.address}
                    <div className="text-xs text-slate-500">{row.original.route.replace(", Singapore", "")}, {row.original.neighborhood}</div>
                </div>
            </div>
        ),
        meta: { search: true, class: "w-full max-w-[300px]", placeholder: "Search Location" },
        accessorFn: row => `${row.address} ${row.route} ${row.neighborhood}`
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
    selectLocation: React.Dispatch<React.SetStateAction<Traffic | undefined>>
}

export default function LocationList( { date, selectLocation }: LocationTableProps) {
    const [traffic, setTraffic] = useState<Traffic[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        handleDateChange(date)
        selectLocation(undefined)
    }, [date, selectLocation])

    async function handleDateChange(date: Date) {
        setLoading(true)
        const data = await getTraffic(date) satisfies Traffic[] as Traffic[];
        setTraffic(data)
        setLoading(false)
    }

    const onSelectRow = (row: Row<Traffic>) => {
        selectLocation(row.original)
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="font-bold">Locations</div>
            <DataList
                columns={columns}
                data={traffic}
                onSelectRow={onSelectRow}
                enableViewOptions={false}
                isLoading={isLoading}
            />
        </div>
    )
}