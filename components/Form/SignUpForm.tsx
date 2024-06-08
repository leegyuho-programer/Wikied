'use client';

import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './Form.module.css';

function SignUpForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data: any) => {
    console.log('login', data);
  };

  return (
    <div>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <Input name="이름" placeholder="이름을 입력해 주세요." label="이름" register={register} errors={errors} />
        <Input name="이메일" placeholder="이메일을 입력해 주세요." label="이메일" register={register} errors={errors} />
        <Input
          name="비밀번호"
          placeholder="비밀번호를 입력해 주세요."
          label="비밀번호"
          type="password"
          register={register}
          errors={errors}
        />
        <Input
          name="비밀번호 확인"
          placeholder="비밀번호를 입력해 주세요."
          label="비밀번호 확인"
          type="password"
          register={register}
          errors={errors}
        />
        <Button isLink={false} type="submit" size="L" variant="primary">
          다음
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm;
