'use client';

import { getProfile } from '@/api/profile/profile';
import { getProfileCode } from '@/api/profile/profileCode';
import { postProfilePing } from '@/api/profile/profilePing';
import Button from '@/components/Button/Button';
import LinkCopy from '@/components/LinkCopy/LinkCopy';
import SideBar from '@/components/SideBar/SideBar';
import SnackBar from '@/components/SnackBar/SnackBar';
import { useStore } from '@/store';
import { PostProfilePingRequestType } from '@/types/profile';
import { useMutation, useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import styles from './MyPage.module.css';
import MyPageSkeleton from './MyPageSkeleton';

function MyPage() {
  const { user, profileId, setProfileId, securityAnswer, accessToken } = useStore((state: any) => ({
    user: state.user,
    profileId: state.profileId,
    setProfileId: state.setProfileId,
    securityAnswer: state.securityAnswer,
    accessToken: state.userAccessToken,
  }));
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

  const BASE_URL = `https://wikied.vercel.app`;

  const handleInvite = async () => {
    if (typeof window !== 'undefined') {
      try {
        if (!profileId) {
          throw new Error('Profile ID is missing');
        }
        const currentURL = `${BASE_URL}/user/${profileId}`;
        await navigator.clipboard.writeText(currentURL);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 새로고침 시 profileId를 로컬 저장소에서 불러오기
  useEffect(() => {
    const storedProfileId = localStorage.getItem('profileId');
    if (storedProfileId) {
      setProfileId(storedProfileId);
    }
  }, [setProfileId]);

  // profileId가 변경되면 로컬 저장소에 저장
  useEffect(() => {
    if (profileId) {
      localStorage.setItem('profileId', profileId);
    }
  }, [profileId]);

  if (isPending) {
    return <MyPageSkeleton />;
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
        {isPending || !profileId ? (
          <p>Loading profile link...</p>
        ) : (
          <LinkCopy onCopy={setIsCopied} profileId={profileId} />
        )}
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
