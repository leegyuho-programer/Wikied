'use client';

import { getProfile } from '@/api/profile/profile';
import { getProfileCode } from '@/api/profile/profileCode';
import TextEditor from '@/components/TextEditor/TextEditor';
import { useStore } from '@/store';
import { GetProfileCodeResponseType } from '@/types/profile';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from './UserEditPage.module.css';
import UserEditPageSkeleton from './UserEditPageSkeleton';

export default function UserEditPage() {
  const [text, setText] = useState('');
  const { setSecurityQuestion, profileId, editingProfileId } = useStore((state) => ({
    setSecurityQuestion: state.setSecurityQuestion,
    profileId: state.profileId,
    editingProfileId: state.editingProfileId,
  }));

  const { data: profileData, isPending: isProfilePending } = useQuery({
    queryKey: ['profile', editingProfileId],
    queryFn: async () => {
      const response = await getProfile(1, 100);

      return response.list.find((item) => item.id === editingProfileId);
    },
    enabled: !!editingProfileId,
  });

  const { data: profileCodeData, isPending: isProfileCodePending } = useQuery<GetProfileCodeResponseType>({
    queryKey: ['profileCode', profileData?.code],
    queryFn: () => getProfileCode(profileData?.code || ''),
    enabled: !!profileData?.code,
  });

  useEffect(() => {
    if (profileCodeData && setSecurityQuestion) {
      setSecurityQuestion(profileCodeData.securityQuestion || null);
    }
  }, [profileCodeData, setSecurityQuestion]);

  if (isProfilePending || isProfileCodePending) {
    return <UserEditPageSkeleton />;
  }

  if (!profileData || !profileCodeData) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <label htmlFor="text-editor" aria-label="Profile text editor">
          <TextEditor value={text} setValue={setText} />
        </label>
      </div>
    </div>
  );
}
