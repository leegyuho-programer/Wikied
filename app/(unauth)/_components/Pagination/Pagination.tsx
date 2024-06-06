import styles from './Pagination.module.css';

function Pagination() {
  return (
    <div className={styles.container}>
      <button className={styles.button}>&lt;</button>
      <button className={styles.button}>1</button>
      <button className={styles.button}>2</button>
      <button className={styles.button}>3</button>
      <button className={styles.button}>4</button>
      <button className={styles.button}>5</button>
      <button className={styles.button}>&gt;</button>
    </div>
  );
}

export default Pagination;
