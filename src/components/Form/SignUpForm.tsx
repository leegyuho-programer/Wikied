'use client';

import signUp from '@/api/auth/signUp';
import { emailRules, nicknameRules, signUpPasswordCheckRules, signUpPasswordRules } from '@/constants/inputErrorRules';
import { PostSignUp } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './Form.module.css';

function SignUpForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<PostSignUp>({ mode: 'onBlur' });

  const passwordValue = watch('password');

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      alert('회원가입이 완료되었습니다.');
      router.replace('/login');
    },
    onError: () => {
      alert('회원가입 중 오류가 발생했습니다.');
    },
  });

  const handleSignUp = (data: PostSignUp) => {
    signUpMutation.mutate(data);
  };

  return (
    <div>
      <form className={styles.container} onSubmit={handleSubmit(handleSignUp)}>
        <Input
          name="name"
          placeholder="이름을 입력해 주세요."
          label="이름"
          register={register('name', nicknameRules)}
          errors={errors}
        />
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
        <Input
          name="passwordConfirmation"
          placeholder="비밀번호를 입력해 주세요."
          label="비밀번호 확인"
          type="password"
          register={register('passwordConfirmation', signUpPasswordCheckRules(passwordValue))}
          errors={errors}
        />
        <Button type="submit" size="L" variant="primary" disabled={signUpMutation.isPending}>
          다음
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm;
