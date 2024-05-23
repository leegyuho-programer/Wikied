'use client';

import { useEffect, useState } from 'react';
import ArrowDownIcon from '../SvgComponents/ArrowDownIcon/ArrowDownIcon';
import Content from './Content';
import ProfileImage from './ProfileImage';
import styles from './SideBar.module.css';

function SideBar() {
  const [showAll, setShowAll] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1200);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isLargeScreen) {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  }, [isLargeScreen]);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <ProfileImage />
          <Content showAll={showAll} />
        </div>
        <button className={`${styles.arrowButton} ${showAll ? styles.rotate : ''}`} onClick={handleToggle}>
          <div className={styles.arrowButtonWrapper}>
            <ArrowDownIcon />
          </div>
        </button>
      </div>
    </div>
  );
}

export default SideBar;
