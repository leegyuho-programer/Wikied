'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useStore } from '../../store';
import Button from '../Button/Button';
import Menu from '../Menu/Menu';
import MenuIcon from '../SvgComponents/MenuIcon';
import NavBarProfileIcon from '../SvgComponents/NavBarProfileIcon/NavBarProfileIcon';
import styles from './NavigatorBox.module.css';
import { useRouter } from 'next/navigation';

function NavigatorBox() {
  const router = useRouter();
  const { isLogin, user, setLogout } = useStore((state) => ({
    isLogin: state.isLogin,
    user: state.user,
    setLogout: state.setLogout,
  }));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setLogout();
    router.replace('/login');
    setIsMenuOpen(false);
  };

  return (
    <>
      {isLogin ? (
        <div>
          <div className={styles.profile}>
            <NavBarProfileIcon onClick={toggleMenu} />
            {isMenuOpen && <Menu onMenuClick={toggleMenu} onLogout={handleLogout} />}
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
            {isMenuOpen && <Menu onMenuClick={toggleMenu} onLogout={handleLogout} />}
          </div>
        </div>
      )}
    </>
  );
}

export default NavigatorBox;
