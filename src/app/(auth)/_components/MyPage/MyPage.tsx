'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import LinkCopy from '@/components/LinkCopy/LinkCopy';
import SideBar from '@/components/SideBar/SideBar';
import SnackBar from '@/components/SnackBar/SnackBar';
import { useStore } from '@/store';
import { GetProfileCodeResponseType, GetProfileResponseType, PostProfilePingRequestType } from '@/types/profile';
import styles from './MyPage.module.css';
import { getProfile } from '@/api/profile/profile';
import { getProfileCode } from '@/api/profile/profileCode';
import { postProfilePing } from '@/api/profile/profilePing';
import DOMPurify from 'dompurify';

function MyPage() {
  const { user, profileId, profileImage, setProfileId, setProfileImage, securityAnswer, accessToken } = useStore(
    (state: any) => ({
      user: state.user,
      profileId: state.profileId,
      profileImage: state.profileImage,
      setProfileId: state.setProfileId,
      setProfileImage: state.setProfileImage,
      securityAnswer: state.securityAnswer,
      accessToken: state.userAccessToken,
    })
  );
  const [isCopied, setIsCopied] = useState(false);
  const [profileCodeResponse, setProfileCodeResponse] = useState<GetProfileCodeResponseType | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (user?.name && typeof window !== 'undefined') {
          const response: GetProfileResponseType = await getProfile(1, 10, user.name);
          const codeId = response.list[0].code;

          const profileCodeResponse: GetProfileCodeResponseType = await getProfileCode(codeId);

          setProfileId(profileCodeResponse.id || null);
          setProfileImage(profileCodeResponse.image || null);
          setProfileCodeResponse(profileCodeResponse);

          const pingRequest: PostProfilePingRequestType = {
            securityAnswer,
          };
          console.log(pingRequest, codeId, accessToken);

          const pingResponse = await postProfilePing(pingRequest, codeId, accessToken);
          console.log('Profile Ping Response:', pingResponse);
          return pingResponse;
        }
      } catch (error) {
        console.error('프로필 데이터를 불러오는 데 실패했습니다:', error);
      }
    }

    if (user) {
      fetchProfile();
    }
  }, [user, setProfileId, setProfileImage, securityAnswer, accessToken]);

  const handleInvite = async () => {
    if (typeof window !== 'undefined') {
      try {
        const currentURL = window.location.href;
        await navigator.clipboard.writeText(currentURL);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error(error);
      }
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
        {profileId && <LinkCopy onCopy={setIsCopied} profileId={profileId} />}
      </div>
      <div className={styles.section}>
        <SideBar profileData={profileCodeResponse} showEditButton={user?.name === profileCodeResponse?.name} />
        {profileCodeResponse?.content ? (
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(profileCodeResponse.content) }}
            className={styles.content}
          />
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
