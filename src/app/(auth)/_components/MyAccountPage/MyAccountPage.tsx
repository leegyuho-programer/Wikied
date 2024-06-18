'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import patchPassword from '@/api/auth/patchPassword';
import Button from '@/components/Button/Button';
import DropDown from '@/components/DropDown/DropDown';
import Input from '@/components/Input/Input';
import StrokeIcon from '@/components/SvgComponents/StrokeIcon/StrokeIcon';
import { currentPasswordRules, signUpPasswordCheckRules, signUpPasswordRules } from '@/constants/inputErrorRules';
import { useStore } from '@/store';
import { PatchPassword } from '@/types/auth';
import { PostProfileRequestType, PostProfileResponseType } from '@/types/profile';
import styles from './MyAccountPage.module.css';
import { postProfile } from '@/api/profile/profile';

function MyAccountPage() {
  const router = useRouter();
  const accessToken = useStore((state) => state.userAccessToken);
  const storedPassword = useStore((state) => state.password);
  const { setLogout, setSecurityQuestion, setSecurityAnswer } = useStore((state) => ({
    setLogout: state.setLogout,
    setSecurityQuestion: state.setSecurityQuestion,
    setSecurityAnswer: state.setSecurityAnswer,
  }));

  const {
    handleSubmit,
    register,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PatchPassword>({ mode: 'onBlur' });

  const [securityQuestionLocal, setSecurityQuestionLocal] = useState('');
  const [securityAnswerLocal, setSecurityAnswerLocal] = useState('');

  const passwordValue = watch('password');

  const handleResetPassword = async (data: PatchPassword) => {
    if (data.currentPassword !== storedPassword) {
      setError('currentPassword', {
        type: 'manual',
        message: '기존 비밀번호가 일치하지 않습니다.',
      });
      return;
    }

    try {
      await patchPassword(data, accessToken);
      setLogout();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSecurityQuestionSubmit = async (profileData: PostProfileRequestType) => {
    console.log('profileData', profileData);
    try {
      const response: PostProfileResponseType = await postProfile(profileData, accessToken);
      console.log('Profile updated successfully', response);
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  const handleQuestionChange = (question: string, answer: string) => {
    setSecurityQuestionLocal(question);
    setSecurityAnswerLocal(answer);
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
            <Button isLink={false} type="submit" size="XS" variant="primary" disabled={isSubmitting}>
              변경하기
            </Button>
          </div>
        </form>
      </div>
      <StrokeIcon />
      <DropDown
        onSelectionChange={handleQuestionChange}
        onSubmit={handleSecurityQuestionSubmit}
        isSubmitting={isSubmitting}
        initialQuestion={securityQuestionLocal} // 초기 질문 값 설정
        initialAnswer={securityAnswerLocal} // 초기 답변 값 설정
      />
    </div>
  );
}

export default MyAccountPage;
