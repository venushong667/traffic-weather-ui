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
                selectedLocation={selectedLocation}
                selectLocation={selectLocation}
            />
            <CameraImage selectedLocation={selectedLocation}/>
        </>
    )
}