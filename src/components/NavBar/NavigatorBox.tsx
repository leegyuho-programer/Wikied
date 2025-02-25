'use client';

import { useStore } from '@/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import defaultIMG from '../../../public/images/default.jpg';
import LinkButton from '../Button/LinkButton';
import Menu from '../Menu/Menu';
import styles from './NavigatorBox.module.css';

function NavigatorBox() {
  const router = useRouter();
  const { isLogin, setLogout, profileImage, setProfileImage } = useStore((state) => ({
    isLogin: state.isLogin,
    setLogout: state.setLogout,
    profileImage: state.profileImage,
    setProfileImage: state.setProfileImage,
  }));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentProfileImage = profileImage || defaultIMG;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // 로그아웃 시 프로필 이미지를 null로 설정
    setProfileImage(null);
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
            <Image
              src={currentProfileImage}
              alt="프로필 이미지"
              width={32}
              height={32}
              layout="responsive"
              className={styles.profileImage}
              onClick={toggleMenu}
              loading="eager"
              priority={true}
            />
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
            <Image src="/icons/MenuIcon.svg" width={20} height={20} alt="MenuIcon" onClick={toggleMenu} />
            {isMenuOpen && <Menu onMenuClick={toggleMenu} onLogout={handleLogout} />}
          </div>
        </div>
      )}
    </>
  );
}

export default NavigatorBox;
