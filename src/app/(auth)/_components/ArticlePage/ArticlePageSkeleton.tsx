import styles from './ArticlePageSkeleton.module.css';

export default function ArticlePageSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonContentContainer}>
        <div className={`${styles.skeleton} ${styles.skeletonContent}`}></div>
      </div>
      <div className={styles.link}>
        <div className={`${styles.skeleton} ${styles.skeletonLink}`}></div>
      </div>
    </div>
  );
}
