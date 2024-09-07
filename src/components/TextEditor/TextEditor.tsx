'use client';

import { getProfile } from '@/api/profile/profile';
import { getProfileCode, patchProfileCode } from '@/api/profile/profileCode';
import { postProfilePing } from '@/api/profile/profilePing';
import OverTimeModal from '@/app/(root-modal)/OverTimeModal/OverTimeModal';
import { useStore } from '@/store';
import { PostProfilePingRequestType } from '@/types/profile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import Button from '../Button/Button';
import './TextEditor.css';
import styles from './TextEditor.module.css';

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
  const queryClient = useQueryClient();

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

  const { data: profileData } = useQuery({
    queryKey: ['profile', pageId],
    queryFn: async () => {
      const response = await getProfile(1, 100);
      return response.list.find((item: any) => item.id === pageId);
    },
    enabled: !!user && !!pageId,
  });

  const { data: profileCodeData } = useQuery({
    queryKey: ['profileCode', profileData?.code],
    queryFn: () => getProfileCode(profileData?.code || ''),
    enabled: !!profileData?.code,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (payload: { content: string }) => patchProfileCode(payload, profileData?.code || '', accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profileCode', profileData?.code] });
      router.push(`/user/${pageId}`);
    },
    onError: (error) => {
      console.error('프로필을 업데이트하는 데 실패했습니다:', error);
    },
  });

  const handleUpdateProfile = () => {
    if (!profileData?.code) {
      console.error('코드 ID를 찾을 수 없습니다.');
      return;
    }
    updateProfileMutation.mutate({ content: value });
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
    setValue(profileCodeData?.content || defaultTemplate);
  }, [profileCodeData]);

  useEffect(() => {
    if (profileData) {
      setName(profileData.name || null);
    }
  }, [profileData]);

  useEffect(() => {
    if (user && profileData?.code) {
      const pingRequest: PostProfilePingRequestType = {
        securityAnswer,
      };
      postProfilePing(pingRequest, profileData.code, accessToken)
        .then(() => setPingTime(Date.now()))
        .catch((error) => console.error('Ping 요청 실패:', error));
    }
  }, [user, profileData, securityAnswer, accessToken]);

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
