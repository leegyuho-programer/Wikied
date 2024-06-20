'use client';

import { useEffect, useState } from 'react';
import TextEditor from '@/components/TextEditor/TextEditor';
import styles from './UserEditPage.module.css';
import 'react-quill/dist/quill.snow.css';
import Button from '@/components/Button/Button';
import LinkCopy from '@/components/LinkCopy/LinkCopy';
import SideBar from '@/components/SideBar/SideBar';
import SnackBar from '@/components/SnackBar/SnackBar';
import { useStore } from '@/store';
import { GetProfileCodeResponseType } from '@/types/profile';
import { useParams } from 'next/navigation';
import { getProfile } from '@/api/profile/profile';
import { getProfileCode } from '@/api/profile/profileCode';
import QuizModal from '@/app/(root-modal)/QuizModal/QuizModal';

function UserEditPage() {
  const [text, setText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [profileCodeResponse, setProfileCodeResponse] = useState<GetProfileCodeResponseType | null>(null);
  const [myCode, setMyCode] = useState<string | null>(null);

  const {
    isLogin,
    user,
    profileId,
    profileImage,
    setProfileImage,
    setProfileId,
    setSecurityQuestion,
    modals,
    pageId,
    showModal,
  } = useStore((state) => ({
    isLogin: state.isLogin,
    user: state.user,
    profileImage: state.profileImage,
    setProfileImage: state.setProfileImage,
    profileId: state.profileId,
    setProfileId: state.setProfileId,
    setSecurityQuestion: state.setSecurityQuestion,
    modals: state.modals,
    pageId: state.pageId,
    showModal: state.showModal,
  }));
  console.log('pageId', pageId);

  const handleClick = () => {
    showModal('quizModal');
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await getProfile(1, 100);
        const codeId = response.list.find((item: any) => item.id === pageId)?.code;
        console.log('getProfile', response);
        console.log('id', pageId);
        console.log('codeId', codeId);

        if (codeId !== undefined) {
          setMyCode(codeId);
          const profileCodeResponse = await getProfileCode(codeId);
          console.log('profileCodeResponse', profileCodeResponse);
          setProfileId(profileCodeResponse.id || null);
          setProfileImage(profileCodeResponse.image || null);
          setProfileCodeResponse(profileCodeResponse);
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
    if (pageId) {
      fetchProfile();
    }
  }, [pageId, setProfileId, setProfileImage, setSecurityQuestion]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TextEditor value={text} setValue={setText} />
      </div>
      <SideBar profileData={profileCodeResponse} showEditButton={false} />
    </div>
  );
}

export default UserEditPage;
