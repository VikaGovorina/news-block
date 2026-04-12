import { IconEye, IconThumbUp, IconStarFilled } from "@tabler/icons-react";
import { ENV } from "../../../../config/env";
import type { NewsItem } from "../../../../types/news";
import styles from "./RubricLayout.module.css";
import { DateFormatter } from "../../../../utils/DateFormatter";
import { useLazyImage } from "../../../../hooks/useLazyImg";

interface RubricLayoutProps {
    news: NewsItem;
    showImg: boolean;
    isTopNews: boolean;
}

export default function RubricLayout({ news, showImg, isTopNews }: RubricLayoutProps) {
    const img = `${ENV.BASE_NEWS_URL}${news.cover?.images[0]?.hd}`;
    const { ref, visibleSrc } = useLazyImage(img);

    return (
        <div className={styles.newsItemContainer}>
            {showImg &&
                <div className={styles.imgContainer}>
                    <img
                        // src={`${ENV.BASE_NEWS_URL}${news.cover?.images[0]?.hd}`}
                        src={visibleSrc}
                        ref={ref}
                        alt={news.title}
                    ></img>
                </div>
            }
            {isTopNews && (<div className={styles.topNews}>
                <IconStarFilled width={'12.25px'} height={'12.25px'} />
                <p>Топ новость</p>
            </div>)}
            <div className={styles.textContainer}>
                <p className={styles.newsTitle}>{news.title}</p>
                <div className={styles.newsInfo}>
                    <div className={styles.tags}>
                        {news.rubrics.map((rubric) => (
                            <p key={rubric.id}>{`#${rubric.name}`}</p>
                        ))}
                    </div>
                    <p className={styles.newsDate}>{DateFormatter.getDateMonthYear(news.publishedAt)}</p>
                    <div className={styles.actionInfo}>
                        <div className={styles.actionInfoItem}>
                            <IconThumbUp width={'14px'} height={'14px'}/>
                            <p>{news.likeCount}</p>
                        </div>
                        <div className={styles.actionInfoItem}>
                            <IconEye width={'14px'} height={'14px'}/>
                            <p>{news.viewCount}</p>
                        </div>
                        
                    </div>
                </div>
            </div>           
        </div>
    );
}