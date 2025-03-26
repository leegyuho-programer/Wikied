'use client';

import patchPassword from '@/api/auth/patchPassword';
import { postProfile } from '@/api/profile/profile';
import Button from '@/components/Button/Button';
import DropDown from '@/components/DropDown/DropDown';
import Input from '@/components/Input/Input';
import { StrokeIcon } from '@/components/SvgComponents';
import { currentPasswordRules, signUpPasswordCheckRules, signUpPasswordRules } from '@/constants/inputErrorRules';
import { useStore } from '@/store';
import { PatchPassword } from '@/types/auth';
import { PostProfileRequestType } from '@/types/profile';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import styles from './MyAccountPage.module.css';

function MyAccountPage() {
  const router = useRouter();
  const storedPassword = useStore((state) => state.password);
  const setLogout = useStore((state) => state.setLogout);
  const setSecurityQuestion = useStore((state) => state.setSecurityQuestion);
  const setSecurityAnswer = useStore((state) => state.setSecurityAnswer);
  const setProfileId = useStore((state) => state.setProfileId);
  const clearModal = useStore((state) => state.clearModal);

  const {
    handleSubmit,
    register,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PatchPassword>({ mode: 'onBlur' });

  const passwordValue = watch('password');

  const patchPasswordMutation = useMutation({
    mutationFn: (data: PatchPassword) => patchPassword(data),
    onSuccess: () => {
      alert('비밀번호가 변경되었습니다.');
      setLogout();
      router.replace('/login');
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  });

  const postProfileMutation = useMutation({
    mutationFn: (profileData: PostProfileRequestType) => postProfile(profileData),
    onSuccess: (response) => {
      alert('질문이 등록되었습니다.');
      setProfileId(response?.id ?? null);
      clearModal();
      router.push('/mypage');
    },
    onError: (error) => {
      console.error('질문 등록에 실패했습니다.', error);
      alert(error.message);
    },
  });

  const handleResetPassword = async (data: PatchPassword) => {
    if (data.currentPassword !== storedPassword) {
      setError('currentPassword', {
        type: 'manual',
        message: '기존 비밀번호가 일치하지 않습니다.',
      });
      return;
    }

    patchPasswordMutation.mutate(data);
  };

  const handleSecurityQuestionSubmit = async (profileData: PostProfileRequestType) => {
    postProfileMutation.mutate(profileData);
  };

  const handleQuestionChange = (question: string, answer: string) => {
    if (setSecurityQuestion) setSecurityQuestion(question);
    if (setSecurityAnswer) setSecurityAnswer(answer);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>계정 설정</h1>
      <div>
        <form className={styles.formContainer} onSubmit={handleSubmit(handleResetPassword)}>
          <Input
            name="currentPassword"
            placeholder="기존 비밀번호"
            label="비밀번호 변경"
            register={register('currentPassword', currentPasswordRules)}
            errors={errors}
            type="password"
          />
          <Input
            name="password"
            placeholder="새 비밀번호"
            register={register('password', signUpPasswordRules)}
            errors={errors}
            type="password"
          />
          <Input
            name="passwordConfirmation"
            placeholder="새 비밀번호 확인"
            register={register('passwordConfirmation', signUpPasswordCheckRules(passwordValue))}
            errors={errors}
            type="password"
          />
          <div className={styles.buttonWrapper}>
            <Button type="submit" size="XS" variant="primary" disabled={patchPasswordMutation.isPending}>
              변경하기
            </Button>
          </div>
        </form>
      </div>
      <StrokeIcon />
      <DropDown
        onSelectionChange={handleQuestionChange}
        onSubmit={handleSecurityQuestionSubmit}
        isSubmitting={isSubmitting || postProfileMutation.isPending}
      />
    </div>
  );
}

export default MyAccountPage;
