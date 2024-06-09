'use client';

import Link from 'next/link';
import Button from '../Button/Button';
import MenuIcon from '../SvgComponents/MenuIcon';
import styles from './NavigatorBox.module.css';
import { useState } from 'react';
import Menu from '../Menu/Menu';
// @@@@@@@@@@@@@@@ 로그인 했을 때 데이터 받아와서 프로필 사진 보이도록
function NavigatorBox() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={styles.status}>
        <Link href="/login" className={styles.login}>
          로그인
        </Link>
        <Button isLink={true} variant="primary" destination="/" size="S">
          내 위키 만들기
        </Button>
      </div>
      <div className={styles.dropdown}>
        <MenuIcon onClick={toggleMenu} />
        {isMenuOpen && <Menu />}
      </div>
    </>
  );
}

export default NavigatorBox;
