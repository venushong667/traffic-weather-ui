import React from "react";
import Image, { ImageLoaderProps } from "next/image"
import { Traffic } from "./TrafficContent";

interface CameraImageProps {
    selectedLocation: Traffic | undefined
}

export default function CameraImage({ selectedLocation }: CameraImageProps) {

    const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
        src = selectedLocation?.image.url ?? `/image-placeholder.jpg`
        return `${src}?w=${width}&q=${quality || 75}`
    }

    return (
        <div id="camera-image" className="flex h-full justify-center items-center overflow-hidden relative bg-slate-50 dark:bg-slate-900 rounded-lg">
            <Image
                loader={imageLoader}
                src="/image-placeholder.jpg"
                alt=""
                priority={true}
                quality={100}
                width={300}
                height={300}
                style={{width: 'auto', height: '100%'}}
            ></Image>
        </div>
    )
}