import styles from "./SkeletonRubric.module.css";

export default function SkeletonRubric({ perPage }: { perPage: number }) {
  return (
    <div className={styles.container}>
      {Array.from({ length: perPage }).map((_, i) => {

        return (
          <div key={i} className={styles.newsItemContainer}>
            
            {i === 0 && <div className={styles.imgContainer} />}

            <div className={styles.textContainer}>
              <div className={styles.newsTitle} />
              <div className={styles.newsInfo}>

                <div className={styles.tags}>
                  <div className={styles.tag} />
                  <div className={styles.tag} />
                </div>
                <div className={styles.newsDate} />
                <div className={styles.actionInfo}>
                  <div className={styles.actionInfoItem} />
                  <div className={styles.actionInfoItem} />
                </div>

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}