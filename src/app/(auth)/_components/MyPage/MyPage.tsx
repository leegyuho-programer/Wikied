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
import { useMutation, useQuery } from '@tanstack/react-query';

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

  // Profile 데이터 가져오기
  const { data: profileData, isPending } = useQuery({
    queryKey: ['profile', user?.name],
    queryFn: () => getProfile(1, 10, user.name),
    enabled: !!user?.name,
  });

  const profileCode = profileData?.list[0]?.code;

  const { data: profileCodeResponse } = useQuery({
    queryKey: ['profileCode', profileCode],
    queryFn: () => getProfileCode(profileCode!),
    enabled: !!profileCode,
  });

  // 프로필 핑 mutation
  const postPingMutation = useMutation({
    mutationFn: ({ pingRequest, profileCode }: { pingRequest: PostProfilePingRequestType; profileCode: string }) =>
      postProfilePing(pingRequest, profileCode, accessToken),
    onSuccess: () => {
      setProfileId(profileCodeResponse?.id || null);
      setProfileImage(profileCodeResponse?.image || null);
    },
    onError: (error: any) => {
      console.error('Ping error:', error.response?.data || error.message);
    },
  });

  // profileCode가 있으면 postPing 실행
  useQuery({
    queryKey: ['profilePing', profileCode],
    queryFn: () => {
      if (!profileCode || !accessToken || !securityAnswer) {
        throw new Error('Required data for ping is missing');
      }
      const pingRequest: PostProfilePingRequestType = { securityAnswer };

      return postPingMutation.mutateAsync({ pingRequest, profileCode });
    },
    enabled: !!profileCode && !!accessToken && !!securityAnswer,
    retry: false,
  });

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

  if (isPending) {
    return (
      <div className={styles.skeletonContainer}>
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
        <div className={styles.skeletonSection}>
          <div className={`${styles.skeleton} ${styles.skeletonSidebar}`}></div>
          <div className={`${styles.skeleton} ${styles.skeletonContent}`}></div>
        </div>
      </div>
    );
  }

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
