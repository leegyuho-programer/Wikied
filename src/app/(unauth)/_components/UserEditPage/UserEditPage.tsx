'use client';

import { getProfile } from '@/api/profile/profile';
import { getProfileCode } from '@/api/profile/profileCode';
import SideBar from '@/components/SideBar/SideBar';
import TextEditor from '@/components/TextEditor/TextEditor';
import { useStore } from '@/store';
import { GetProfileCodeResponseType } from '@/types/profile';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from './UserEditPage.module.css';

function UserEditPage() {
  const [text, setText] = useState('');
  const [profileCodeResponse, setProfileCodeResponse] = useState<GetProfileCodeResponseType | null>(null);
  const [myCode, setMyCode] = useState<string | null>(null);

  const { setSecurityQuestion, pageId } = useStore((state) => ({
    setSecurityQuestion: state.setSecurityQuestion,
    pageId: state.pageId,
  }));

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
  }, [pageId, setSecurityQuestion]);

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
