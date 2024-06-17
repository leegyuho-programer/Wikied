'use client';

import Link from 'next/link';
import styles from './Menu.module.css';
import { useStore } from '@/store';

interface Props {
  onMenuClick: () => void;
  onLogout: () => void;
}

function Menu({ onMenuClick, onLogout }: Props) {
  const { isLogin } = useStore((state) => ({
    isLogin: state.isLogin,
  }));

  return (
    <div className={styles.container}>
      {isLogin ? (
        <>
          <Link href="/myAccount" className={styles.menuItem} onClick={onMenuClick}>
            계정 설정
          </Link>
          <Link href="/mypage" className={styles.menuItem} onClick={onMenuClick}>
            내 위키
          </Link>
          <div className={styles.menuItem} onClick={onLogout}>
            로그아웃
          </div>
        </>
      ) : (
        <>
          <Link href="/wikilist" className={styles.menuItem} onClick={onMenuClick}>
            위키 목록
          </Link>
          <Link href="/freeBoard" className={styles.menuItem} onClick={onMenuClick}>
            자유게시판
          </Link>
          <Link href="/login" className={styles.menuItem} onClick={onMenuClick}>
            로그인
          </Link>
        </>
      )}
    </div>
  );
}

export default Menu;
