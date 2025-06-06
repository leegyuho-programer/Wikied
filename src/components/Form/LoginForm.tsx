'use client';

import login from '@/api/auth/login';
import { emailRules, signUpPasswordRules } from '@/constants/inputErrorRules';
import { useStore } from '@/store';
import { PostLogin } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './Form.module.css';

function LoginForm() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PostLogin>({ mode: 'onBlur' });

  const setLogin = useStore((state) => state.setLogin);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response, variables) => {
      // response는 mutation함수가 성공적으로 실행된 후 반환하는 값
      // variables는 mutation을 실행할 때 전달한 인자
      setLogin(
        response.user,
        response.accessToken,
        response.refreshToken,
        variables.password,
        response.user.profile?.code || ''
      );

      setCookie(null, 'userAccessToken', response.accessToken, {
        maxAge: 30 * 60,
        path: '/',
        secure: process.env.NODE_ENV === 'production', // 개발환경에서는 false
        sameSite: 'strict',
      });
      setCookie(null, 'userRefreshToken', response.refreshToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        secure: process.env.NODE_ENV === 'production', // 개발환경에서는 false
        sameSite: 'strict',
      });

      alert('로그인이 완료되었습니다.');

      // redirect_to 파라미터가 있으면 해당 경로로, 없으면 /mypage로 이동
      router.replace('/mypage');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleLogin = (data: PostLogin) => {
    loginMutation.mutate(data);
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
        <Button type="submit" size="L" variant="primary" disabled={loginMutation.isPending}>
          로그인
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
