'use client';

import Link from 'next/link';
import Button from '../Button/Button';
import MenuIcon from '../SvgComponents/MenuIcon';
import styles from './NavigatorBox.module.css';
import { useState } from 'react';
import Menu from '../Menu/Menu';

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
