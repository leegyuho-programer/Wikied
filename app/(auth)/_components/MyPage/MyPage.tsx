'use client';
import { useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import LinkCopy from '../../../../components/LinkCopy/LinkCopy';
import SideBar from '../../../../components/SideBar/SideBar';
import SnackBar from '../../../../components/SnackBar/SnackBar';
import styles from './MyPage.module.css';
import { GetProfileResponseType, GetProfileCodeResponseType } from '../../../../types/profile';
import getProfile from '../../../../api/profile/getProfile';
import getProfileCode from '../../../../api/profile/getProfileCode';
import { useStore } from '../../../../store';

function MyPage() {
  const { user, profile, setProfile } = useStore((state) => ({
    user: state.user,
    profile: state.profile,
    setProfile: state.setProfile,
  }));
  const [isCopied, setIsCopied] = useState(false);
  const [profileCodeResponse, setProfileCodeResponse] = useState<GetProfileCodeResponseType | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response: GetProfileResponseType = await getProfile(1, 10, user?.name as string);
        const codeId = response.list[0].code;

        // Profile 데이터를 가져온 후 code를 사용해 추가 데이터를 가져옴
        const profileCodeResponse: GetProfileCodeResponseType = await getProfileCode(codeId);
        console.log('getProfileCode', profileCodeResponse);

        // 프로필 상태 업데이트
        setProfileCodeResponse(profileCodeResponse);
      } catch (error) {
        console.error('프로필 데이터를 불러오는 데 실패했습니다:', error);
      }
    }

    if (user?.name) {
      fetchProfile();
    }
  }, [user, setProfile]);

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

  return (
    <div className={styles.container}>
      {isCopied && (
        <div className={styles.snackBar}>
          <SnackBar type="success" />
        </div>
      )}
      <div className={styles.title}>
        <p className={styles.name}>{user?.name}</p>
        <LinkCopy onCopy={setIsCopied} />
      </div>
      <div className={styles.section}>
        <SideBar profileData={profileCodeResponse} showEditButton={user?.name === profileCodeResponse?.name} />
        {profileCodeResponse?.content ? (
          <div>hi</div>
        ) : (
          <div className={styles.noData}>
            <p className={styles.text}>
              아직 작성된 내용이 없네요.
              <br />
              친구들을 위키로 초대해 보세요!
            </p>
            <Button isLink={false} variant="primary" size="XS" onClick={handleInvite}>
              초대하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPage;
