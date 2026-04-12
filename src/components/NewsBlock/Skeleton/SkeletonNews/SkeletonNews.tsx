import styles from "./SkeletonNews.module.css";

export default function SkeletonNews({ perPage, isMobile }: { perPage: number; isMobile: boolean }) {

    return (
        <div className={styles.container}>
            {Array.from({ length: perPage }).map((_, i) => (
                <div key={i} className={styles.newsItemContainer}>
                    {!isMobile || i === 0 && (
                        <div className={styles.imgContainer}></div>
                    )}
                    <div className={styles.textContainer}>
                        <div className={styles.newsDate} />
                        <div className={styles.newsTitle} />
                        <div className={styles.newsInfo}>
                            <div className={styles.tags}>
                                <div className={styles.tag} />
                                <div className={styles.tag} />
                            </div>

                            <div className={styles.actionInfo}>
                                <div className={styles.actionInfoItem} />
                                <div className={styles.actionInfoItem} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}