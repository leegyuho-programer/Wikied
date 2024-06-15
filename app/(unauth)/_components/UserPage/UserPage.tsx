'use client';
import { useState, useEffect } from 'react';
import Button from '../../../../components/Button/Button';
import LinkCopy from '../../../../components/LinkCopy/LinkCopy';
import SideBar from '../../../../components/SideBar/SideBar';
import SnackBar from '../../../../components/SnackBar/SnackBar';
import styles from './UserPage.module.css'; // 유저 페이지의 CSS 모듈 파일

import getProfile from '../../../../api/profile/getProfile';
import getProfileCode from '../../../../api/profile/getProfileCode';
import { useParams } from 'next/navigation';
import { GetProfileCodeResponseType } from '../../../../types/profile';

function UserPage() {
  const [isCopied, setIsCopied] = useState(false);
  const [profileCodeResponse, setProfileCodeResponse] = useState<GetProfileCodeResponseType | null>(null);
  const { id } = useParams(); // URL에서 id 가져오기
  console.log(id);

  useEffect(() => {
    async function fetchProfile() {
      try {
        // id 값에 따라 프로필 데이터 가져오기
        const response = await getProfile(1, 100, id as string);
        const codeId = response.list[0].code;
        console.log('1111', response);

        // Profile 데이터를 가져온 후 code를 사용해 추가 데이터를 가져옴
        const profileCodeResponse = await getProfileCode(codeId);
        console.log('getProfileCode', profileCodeResponse);

        // 프로필 상태 업데이트
        setProfileCodeResponse(profileCodeResponse);
      } catch (error) {
        console.error('프로필 데이터를 불러오는 데 실패했습니다:', error);
      }
    }
    fetchProfile(); // 컴포넌트가 마운트되면 프로필 데이터 가져오기
  }, [id]); // id가 변경될 때마다 프로필 데이터를 다시 가져오기

  const handleInvite = async () => {
    try {
      const currentURL = window.location.href;
      await navigator.clipboard.writeText(currentURL);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };
  console.log('profileCodeResponse', profileCodeResponse);

  return (
    <div className={styles.container}>
      {isCopied && (
        <div className={styles.snackBar}>
          <SnackBar type="success" />
        </div>
      )}
      <div className={styles.title}>
        {/* 이름 데이터 가져오기 */}
        <p className={styles.name}>{profileCodeResponse?.name}</p>
        <LinkCopy onCopy={setIsCopied} />
      </div>
      <div className={styles.section}>
        <SideBar profileData={profileCodeResponse} showEditButton={false} /> {/* 편집 버튼 비활성화 */}
        {profileCodeResponse?.content ? (
          <div>hi</div> // 데이터가 있을 때의 UI
        ) : (
          <div className={styles.noData}>
            <p className={styles.text}>
              아직 작성된 내용이 없네요.
              <br />
              친구의 첫 위키를 작성해 보세요!
            </p>
            <Button isLink={false} variant="primary" size="XS" onClick={handleInvite}>
              시작하기
            </Button>
          </div> // 데이터가 없을 때의 UI
        )}
      </div>
    </div>
  );
}

export default UserPage;
