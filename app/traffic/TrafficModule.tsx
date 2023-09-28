'use client'

import React from "react";

import CameraImage from "./CameraImage";
import { Traffic } from "./interfaces";
import LocationList from "./LocationList";

interface TrafficModuleProps {
    date: Date,
    selectedLocation: Traffic | undefined,
    selectLocation: React.Dispatch<React.SetStateAction<Traffic | undefined>>
}

export default function TrafficModule({ date, selectedLocation, selectLocation }: TrafficModuleProps) {

    return (
        <>
            <LocationList
                date={date}
                selectLocation={selectLocation}
            />
            <CameraImage selectedLocation={selectedLocation}/>
        </>
    )
}