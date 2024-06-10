'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Button from '../../../../components/Button/Button';
import DropDown from '../../../../components/DropDown/DropDown';
import Input from '../../../../components/Input/Input';
import StrokeIcon from '../../../../components/SvgComponents/StrokeIcon/StrokeIcon';
import {
  currentPasswordRules,
  signUpPasswordCheckRules,
  signUpPasswordRules,
} from '../../../../constants/inputErrorRules';
import { PatchPassword } from '../../../../types/auth';
import styles from './MyAccountPage.module.css';
import { useState } from 'react';
import resetPassword from '../../../../api/auth/resetPassword';
import { useStore } from '../../../../store';

function MyAccountPage() {
  const router = useRouter();
  const { user, accessToken, storedPassword } = useStore((state) => ({
    user: state.user,
    accessToken: state.userAccessToken,
    storedPassword: state.password,
  }));
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');

  const {
    handleSubmit,
    register,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PatchPassword>({ mode: 'onBlur' });

  const passwordValue = watch('password');

  const handleQuestionChange = (question: string, answer: string) => {
    setSecurityQuestion(question);
    setSecurityAnswer(answer);
  };

  const handleResetPassword = async (data: PatchPassword) => {
    if (data.currentPassword !== storedPassword) {
      setError('currentPassword', {
        type: 'manual',
        message: '기존 비밀번호가 일치하지 않습니다.',
      });
      return;
    }

    try {
      const responseData = await resetPassword(data, accessToken);
      router.replace('/login'); // 비밀번호 변경 후 로그인 페이지로 이동
      return responseData;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSecurityQuestionSubmit = async () => {
    const data = {
      securityQuestion,
      securityAnswer,
    };

    try {
      const response = await fetch(`https://wikied-api.vercel.app/0-이규호/profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // 인증 토큰 추가
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(data);
      const responseData = await response.json();
      return responseData;
    } catch (error: any) {
      console.error('Error:', error);
      throw error;
    }
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
      <div>
        <form className={styles.formContainer} onSubmit={handleSubmit(handleSecurityQuestionSubmit)}>
          <p>위키 인증하기</p>
          {/* 드롭다운 질문 있으면 input 생기도록 하기 useState로 상태관리하면 될듯? */}
          <DropDown onSelectionChange={handleQuestionChange} />
          {/* {selectedOption && (
            <Input
              name="securityQuestion"
              placeholder="추가 입력"
              label="추가 입력"
              value={additionalInput}
              onChange={(e: any) => setAdditionalInput(e.target.value)}
            />
          )} */}
          <div className={styles.buttonWrapper}>
            <Button isLink={false} type="submit" size="XS" variant="primary" disabled={isSubmitting}>
              저장하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyAccountPage;
