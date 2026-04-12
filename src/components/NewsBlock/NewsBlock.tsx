import { useEffect, useState } from "react";
import { type NewsResponse } from "../../types/news";
import { NewsApi } from "../../api/newsApi";
import NewsItem from "./NewsItem/NewsItem";
import { DateFormatter } from "../../utils/DateFormatter";
import { IconArrowLeft, IconArrowRight, IconLoader2 } from "@tabler/icons-react";
import styles from "./NewsBlock.module.css";
import placeholder from "../../assets/images/placeholder.svg";
import Skeleton from "./Skeleton/Skeleton";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface NewsBlockProps {
    blockTitle: string;
    perPage?: number;
    state?: string;
}

export default function NewsBlock({ blockTitle, perPage = 3, state = "news" }: NewsBlockProps) {
    const [page, setPage] = useState(1);
    const [data, setData] = useState<NewsResponse | null>(null);
    const [cache, setCache] = useState<Record<number, NewsResponse>>({});
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [loaderDirection, setLoaderDirection] = useState<"left" | "right" | null>(null);
    const isMobile = useMediaQuery('(max-width: 1024px)');

    async function loadNews() {
        try {
            if (!cache[page]) {
                setLoading(true);    
            }
            
            const newsData = state === "empty"
                ? await NewsApi.getEmptyNews()
                : await NewsApi.getNews(page, perPage);

            if (newsData.news.length === 0) {
                setData(null);    
            } else {
                setData(newsData);
                setCache((prev) => ({ ...prev, [page]: newsData }));
            }
            
        } catch (error) {
            console.error('Error fetching news:', error);
            setIsError(true);
            setLoading(false);
            setLoaderDirection(null);
            setData(null);
        } finally {
            setLoading(false);
            setLoaderDirection(null);
        }
    }

    useEffect(() => {
        if (cache[page]) {
            setData(cache[page]);
            setLoaderDirection(null);
            return;
        }

        loadNews();
    }, [page]);

    const handlePrevPage = () => {
        if (page > 1 && !loading) {
            setLoaderDirection('left');
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (data && page < data.totalPages && !loading) {
            setLoaderDirection('right');
            setPage(page + 1);
        }
    };

    return (
        <div className={styles.newsBlock}>

            <div className={styles.blockHeader}>
                <h1>{blockTitle}</h1>
                <p>{!data?.news.length
                    ? DateFormatter.getCurrentWeekdayDateMonth()
                    : DateFormatter.getCurrentMonthYear()}
                </p>
            </div>

            {isError && <div>Ошибка загрузки</div>}

            {loading && (
                <Skeleton state={state} perPage={perPage} isMobile={isMobile}/>
            )}

            {!data?.news.length && !loading && (
                <div className={styles.placeholder}>
                    <div className={styles.placeholderContainer}>
                        <img alt="Новых новостей нет" src={placeholder}></img>
                    </div>
                    <p>Новых новостей нет</p>
                </div>
            )}
            
            {!loading && data && data.news.length > 0 && (
                <div>
                    <div className={`${styles.newsItems} ${(isMobile || state === 'rubric') && styles.divider} ${state === 'rubric' && styles.rubric}`}>
                        {data.news.map((item, index) => (
                            <div
                                key={item.id}
                                className={styles.animateItem}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <NewsItem
                                    key={item.id}
                                    news={item}
                                    state={state}
                                    index={index}
                                    isMobile={isMobile}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={styles.navBtnsContainer}>
                        <div>
                            {loaderDirection === 'left' ? (
                                <IconLoader2 
                                    color="var(--icon)" 
                                    className={styles.spinner}
                                />
                            ) : (
                                <IconArrowLeft
                                    onClick={handlePrevPage}
                                    color="var(--icon)"
                                    className={page > 1 ? "" : styles.disabled}
                                />
                            )}
                            
                            {loaderDirection === 'right' ? (
                                <IconLoader2 
                                    color="var(--icon)" 
                                    className={styles.spinner}
                                />
                            ) : (
                                <IconArrowRight
                                    onClick={handleNextPage}
                                    color="var(--icon)"
                                    className={page < data.totalPages ? "" : styles.disabled}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}