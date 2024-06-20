'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import LinkCopy from '@/components/LinkCopy/LinkCopy';
import SideBar from '@/components/SideBar/SideBar';
import SnackBar from '@/components/SnackBar/SnackBar';
import { useStore } from '@/store';
import { GetProfileCodeResponseType } from '@/types/profile';
import styles from './UserPage.module.css';
import { useParams } from 'next/navigation';
import { getProfile } from '@/api/profile/profile';
import { getProfileCode } from '@/api/profile/profileCode';
import QuizModal from '@/app/(root-modal)/QuizModal/QuizModal';
import DOMPurify from 'dompurify';

function UserPage() {
  const [isCopied, setIsCopied] = useState(false);
  const [profileCodeResponse, setProfileCodeResponse] = useState<GetProfileCodeResponseType | null>(null);
  const [myCode, setMyCode] = useState<string | null>(null);
  const { id } = useParams<{ id: string | string[] }>();

  const {
    isLogin,
    user,
    profileId,
    profileImage,
    setProfileImage,
    setProfileId,
    setSecurityQuestion,
    modals,
    showModal,
    setPageId,
  } = useStore((state) => ({
    isLogin: state.isLogin,
    user: state.user,
    profileImage: state.profileImage,
    setProfileImage: state.setProfileImage,
    profileId: state.profileId,
    setProfileId: state.setProfileId,
    setSecurityQuestion: state.setSecurityQuestion,
    modals: state.modals,
    showModal: state.showModal,
    setPageId: state.setPageId,
  }));

  const handleClick = () => {
    showModal('quizModal');
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await getProfile(1, 100);
        console.log('getProfile', response);
        const parsedId = parseInt(Array.isArray(id) ? id[0] : id);
        const codeId = response.list.find((item: any) => item.id === parsedId)?.code;
        setProfileId(parsedId);
        if (setPageId) {
          setPageId(parsedId);
        }
        console.log('id', parsedId);
        console.log('codeId', codeId);

        if (codeId !== undefined) {
          setMyCode(codeId);
          const profileCodeResponse = await getProfileCode(codeId);
          console.log('profileCodeResponse', profileCodeResponse);
          setProfileCodeResponse(profileCodeResponse);
          setProfileImage(profileCodeResponse.image || null);
          if (setSecurityQuestion) {
            setSecurityQuestion(profileCodeResponse.securityQuestion || null);
          }
        } else {
          console.error('일치하는 데이터의 코드를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('프로필 데이터를 불러오는 데 실패했습니다:', error);
      }
    }
    if (id) {
      fetchProfile();
    }
  }, [id, setProfileId, setProfileImage, setSecurityQuestion]);

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
        <SideBar profileData={profileCodeResponse} showEditButton={false} />
        {profileCodeResponse?.content ? (
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(profileCodeResponse.content) }} />
        ) : (
          <div className={styles.noData}>
            <p className={styles.text}>
              아직 작성된 내용이 없네요.
              <br />
              친구의 첫 위키를 작성해 보세요!
            </p>
            <Button isLink={false} variant="primary" size="XS" onClick={handleClick}>
              시작하기
            </Button>
          </div> // 데이터가 없을 때의 UI
        )}
      </div>
      {modals[modals.length - 1] === 'quizModal' && <QuizModal codeId={myCode} />}
    </div>
  );
}

export default UserPage;
