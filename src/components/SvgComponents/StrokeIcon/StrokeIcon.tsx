import styles from './StrokeIcon.module.css';

function StrokeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={styles.container} fill="none">
      <path d="M0 1H400" stroke="#E4E5F0" />
    </svg>
  );
}

export default StrokeIcon;
