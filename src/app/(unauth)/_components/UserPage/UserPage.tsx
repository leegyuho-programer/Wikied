'use client';

import { getProfile } from '@/api/profile/profile';
import { getProfileCode } from '@/api/profile/profileCode';
import QuizModal from '@/app/(root-modal)/QuizModal/QuizModal';
import Button from '@/components/Button/Button';
import LinkCopy from '@/components/LinkCopy/LinkCopy';
import SideBar from '@/components/SideBar/SideBar';
import SnackBar from '@/components/SnackBar/SnackBar';
import { useStore } from '@/store';
import { GetProfileCodeResponseType } from '@/types/profile';
import { useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './UserPage.module.css';
import MyPageSkeleton from '@/app/(auth)/_components/MyPage/MyPageSkeleton';

function UserPage() {
  const [isCopied, setIsCopied] = useState(false);
  const { id } = useParams<{ id: string | string[] }>();
  const router = useRouter();

  const { isLogin, user, setProfileId, setSecurityQuestion, modals, showModal } = useStore((state) => ({
    isLogin: state.isLogin,
    user: state.user,
    setProfileId: state.setProfileId,
    setSecurityQuestion: state.setSecurityQuestion,
    modals: state.modals,
    showModal: state.showModal,
  }));

  const parsedId = parseInt(Array.isArray(id) ? id[0] : id);

  const { data: profileList, isPending: isProfileListPending } = useQuery({
    queryKey: ['profiles'],
    queryFn: () => getProfile(1, 100),
  });

  const { data: profileCodeResponse, isPending: isProfileCodePending } = useQuery<GetProfileCodeResponseType, Error>({
    queryKey: ['profileCode', parsedId],
    queryFn: async () => {
      const codeId = profileList?.list.find((item) => item.id === parsedId)?.code;
      if (codeId) {
        return getProfileCode(codeId);
      }
      throw new Error('일치하는 데이터의 코드를 찾을 수 없습니다.');
    },
    enabled: !!profileList,
  });

  useEffect(() => {
    if (profileCodeResponse) {
      setProfileId(parsedId);
      setSecurityQuestion?.(profileCodeResponse.securityQuestion || null);
    }
  }, [profileCodeResponse, parsedId, setProfileId, setSecurityQuestion]);

  useEffect(() => {
    if (isLogin && user && user?.profile?.id === parsedId) {
      router.push('/mypage');
    }
  }, [isLogin, user, parsedId, router]);

  const handleClick = () => {
    showModal('quiz');
  };

  if (isProfileListPending || isProfileCodePending) return <MyPageSkeleton />;

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
    </div>
  );
}

export default UserPage;
