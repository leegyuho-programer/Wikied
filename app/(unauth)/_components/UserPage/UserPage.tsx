'use client';
import { useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import LinkCopy from '../../../../components/LinkCopy/LinkCopy';
import SideBar from '../../../../components/SideBar/SideBar';
import SnackBar from '../../../../components/SnackBar/SnackBar';
import { useStore } from '../../../../store';
import { GetProfileCodeResponseType } from '../../../../types/profile';
import styles from './UserPage.module.css';
import { useParams } from 'next/navigation';
import { getProfile } from '../../../../api/profile/profile';
import { getProfileCode } from '../../../../api/profile/profileCode';

function UserPage() {
  const [isCopied, setIsCopied] = useState(false);
  const [profileCodeResponse, setProfileCodeResponse] = useState<GetProfileCodeResponseType | null>(null);
  const { id } = useParams<{ id: string | string[] }>();
  const { isLogin, user, profileId, profileImage, setProfileImage, setProfileId } = useStore((state) => ({
    isLogin: state.isLogin,
    user: state.user,
    profileImage: state.profileImage,
    setProfileImage: state.setProfileImage,
    profileId: state.profileId,
    setProfileId: state.setProfileId,
  }));

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await getProfile(1, 100);
        console.log('getProfile', response);
        // id와 일치하는 데이터의 코드 가져오기
        const codeId = response.list.find((item) => item.id === parseInt(Array.isArray(id) ? id[0] : id))?.code;

        if (codeId) {
          const profileCodeResponse = await getProfileCode(codeId);
          console.log('profileCodeResponse', profileCodeResponse);
          setProfileId(profileCodeResponse.id || null);
          setProfileImage(profileCodeResponse.image || null);
          setProfileCodeResponse(profileCodeResponse);
        } else {
          console.error('일치하는 데이터의 코드를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('프로필 데이터를 불러오는 데 실패했습니다:', error);
      }
    }
    if (id) {
      fetchProfile(); // 컴포넌트가 마운트되면 프로필 데이터 가져오기
    }
  }, [id, setProfileId, setProfileImage]);

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
  console.log(profileId);
  return (
    <div className={styles.container}>
      {isCopied && (
        <div className={styles.snackBar}>
          <SnackBar type="success" />
        </div>
      )}
      <div className={styles.title}>
        <div className={styles.nameLink}>
          <p className={styles.name}>{profileCodeResponse?.name}</p>
          {profileCodeResponse?.id && <LinkCopy onCopy={setIsCopied} profileId={profileCodeResponse.id} />}
        </div>
        {profileCodeResponse?.content && isLogin && user?.name !== profileCodeResponse?.name && (
          <button onClick={handleInvite} className={styles.button}>
            위키 참여하기
          </button>
        )}
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
