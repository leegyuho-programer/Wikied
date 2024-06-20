'use client';

import { useStore } from '@/store';
import dynamic from 'next/dynamic';
import { useState, Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';
import './TextEditor.css';
import styles from './TextEditor.module.css';
import { getProfile } from '@/api/profile/profile';
import { GetProfileResponseType, PostProfilePingRequestType } from '@/types/profile';
import { patchProfileCode } from '@/api/profile/profileCode';
import Button from '../Button/Button';
import { postProfilePing } from '@/api/profile/profilePing';
import { useRouter } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function TextEditor({ value, setValue }: Props) {
  const { user, accessToken, securityAnswer, pageId } = useStore((state: any) => ({
    user: state.user,
    accessToken: state.userAccessToken,
    securityAnswer: state.securityAnswer,
    pageId: state.pageId,
  }));
  const router = useRouter();

  const [codeId, setCodeId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await getProfile(1, 100);
        const profile = response.list.find((item: any) => item.id === pageId);
        const ProfileCodeId = profile?.code;
        console.log('response', response);
        console.log('profile', profile);
        console.log('code', ProfileCodeId);

        if (ProfileCodeId !== undefined) {
          setCodeId(ProfileCodeId);
        } else {
          setCodeId(null);
        }
        setName(profile?.name || null);

        const pingRequest: PostProfilePingRequestType = {
          securityAnswer,
        };
        console.log('ping', codeId, ProfileCodeId);
        const pingResponse = await postProfilePing(pingRequest, ProfileCodeId as string, accessToken);
        console.log('Profile Ping Response:', pingResponse);
        return pingResponse;
      } catch (error) {
        console.error('프로필 데이터를 불러오는 데 실패했습니다:', error);
      }
    }

    if (user) {
      fetchProfile();
    }
  }, [user, securityAnswer, accessToken, pageId]);

  useEffect(() => {
    const defaultTemplate = `
      <h1 style="color: #474D66; font-size: 2.4rem; font-weight: 600;">01. 개요</h1>
      <p>여기에 간단한 소개를 적어주세요.</p>
      <br/><br/><br/><br/>
      <h1>02. 취미</h1>
      <p>평소에 취미로 즐기는 것들을 알고 있다면 알려주세요.</p>
      <br/><br/><br/><br/>
      <h1>03. 여담</h1>
      <p>나만 알고 있는 재미있는 여담을 공유해 보세요.</p>
      <br/><br/><br/><br/>
      <h1>04. 취향</h1>
      <p>좋아하는 것 중에 알고 있는 게 있으신가요?</p>
    `;
    setValue(defaultTemplate);
  }, [setValue, user?.name]);

  const handleUpdateProfile = async () => {
    if (!codeId) {
      console.error('코드 ID를 찾을 수 없습니다.');
      return;
    }
    const payload = { content: value };
    try {
      const response = await patchProfileCode(payload, codeId, accessToken); // codeId 사용
      console.log('Profile Updated:', response);
      router.push(`/user/${pageId}`);
    } catch (error) {
      console.error('프로필을 업데이트하는 데 실패했습니다:', error);
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ header: [1, 2, 3, 4, false] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }],
        ['image', 'link'],
      ],
    }),
    []
  );

  const formats = ['bold', 'italic', 'underline', 'blockquote', 'header', 'list', 'script', 'size'];

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <div className={styles.button}>
          <Button variant="white" isLink={true} size="XS">
            취소
          </Button>
          <Button variant="primary" isLink={false} size="XS" onClick={handleUpdateProfile}>
            저장
          </Button>
        </div>
      </div>
      <ReactQuill theme="snow" modules={modules} formats={formats} value={value} onChange={setValue} />
    </div>
  );
}

export default TextEditor;
