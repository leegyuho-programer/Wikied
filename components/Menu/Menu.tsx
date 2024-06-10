'use client';

import Link from 'next/link';
import styles from './Menu.module.css';

interface Props {
  onMenuClick: () => void;
  onLogout: () => void;
}

function Menu({ onMenuClick, onLogout }: Props) {
  return (
    <div className={styles.container}>
      <Link href="/myAccount" className={styles.menuItem} onClick={onMenuClick}>
        계정 설정
      </Link>
      <Link href="/mypage" className={styles.menuItem} onClick={onMenuClick}>
        내 위키
      </Link>
      <div className={styles.menuItem} onClick={onLogout}>
        로그아웃
      </div>
    </div>
  );
}

export default Menu;
