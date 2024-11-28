import styles from './CommentContainerSkeleton.module.css';

export default function CommentContainerSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonCommentContainer}>
        <div className={`${styles.skeleton} ${styles.skeletonComment}`}></div>
      </div>
      <div className={`${styles.skeleton} ${styles.skeletonForm}`}>
        <div className={`${styles.skeleton} ${styles.skeletonTextarea}`}></div>
      </div>
    </div>
  );
}
