'use client'

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Image, { ImageLoaderProps } from "next/image"

import { ColumnDef, Row } from "@tanstack/react-table";
import { getTraffic } from "../service";
import { DataTable } from "@/components/data-table";


const columns: ColumnDef<any>[] = [
    {
        accessorKey: "address",
        header: "Address",
        meta: { search: true }
    },
    {
        accessorKey: "route",
        header: "Route",
        meta: { filter: true }
    },
    {
        accessorKey: "region",
        header: "Region",
        meta: { filter: true }
    },
]

interface ImageMetadata {
    height: number,
    width: number,
    md5: string
}

interface Traffic {
    id: string,
    address: string,
    route: string,
    neighborhood: string,
    region: string,
    image: {
        url: string,
        metadata: ImageMetadata
    },
    timestamp: string
}

interface LocationTableProps {
    date: Date
}

export default function LocationTable( { date }: LocationTableProps) {
    const [traffic, setTraffic] = useState<Traffic[]>([])
    const [selectedLoc, selectLoc] = useState<Traffic>()

    useEffect(() => {
        handleDateChange(date)
    }, [date])

    async function handleDateChange(date: Date) {
        const data = await getTraffic(date)
        setTraffic(data)
    }
    
    const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
        return selectedLoc?.image.url ?? "/image-placeholder.jpg"
    }

    return (
        <>
            <div id="location-list">
                <DataTable
                    columns={columns}
                    data={traffic}
                    initialTableState={{ pagination: { pageSize: 5 } }}
                />
            </div>
            <div className="h-[500px] flex justify-center items-center overflow-hidden">
                <Image
                    loader={imageLoader}
                    src="/image-placeholder.jpg"
                    alt=""
                    width="800"
                    height="100"
                ></Image>
            </div>
        </>

    )
}

LocationTable.propTypes = {
    date: PropTypes.instanceOf(Date)
};