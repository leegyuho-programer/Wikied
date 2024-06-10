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
import { useAuth } from '../../../../context/AuthContext';
import { PatchPassword } from '../../../../types/auth';
import styles from './MyAccountPage.module.css';

function MyAccountPage() {
  const router = useRouter();
  const { password: savedPassword } = useAuth();

  const {
    handleSubmit,
    register,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PatchPassword>({ mode: 'onBlur' });

  const passwordValue = watch('password');

  const onSubmit = () => {
    console.log(1);
  };

  const handleResetPassword = async (data: PatchPassword) => {
    if (data.currentPassword !== savedPassword) {
      setError('currentPassword', {
        type: 'manual',
        message: '기존 비밀번호가 일치하지 않습니다.',
      });
      return;
    }

    try {
      const response = await fetch(`https://wikied-api.vercel.app/0-이규호/users/me/password`, {
        method: 'PATCH', // HTTP 메서드를 명시적으로 설정
        headers: {
          'Content-Type': 'application/json', // JSON 형식의 데이터를 보내기 위해 Content-Type 헤더 설정
        },
        body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 body에 설정
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        router.replace('/login');
      }

      const responseData = await response.json(); // 응답 데이터를 JSON 형식으로 파싱
      return responseData; // 필요한 경우 응답 데이터를 반환
    } catch (error: any) {
      console.error('Error:', error);
      throw error; // 에러를 호출자에게 전달
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
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <p>위키 인증하기</p>
          {/* 드롭다운 질문 있으면 input 생기도록 하기 useState로 상태관리하면 될듯? */}
          <DropDown />
          <div className={styles.buttonWrapper}>
            <Button isLink={false} type="submit" size="XS" variant="primary">
              저장하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyAccountPage;
