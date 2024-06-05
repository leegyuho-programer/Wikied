'use client';

import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import ArrowDownIcon from '../SvgComponents/ArrowDownIcon/ArrowDownIcon';
import ProfileIcon from '../SvgComponents/ProfileIcon/ProfileIcon';
import styles from './SideBar.module.css';

const data = [
  { title: '거주 도시', answer: '서울' },
  { title: 'MBTI', answer: 'INFJ' },
  { title: '직업', answer: '코드잇 콘텐츠 프로듀서' },
  { title: 'SNS 계정', answer: 'dlwlehd_official' },
  { title: '생일', answer: '1999-12-31' },
  { title: '별명', answer: '없음' },
  { title: '혈액형', answer: 'A' },
  { title: '국적', answer: '대한민국' },
];

function SideBar() {
  const [showAll, setShowAll] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
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
        <form className={styles.innerContainer}>
          <div className={styles.profileContainer}>
            <ProfileIcon />
            {/* <label className={styles.label}>
        <input type="file" className={styles.input} />
      </label> */}
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.lineWrapper}>
              <div className={styles.lineGroup}>
                {data.slice(0, 4).map((item, index) => (
                  <div className={styles.line} key={index} style={{ display: showAll || index < 3 ? 'flex' : 'none' }}>
                    <label className={styles.title} htmlFor="title">
                      {item.title}
                    </label>
                    <input className={styles.answer} type="text" placeholder={item.answer} />
                  </div>
                ))}
              </div>
              <div className={styles.lineGroup}>
                {data.slice(4).map((item, index) => (
                  <div
                    className={styles.line}
                    key={index + 4}
                    style={{ display: showAll || index < 3 ? 'flex' : 'none' }}
                  >
                    <label className={styles.title} htmlFor="title">
                      {item.title}
                    </label>
                    <input className={styles.answer} type="text" placeholder={item.answer} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.button}>수정하기</button>
          </div>
        </form>
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
