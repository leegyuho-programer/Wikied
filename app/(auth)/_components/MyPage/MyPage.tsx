'use client';

import { useState } from 'react';
import styles from './MyPage.module.css';
import Button from '../../../../components/Button/Button';
import SideBar from '../../../../components/SideBar/SideBar';
import SnackBar from '../../../../components/SnackBar/SnackBar';
import Link from '../../../../components/Link/Link';

function MyPage() {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className={styles.container}>
      {isCopied && (
        <div className={styles.snackBar}>
          <SnackBar type="success" />
        </div>
      )}
      <div className={styles.title}>
        {/* 이름 데이터 가져오기 */}
        <p className={styles.name}>이지동</p>
        <Link onCopy={setIsCopied} />
      </div>
      <div className={styles.section}>
        {/* 데이터가 있는지 없는지에 따라 다르게 보이게 하기 */}
        <SideBar />
        <div className={styles.nodata}>
          <p className={styles.text}>
            아직 작성된 내용이 없네요.
            <br />
            친구들을 위키로 초대해 보세요!
          </p>
          <Button isLink={true} destination="/" variant="primary" size="XS">
            초대하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
