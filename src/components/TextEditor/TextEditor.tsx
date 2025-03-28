'use client';

import { getProfile } from '@/api/profile/profile';
import { getProfileCode, patchProfileCode } from '@/api/profile/profileCode';
import { postProfilePing } from '@/api/profile/profilePing';
import { useStore } from '@/store';
import { PostProfilePingRequestType } from '@/types/profile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import Button from '../Button/Button';
import OverTimeModal from './../../app/(root-modal)/OverTimeModal/OverTimeModal';
import './TextEditor.css';
import styles from './TextEditor.module.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

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

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function TextEditor({ value, setValue }: Props) {
  const user = useStore((state) => state.user);
  const securityAnswer = useStore((state) => state.securityAnswer as string);
  const modals = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);
  const clearModal = useStore((state) => state.clearModal);
  const editingProfileId = useStore((state) => state.editingProfileId);

  const router = useRouter();
  const queryClient = useQueryClient();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [pingTime, setPingTime] = useState<number | null>(null);

  const { data: profileData } = useQuery({
    queryKey: ['profile', editingProfileId],
    queryFn: async () => {
      const response = await getProfile(1, 100);
      return response.list.find((item: any) => item.id === editingProfileId);
    },
    enabled: !!user && !!editingProfileId,
  });

  const { data: profileCodeData } = useQuery({
    queryKey: ['profileCode', profileData?.code],
    queryFn: () => getProfileCode(profileData?.code || ''),
    enabled: !!profileData?.code,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (payload: { content: string }) => patchProfileCode(payload, profileData?.code || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profileCode', profileData?.code] });
      router.push(`/user/${editingProfileId}`);
    },
    onError: (error) => alert(error.message),
  });

  const handleUpdateProfile = () => {
    if (!profileData?.code) {
      console.error('코드 ID를 찾을 수 없습니다.');
      return;
    }
    updateProfileMutation.mutate({ content: value });
  };

  const handleCancel = () => router.back();

  const modules = useMemo(
    () => ({
      toolbar: [
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }],
        ['link'],
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
      showModal('overTime');
    }, 300000); // 5분 = 300000 밀리초
  };

  const handleTextChange = (content: string) => {
    setValue(content);
    resetTimer();
  };

  useEffect(() => {
    setValue(profileCodeData?.content || defaultTemplate);
  }, [profileCodeData, setValue]);

  useEffect(() => {
    if (user && profileData?.code) {
      const pingRequest: PostProfilePingRequestType = {
        securityAnswer,
      };

      postProfilePing(pingRequest, profileData.code)
        .then(() => setPingTime(Date.now()))
        .catch((error) => console.error('Ping 요청 실패:', error));
    }
  }, [user, profileData, securityAnswer]);

  useEffect(() => {
    clearModal();
    resetTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [clearModal]);

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <p className={styles.name}>{profileData?.name || ''}</p>
        <div className={styles.button}>
          <Button variant="white" size="XS" onClick={handleCancel}>
            취소
          </Button>
          <Button variant="primary" size="XS" onClick={handleUpdateProfile}>
            저장
          </Button>
        </div>
      </div>
      <ReactQuill theme="snow" modules={modules} formats={formats} value={value} onChange={handleTextChange} />
      {modals[modals.length - 1] === 'overTime' && <OverTimeModal />}
    </div>
  );
}

export default TextEditor;
