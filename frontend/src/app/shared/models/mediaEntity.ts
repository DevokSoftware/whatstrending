export class MediaEntity{
    expandedURL: string;
    type: string;
    mediaURLHttps:string;
    videoVariants : VideoVariants[]
}

class VideoVariants{
    url:string
}