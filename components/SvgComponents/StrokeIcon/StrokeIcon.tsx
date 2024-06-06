import styles from './StrokeIcon.module.css';

function StrokeIcon() {
  return (
    <div className={styles.container}>
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="2" viewBox="0 0 400 2" fill="none">
        <path d="M0 1H400" stroke="#E4E5F0" />
      </svg>
    </div>
  );
}

export default StrokeIcon;
