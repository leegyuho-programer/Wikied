'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { emailRules, signUpPasswordRules } from '@/constants/inputErrorRules';
import { useStore } from '@/store';
import { PostLogin } from '@/types/auth';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './Form.module.css';
import login from '@/api/auth/login';

function LoginForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<PostLogin>({ mode: 'onBlur' });

  const setLogin = useStore((state) => state.setLogin);

  const handleLogin = async (data: PostLogin) => {
    try {
      const response = await login(data);
      console.log('Response Data:', response);

      setLogin(response.user, response.accessToken, response.refreshToken, data.password, response.user.profile.code);
      router.replace('/mypage');
    } catch (error: any) {
      console.error('Error:', error);
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
