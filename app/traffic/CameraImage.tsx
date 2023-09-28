import Image, { ImageLoaderProps } from "next/image"
import React from "react";

import { Traffic } from "./TrafficModule";

interface CameraImageProps {
    selectedLocation: Traffic | undefined
}

export default function CameraImage({ selectedLocation }: CameraImageProps) {

    const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
        src = selectedLocation?.image.url ?? `/image-placeholder.jpg`
        return `${src}?w=${width}&q=${quality || 75}`
    }

    return (
        <div id="camera-image" className="h-full min-h-[300px] relative g-slate-50 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <Image
                loader={imageLoader}
                src="/image-placeholder.jpg"
                alt=""
                priority={true}
                quality={100}
                fill
                style={{
                    objectFit: 'contain'
                }}
            ></Image>
        </div>
    )
}