import styles from './ArticlePageSkeleton.module.css';

export default function ArticlePageSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
      <div className={styles.skeletonSection}>
        <div className={`${styles.skeleton} ${styles.skeletonSidebar}`}></div>
        <div className={`${styles.skeleton} ${styles.skeletonContent}`}></div>
      </div>
    </div>
  );
}
