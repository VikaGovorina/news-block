import { useEffect, useState } from "react";
import { type NewsResponse } from "../../types/news";
import { NewsApi } from "../../api/newsApi";

export default function NewsBlock() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState<NewsResponse | null>(null);
    const [cache, setCache] = useState<Record<number, NewsResponse>>({});
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    async function loadNews() {
        try {
            setLoading(true);
            const newsData = await NewsApi.getNews(1, 3);
            setData(newsData);
            setCache((prev) => ({ ...prev, [page]: newsData }));
            console.log(newsData);
        } catch (error) {
            console.error('Error fetching news:', error);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (cache[page]) {
            setData(cache[page]);
            return;
        }

        loadNews();
    }, [page]);

    return (
        <div>
            
        </div>
    );
}