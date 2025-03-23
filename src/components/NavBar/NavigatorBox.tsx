'use client';

import { getProfile } from '@/api/profile/profile';
import { useStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import LinkButton from '../Button/LinkButton';
import Menu from '../Menu/Menu';
import styles from './NavigatorBox.module.css';

function NavigatorBox() {
  const router = useRouter();
  const { isLogin, setLogout, profileImage, setProfileImage, user } = useStore((state) => ({
    isLogin: state.isLogin,
    setLogout: state.setLogout,
    profileImage: state.profileImage,
    setProfileImage: state.setProfileImage,
    user: state.user,
  }));

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: profileData } = useQuery({
    queryKey: ['profile', user?.name],
    queryFn: () => getProfile(1, 10, user?.name),
    enabled: !!user?.name,
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
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

  useEffect(() => {
    if (isLogin && !profileImage) {
      setProfileImage(profileData?.list[0]?.image ?? null);
    }
  }, [isLogin, profileImage, setProfileImage, profileData]);

  return (
    <>
      {isLogin ? (
        <div ref={dropdownRef}>
          <div className={styles.profile}>
            <Image
              src={profileImage || '/images/default.jpg'}
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
