'use client'

import React, { useEffect, useState } from "react";

import { ColumnDef, Row } from "@tanstack/react-table";
import { getTraffic } from "./service";
import { DataTable } from "@/components/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Traffic } from "./TrafficModule";


const columns: ColumnDef<Traffic>[] = [
    {
        accessorKey: "address",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Address" hide={false} />
        ),
        meta: { search: true }
    },
    {
        accessorKey: "route",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Route" hide={false} />
        ),
        meta: { search: true }
    },
    {
        accessorKey: "neighborhood",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Area" hide={false} />
        ),
        cell: ({ row }) => <div className="w-full max-w-[150px] truncate">{row.getValue("neighborhood")}</div>,
        meta: { filter: true }
    },
    {
        accessorKey: "region",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Region" hide={false} />
        ),
        cell: ({ row }) => {
            const value = row.getValue<string>("region")
            return <div className="w-[40px]">{ value.substring(0 ,1).toUpperCase() + value.substring(1) }</div>
        },
        meta: { filter: true }
    },
    {
        accessorKey: "timestamp",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Updated at" hide={false} />
        ),
        cell: ({ row }) => <div className="w-[100px] max-w-[100px]">{new Date(row.getValue<string>("timestamp")).toLocaleTimeString()}</div>,
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
        <div id="location-list" className="bg-slate-50 dark:bg-slate-900 rounded-lg p-8">
            <DataTable
                columns={columns}
                data={traffic}
                initialTableState={{ pagination: { pageSize: 5 } }}
                onSelectRow={onSelectRow}
                enableSetPageSize={false}
                enableViewOptions={false}
            />
        </div>
    )
}