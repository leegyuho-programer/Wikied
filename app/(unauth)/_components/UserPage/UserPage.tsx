'use client';

import { useState } from 'react';
import Button from '../../../../components/Button/Button';
import LinkCopy from '../../../../components/LinkCopy/LinkCopy';
import SideBar from '../../../../components/SideBar/SideBar';
import styles from './UserPage.module.css';

function UserPage() {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {/* 이름 데이터 가져오기 */}
        <p className={styles.name}>이지동</p>
        <LinkCopy onCopy={setIsCopied} />
      </div>
      <div className={styles.section}>
        {/* 데이터가 있는지 없는지에 따라 다르게 보이게 하기 */}
        {/* <SideBar /> */}
        <div className={styles.nodata}>
          <p className={styles.text}>
            아직 작성된 내용이 없네요.
            <br />
            친구들을 위키로 초대해 보세요!
          </p>
          {/* <Button isLink={true} destination="/signup" variant="primary" size="XS">
            시작하기
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default UserPage;

// 로그인 했을 때와 로그아웃 했을 때 다르게 해야함 @@@@@@@@@@@@@@@@
