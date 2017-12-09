declare interface iLoaderOptions {
    crossOrigin?: boolean;
    loadType?: "audio" | "image" | "video" | "xhr";
    xhrType?: "default" | "buffer" | "blob" | "document" | "json" | "text";
    metadata?: {
        loadElement?: HTMLImageElement | HTMLAudioElement | HTMLVideoElement
        skipSource?: boolean;
        mimeType?: string | string[];
    }
}