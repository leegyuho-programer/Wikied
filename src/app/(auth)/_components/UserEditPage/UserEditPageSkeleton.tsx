import styles from './UserEditPageSkeleton.module.css';

export default function UserEditPageSkeleton() {
  return (
    <div className={styles.container}>
      <div className={`${styles.skeleton} ${styles.skeletontextEditor}`}></div>
      <div className={styles.skeletonSideBarContainer}>
        <div className={`${styles.skeleton} ${styles.skeletonSideBar}`}></div>
      </div>
    </div>
  );
}
