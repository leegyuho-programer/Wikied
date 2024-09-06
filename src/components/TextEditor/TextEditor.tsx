'use client';

import { useStore } from '@/store';
import dynamic from 'next/dynamic';
import { useState, Dispatch, SetStateAction, useEffect, useMemo, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import './TextEditor.css';
import styles from './TextEditor.module.css';
import { getProfile } from '@/api/profile/profile';
import { GetProfileResponseType, PostProfilePingRequestType } from '@/types/profile';
import { getProfileCode, patchProfileCode } from '@/api/profile/profileCode';
import Button from '../Button/Button';
import { postProfilePing } from '@/api/profile/profilePing';
import { useRouter } from 'next/navigation';
import OverTimeModal from '@/app/(root-modal)/OverTimeModal/OverTimeModal';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function TextEditor({ value, setValue }: Props) {
  const { user, accessToken, securityAnswer, pageId, modals, showModal } = useStore((state: any) => ({
    user: state.user,
    accessToken: state.userAccessToken,
    securityAnswer: state.securityAnswer,
    pageId: state.pageId,
    modals: state.modals,
    showModal: state.showModal,
  }));
  const router = useRouter();

  const [codeId, setCodeId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [pingTime, setPingTime] = useState<number | null>(null);

  const defaultTemplate = `
    <h1 style="color: #474D66; font-size: 2.4rem; font-weight: 600;">01. 개요</h1>
    <br/>
    <p>여기에 간단한 소개를 적어주세요.</p>
    <br/><br/><br/><br/>
    <h1>02. 취미</h1>
    <br/>
    <p style="font-size: 18px;">평소에 취미로 즐기는 것들을 알고 있다면 알려주세요.</p>
    <br/><br/><br/><br/>
    <h1>03. 여담</h1>
    <br/>
    <p>나만 알고 있는 재미있는 여담을 공유해 보세요.</p>
    <br/><br/><br/><br/>
    <h1>04. 취향</h1>
    <br/>
    <p>좋아하는 것 중에 알고 있는 게 있으신가요?</p>
  `;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastModifiedRef = useRef<number>(Date.now());

  const handleUpdateProfile = async () => {
    if (!codeId) {
      console.error('코드 ID를 찾을 수 없습니다.');
      return;
    }

    const payload = { content: value };

    try {
      const response = await patchProfileCode(payload, codeId, accessToken);
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
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }],
        ['image', 'link'],
        [{ size: ['small', false, 'large', 'huge'] }],
      ],
    }),
    []
  );

  const formats = ['bold', 'italic', 'underline', 'blockquote', 'header', 'list', 'size'];

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      showModal('overTimeModal');
    }, 300000); // 5분 = 300000 밀리초
  };

  const handleTextChange = (content: string) => {
    setValue(content);
    lastModifiedRef.current = Date.now();
    resetTimer();
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await getProfile(1, 100);
        const profile = response.list.find((item: any) => item.id === pageId);
        const ProfileCodeId = profile?.code;

        if (ProfileCodeId !== undefined) {
          setCodeId(ProfileCodeId);
          const profileCodeResponse = await getProfileCode(ProfileCodeId);
          setValue(profileCodeResponse.content || defaultTemplate);
        } else {
          setCodeId(null);
          setValue(defaultTemplate);
        }
        setName(profile?.name || null);

        const pingRequest: PostProfilePingRequestType = {
          securityAnswer,
        };

        const pingResponse = await postProfilePing(pingRequest, ProfileCodeId as string, accessToken);
        setPingTime(Date.now());
      } catch (error) {
        console.error('프로필 데이터를 불러오는 데 실패했습니다:', error);
      }
    }

    if (user) {
      fetchProfile();
    }
  }, [user, securityAnswer, accessToken, pageId, setValue]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

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
      <ReactQuill theme="snow" modules={modules} formats={formats} value={value} onChange={handleTextChange} />
      {modals[modals.length - 1] === 'overTimeModal' && <OverTimeModal />}
    </div>
  );
}

export default TextEditor;
