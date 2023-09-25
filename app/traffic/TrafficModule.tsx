'use client'

import React, { useState } from "react";
import LocationTable from "./LocationTable";
import CameraImage from "./CameraImage";

interface ImageMetadata {
    height: number,
    width: number,
    md5: string
}

export interface Traffic {
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

interface TrafficContentProps {
    date: Date,
}

export default function TrafficModule({ date }: TrafficContentProps) {
    const [selectedLocation, selectLocation] = useState<Traffic>()

    return (
        <>
            <LocationTable
                date={date}
                selectedLocation={selectedLocation}
                selectLocation={selectLocation}
            />
            <CameraImage selectedLocation={selectedLocation}/>
        </>
    )
}