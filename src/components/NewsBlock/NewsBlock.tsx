import { useEffect, useState } from "react";
import { type NewsResponse } from "../../types/news";
import { NewsApi } from "../../api/newsApi";
import NewsItem from "./NewsItem/NewsItem";
import { DateFormatter } from "../../utils/DateFormatter";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import styles from "./NewsBlock.module.css";

export default function NewsBlock({ blockTitle, state = "news" }: { blockTitle: string, state?: string }) {
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
        <div className={styles.newsBlock}>

            <div className={styles.blockHeader}>
                <h1>{blockTitle}</h1>
                <p>{DateFormatter.getCurrentMonthYear()}</p>
            </div>
            
            {data && data.news.length > 0 && (
                <div>
                    <div className={styles.newsItems}>
                        {data.news.map((item, index) => (
                            <NewsItem
                                key={item.id}
                                news={item}
                                state={state}
                                index={index}
                            />
                        ))}
                    </div>
                    <div className={styles.navBtnsContainer}>
                        <div>
                            <IconArrowLeft onClick={() => setPage(page - 1)}/>
                            <IconArrowRight onClick={() => setPage(page + 1)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}