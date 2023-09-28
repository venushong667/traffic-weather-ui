'use client'

import React from "react";

import CameraImage from "./CameraImage";
import LocationTable from "./LocationTable";

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

interface TrafficModuleProps {
    date: Date,
    selectedLocation: Traffic | undefined,
    selectLocation: React.Dispatch<React.SetStateAction<Traffic | undefined>>
}

export default function TrafficModule({ date, selectedLocation, selectLocation }: TrafficModuleProps) {

    return (
        <>
            <LocationTable
                date={date}
                selectLocation={selectLocation}
            />
            <CameraImage selectedLocation={selectedLocation}/>
        </>
    )
}