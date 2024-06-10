'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { PostSignUp } from '../../types/auth';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './Form.module.css';
import {
  nicknameRules,
  emailRules,
  signUpPasswordRules,
  signUpPasswordCheckRules,
} from '../../constants/inputErrorRules';
import signUp from './../../api/auth/signUp';

function SignUpForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostSignUp>({ mode: 'onBlur' });

  const passwordValue = watch('password');

  const handleSignUp = async (data: PostSignUp) => {
    try {
      const responseData = await signUp(data);
      router.replace('/login'); // 회원가입 성공 후 로그인 페이지로 이동
    } catch (error) {
      console.error('Error:', error);
    }
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
        <Button isLink={false} type="submit" size="L" variant="primary" disabled={isSubmitting}>
          다음
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm;
