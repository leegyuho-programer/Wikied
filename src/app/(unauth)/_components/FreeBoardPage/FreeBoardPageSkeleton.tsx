import styles from './FreeBoardPageSkeleton.module.css';

export default function FreeBoardPageSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
        <div className={`${styles.skeleton} ${styles.skeletonButton}`}></div>
      </div>
      <div className={styles.skeletonCardWrapper}>
        <div className={`${styles.skeleton} ${styles.skeletonCard}`}></div>
        <div className={`${styles.skeleton} ${styles.skeletonCard}`}></div>
        <div className={`${styles.skeleton} ${styles.skeletonCard}`}></div>
        <div className={`${styles.skeleton} ${styles.skeletonCard}`}></div>
      </div>
      <div className={`${styles.skeleton} ${styles.skeletonSearch}`}></div>
      <div className={`${styles.skeleton} ${styles.skeletonPagination}`}></div>
    </div>
  );
}
