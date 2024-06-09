'use client';

import Link from 'next/link';
import styles from './Menu.module.css';
import { useAuth } from '../../context/AuthContext';

interface Props {
  onClick: () => void;
}

function Menu({ onClick }: Props) {
  return (
    <div className={styles.container}>
      <Link href="/myAccount" className={styles.menuItem}>
        계정 설정
      </Link>
      <Link href="/mypage" className={styles.menuItem}>
        내 위키
      </Link>
      <div className={styles.menuItem} onClick={onClick}>
        로그아웃
      </div>
    </div>
  );
}

export default Menu;
