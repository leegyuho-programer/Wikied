'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../Button/Button';
import Menu from '../Menu/Menu';
import MenuIcon from '../SvgComponents/MenuIcon';
import NavBarProfileIcon from '../SvgComponents/NavBarProfileIcon/NavBarProfileIcon';
import styles from './NavigatorBox.module.css';

function NavigatorBox() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <>
      {user ? (
        <div>
          <div className={styles.profile}>
            <NavBarProfileIcon onClick={toggleMenu} />
            {isMenuOpen && <Menu onClick={handleLogout} />}
          </div>
        </div>
      ) : (
        <div>
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
            {isMenuOpen && <Menu onClick={logout} />}
          </div>
        </div>
      )}
    </>
  );
}

export default NavigatorBox;
