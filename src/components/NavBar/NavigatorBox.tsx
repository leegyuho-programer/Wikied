'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/store';
import Button from '../Button/Button';
import Menu from '../Menu/Menu';
import MenuIcon from '../SvgComponents/MenuIcon';
import styles from './NavigatorBox.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import defaultIMG from '../../../public/images/default.jpg';

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
            <Link href="/login" className={styles.login}>
              로그인
            </Link>
            <Button isLink={true} variant="primary" destination="/mypage" size="S">
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
