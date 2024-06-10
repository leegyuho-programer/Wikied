'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { PostLogin } from '../../types/auth';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './Form.module.css';
import { useAuth } from '../../context/AuthContext';
import { emailRules, signUpPasswordRules } from '../../constants/inputErrorRules';

function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<PostLogin>({ mode: 'onBlur' });

  const handleLogin = async (data: PostLogin) => {
    try {
      const response = await fetch(`https://wikied-api.vercel.app/0-이규호/auth/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      if (responseData) {
        login(responseData.accessToken, responseData.refreshToken, responseData.user, data.password);
        console.log(data.password);
      }
    } catch (error: any) {
      console.error('Error:', error);
      throw error;
    }
  };

  return (
    <div>
      <form className={styles.container} onSubmit={handleSubmit(handleLogin)}>
        <Input
          name="email"
          placeholder="이메일을 입력해 주세요."
          label="이메일"
          register={register('email', emailRules)}
          errors={errors}
        />
        <Input
          name="password"
          placeholder="비밀번호를 입력해 주세요."
          label="비밀번호"
          type="password"
          register={register('password', signUpPasswordRules)}
          errors={errors}
        />
        <Button isLink={false} type="submit" size="L" variant="primary" disabled={isSubmitting}>
          로그인
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
