'use client';

import { useForm } from 'react-hook-form';
import styles from './ModalForm.module.css';
import Input from '@/components/Input/Input';
import { quizModalRules } from '@/constants/inputErrorRules';

function ModalForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onBlur' });

  const handleQuiz = () => {
    console.log(11111);
  };

  return (
    <form onSubmit={handleSubmit(handleQuiz)}>
      <Input
        name="securityAnswer"
        placeholder="답안을 입력해 주세요."
        register={register('securityAnswer', quizModalRules)}
        errors={errors}
      />
    </form>
  );
}

export default ModalForm;
