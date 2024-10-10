'use client';

import { useStore } from '@/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import defaultIMG from '../../../public/images/default.jpg';
import LinkButton from '../Button/LinkButton.';
import Menu from '../Menu/Menu';
import MenuIcon from '../SvgComponents/MenuIcon';
import styles from './NavigatorBox.module.css';

function NavigatorBox() {
  const router = useRouter();
  const { isLogin, user, setLogout, profileImage, profileId } = useStore((state) => ({
    isLogin: state.isLogin,
    user: state.user,
    setLogout: state.setLogout,
    profileImage: state.profileImage,
    profileId: state.profileId,
  }));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setLogout();
    router.replace('/login');
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {isLogin ? (
        <div ref={dropdownRef}>
          <div className={styles.profile}>
            {profileImage ? (
              <Image
                src={profileImage}
                alt="프로필 이미지"
                width={32}
                height={32}
                layout="responsive"
                className={styles.profileImage}
                onClick={toggleMenu}
                loading="eager"
                priority={true}
              />
            ) : (
              <Image
                src={defaultIMG}
                alt="기본 이미지"
                width={32}
                height={32}
                layout="responsive"
                className={styles.profileImage}
                onClick={toggleMenu}
                loading="eager"
                priority={true}
              />
            )}
            {isMenuOpen && <Menu onMenuClick={toggleMenu} onLogout={handleLogout} />}
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.status}>
            <LinkButton variant="primary" destination="/login" size="S">
              로그인
            </LinkButton>
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
