'use client';

import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './Form.module.css';
import { signUpPasswordCheckRules, signUpPasswordRules } from '../../constants/inputErrorRules';

function ResetPasswordForm() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' });

  const passwordValue = watch('password');

  const onSubmit = (data: any) => {
    console.log('login', data);
  };

  return (
    <div>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
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
          확인
        </Button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
