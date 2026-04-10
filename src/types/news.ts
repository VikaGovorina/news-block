
export interface NewsItem {
    id: number;
    title: string;
    cover: {
        images: {
            s: string;
            m: string;
            l: string;
            hd: string;
        }[];
    };
    likeCount: number;
    viewCount: number;
    publishedAt: string;
    rubrics: {
        id: number;
        slug: string;
        name: string;
    }[];
}

export interface NewsResponse {
    totalPages: number;
    perPage: number;
    news: NewsItem[];
    minDatePublication: string;
}