import styles from './Menu.module.css';

function Menu() {
  return (
    <div className={styles.container}>
      <div className={styles.menuItem}>계정 설정</div>
      <div className={styles.menuItem}>내 위키</div>
      <div className={styles.menuItem}>로그아웃</div>
    </div>
  );
}

export default Menu;
