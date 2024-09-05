// SkeletonLoader.jsx
import styles from './WikiListPageSkeleton.module.css';

export default function WikiListPageSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={`${styles.skeleton} ${styles.skeletonSearch}`}></div>
      <div className={styles.skeletonWikiBoxContainer}>
        {[...Array(3)].map((_, index) => (
          <div key={index} className={`${styles.skeleton} ${styles.skeletonWikiBox}`}></div>
        ))}
      </div>
    </div>
  );
}
