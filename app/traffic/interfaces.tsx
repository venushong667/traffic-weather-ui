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
