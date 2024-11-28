import styles from './UserEditPageSkeleton.module.css';

export default function UserEditPageSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={`${styles.skeleton} ${styles.skeletonTextEditor}`}></div>
      {/* <div className={styles.skeletonSideBarContainer}>
        <div className={`${styles.skeleton} ${styles.skeletonSideBar}`}></div>
      </div> */}
    </div>
  );
}
