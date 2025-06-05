'use client';

import { getProfile } from '@/api/profile/profile';
import { getProfileCode } from '@/api/profile/profileCode';
import MyPageSkeleton from '@/app/(auth)/_components/MyPage/MyPageSkeleton';
import QuizModal from '@/app/(root-modal)/QuizModal/QuizModal';
import WelcomeModal from '@/app/(root-modal)/WelcomeModal/WelcomeModal';
import Button from '@/components/Button/Button';
import LinkCopy from '@/components/LinkCopy/LinkCopy';
import SideBar from '@/components/SideBar/SideBar';
import SnackBar from '@/components/SnackBar/SnackBar';
import { useStore } from '@/store';
import { GetProfileCodeResponseType, GetProfileResponseType } from '@/types/profile';
import { useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './UserPageClient.module.css';

interface Props {
  initialProfileData: GetProfileCodeResponseType | null;
  profileId: number;
  profileList: any;
  hasError?: boolean;
}

export default function UserPageClient({
  initialProfileData,
  profileId,
  profileList: initialProfileList,
  hasError = false,
}: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  const isLogin = useStore((state) => state.isLogin);
  const user = useStore((state) => state.user);
  const setSecurityQuestion = useStore((state) => state.setSecurityQuestion);
  const modals = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);
  const userProfileId = useStore((state) => state.profileId);
  const clearModal = useStore((state) => state.clearModal);
  const editingProfileId = useStore((state) => state.editingProfileId);
  const setEditingProfileId = useStore((state) => state.setEditingProfileId);

  // 서버에서 받은 초기 데이터를 사용하되, 에러가 있거나 데이터가 없으면 클라이언트에서 페치
  const { data: profileList } = useQuery<GetProfileResponseType, Error>({
    queryKey: ['profiles'],
    queryFn: () => getProfile(1, 100),
    ...(initialProfileList && !hasError && { initialData: initialProfileList }),
    enabled: !initialProfileList || hasError,
  });

  const { data: profileCodeResponse } = useQuery<GetProfileCodeResponseType, Error>({
    queryKey: ['profileCode', profileId],
    queryFn: async () => {
      const codeId = profileList?.list?.find((item: any) => item.id === profileId)?.code;

      if (codeId) {
        return getProfileCode(codeId);
      }
      throw new Error('일치하는 데이터의 코드를 찾을 수 없습니다.');
    },
    ...(initialProfileData && !hasError && { initialData: initialProfileData }),
    enabled: (!initialProfileData || hasError) && !!profileList,
  });

  const handleLaterClick = () => {
    clearModal();
  };

  useEffect(() => {
    if (profileCodeResponse) {
      setEditingProfileId(profileId);
      setSecurityQuestion?.(profileCodeResponse.securityQuestion || null);
    }
  }, [profileCodeResponse, profileId, editingProfileId, setEditingProfileId, setSecurityQuestion]);

  useEffect(() => {
    if (isLogin && user && user?.profile?.id === profileId) {
      router.push('/mypage');
    }
  }, [isLogin, user, profileId, router]);

  const handleClick = () => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }

    if (!userProfileId) {
      showModal('welcome');
      return;
    }

    showModal('quiz');
  };

  // 서버에서 데이터를 받았지만 로딩 중인 경우에만 스켈레톤 표시
  if ((!initialProfileData && !profileCodeResponse) || hasError) {
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
        <div className={styles.nameLink}>
          <p className={styles.name}>{profileCodeResponse?.name}</p>
          {profileCodeResponse?.id && <LinkCopy onCopy={setIsCopied} profileId={profileCodeResponse.id} />}
        </div>
        {profileCodeResponse?.content && isLogin && user?.name !== profileCodeResponse?.name && (
          <button onClick={handleClick} className={styles.button}>
            위키 참여하기
          </button>
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
              친구의 첫 위키를 작성해 보세요!
            </p>
            <Button variant="primary" size="XS" onClick={handleClick}>
              시작하기
            </Button>
          </div>
        )}
      </div>
      {modals[modals.length - 1] === 'quiz' && <QuizModal codeId={profileCodeResponse?.code} />}
      {modals.includes('welcome') && <WelcomeModal onClose={handleLaterClick} />}
    </div>
  );
}
