import { useLazyImage } from "../../../../hooks/useLazyImg";
import type { NewsItem } from "../../../../types/news";
import { DateFormatter } from "../../../../utils/DateFormatter";
import styles from "./NewsLayout.module.css";
import { IconEye, IconThumbUp } from '@tabler/icons-react';

export default function NewsLayout({ news, showImg }: { news: NewsItem; showImg: boolean }) {
    const img = `${news.cover?.images[0]?.hd}`;
    const { ref, visibleSrc } = useLazyImage(img);

    return (
        <div className={styles.newsItemContainer}>
            {showImg && (<div className={styles.imgContainer}>
                <img
                    src={visibleSrc}
                    alt={news.title}
                    ref={ref}
                ></img>
            </div>)}
            <div className={styles.textContainer}>
                <p className={styles.newsDate}>{DateFormatter.getDateMonthsTime(news.publishedAt)}</p>
                <p className={styles.newsTitle}>{news.title}</p>
                <div className={styles.newsInfo}>
                    <div className={styles.tags}>
                        {news.rubrics.map((rubric) => (
                            <p key={rubric.id}>{rubric.name}</p>
                        ))}
                    </div>
                    <div className={styles.actionInfo}>
                        <div className={styles.actionInfoItem}>
                            <IconThumbUp width={'21px'} height={'21px'}/>
                            <p>{news.likeCount}</p>
                        </div>
                        <div className={styles.actionInfoItem}>
                            <IconEye width={'21px'} height={'21px'}/>
                            <p>{news.viewCount}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}