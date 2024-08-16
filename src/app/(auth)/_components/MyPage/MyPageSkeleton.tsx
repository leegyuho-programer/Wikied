import styles from './MyPageSkeleton.module.css';

export default function MyPageSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
      <div className={styles.skeletonSection}>
        <div className={`${styles.skeleton} ${styles.skeletonSideBarContainer}`}></div>
        <div className={`${styles.skeleton} ${styles.skeletonContent}`}></div>
      </div>
    </div>
  );
}
