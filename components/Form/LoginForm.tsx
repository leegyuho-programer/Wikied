'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { PostLogin } from '../../types/auth';
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

  const handleLogin = async (data: PostLogin) => {
    try {
      const response = await fetch(`https://wikied-api.vercel.app/0-이규호/auth/signIn`, {
        method: 'POST', // HTTP 메서드를 명시적으로 설정
        headers: {
          'Content-Type': 'application/json', // JSON 형식의 데이터를 보내기 위해 Content-Type 헤더 설정
        },
        body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 body에 설정
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json(); // 응답 데이터를 JSON 형식으로 파싱

      // 토큰을 로컬 스토리지에 저장
      if (responseData.accessToken) {
        localStorage.setItem('token', responseData.accessToken);
      }

      router.replace('/mypage');
    } catch (error: any) {
      console.error('Error:', error);
      throw error; // 에러를 호출자에게 전달
    }
  };

  return (
    <div>
      <form className={styles.container} onSubmit={handleSubmit(handleLogin)}>
        <Input name="email" placeholder="이메일을 입력해 주세요." label="이메일" register={register} errors={errors} />
        <Input
          name="password"
          placeholder="비밀번호를 입력해 주세요."
          label="비밀번호"
          type="password"
          register={register}
          errors={errors}
        />
        <Button isLink={false} type="submit" size="L" variant="primary">
          로그인
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
