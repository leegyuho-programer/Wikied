'use client';

import { useState } from 'react';
import Link from '../../../../components/Link/Link';
import SearchBar from '../../../../components/SearchBar/SearchBar';
import WikiIcon from '../../../../components/SvgComponents/WikiIcon/WikiIcon';
import Pagination from '../Pagination/Pagination';
import styles from './WikiListPage.module.css';

function WikiListPage() {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <SearchBar />
        <p className={styles.text}>&8quot 동욱 &ldquo님을 총 3명 찾았습니다.</p>
      </div>
      <div className={styles.wikiBox}>
        <div className={styles.profile}>
          <div className={styles.icon}>
            <WikiIcon />
          </div>
          <div className={styles.intro}>
            <p className={styles.name}>김동욱</p>
            <p className={styles.data}>
              서울, 대한민국
              <br />
              대학생
            </p>
          </div>
        </div>
        <div className={styles.link}>
          <Link onCopy={setIsCopied} />
        </div>
      </div>
      <Pagination />
    </div>
  );
}

export default WikiListPage;
