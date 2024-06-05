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
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  }, [isSmallScreen]);

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
              <div className={styles.lineGroup1}>
                {data.slice(0, 4).map((item, index) => (
                  <div className={styles.line} key={index}>
                    <label className={styles.title} htmlFor="title">
                      {item.title}
                    </label>
                    <input className={styles.answer} type="text" placeholder={item.answer} />
                  </div>
                ))}
              </div>
              <div className={`${styles.lineGroup2} ${showAll ? styles.show : ''}`}>
                {data.slice(4).map((item, index) => (
                  <div className={styles.line} key={index + 4}>
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
