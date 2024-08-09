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
import { useMutation } from '@tanstack/react-query';

function LoginForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
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
        response.user.profile?.code
      );
      alert('로그인이 완료되었습니다.');
      router.replace('/mypage');
    },
    onError: (error) => {
      console.error('Error:', error);
      alert('비밀번호가 틀렸습니다.');
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
        <Button isLink={false} type="submit" size="L" variant="primary" disabled={isSubmitting}>
          로그인
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
